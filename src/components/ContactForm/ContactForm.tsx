"use client";

import { JSX, useState, useEffect, useCallback } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Icon } from "@/components/Icon";
import Button from "@/components/Button";
import styles from "@/components/ContactForm/ContactForm.module.scss";

const STORAGE_KEY = "contact-form-data";

const FIRST_NAMES = [
  "Maria","Nushi","Mohammed","Jose","Wei","Ahmed","Yan","Ali","John","David",
  "Abdul","Anna","Michael","Juan","Mary","Jean","Robert","Daniel","Luis","Carlos",
  "James","Antonio","Joseph","Elena","Francisco","Hong","Marie","Peter","Fatima",
  "Richard","Paul","Olga","Rosa","William","Elizabeth","Patricia","Samuel","Sarah",
];
const LAST_NAMES = [
  "Wang","Smith","Johnson","Williams","Devi","Ivanov","Kim","Ali","García","Müller",
  "da Silva","Singh","Wilson","Martinez","Anderson","Taylor","Nguyen","González",
  "Lopez","Rodriguez","Lee","Moore","Hernandez","Jackson","Chen","Kumar","Li","Wu",
];
const DOMAINS = [
  "gmail.com","yahoo.com","hotmail.com","aol.com","live.com","web.de","libero.it","comcast.net",
];
const INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(): string {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const parts: string[] = [];
  if (Math.random() <= 0.05) parts.push("Dr.");
  parts.push(first);
  if (Math.random() <= 0.25) parts.push(pick(INITIALS) + ".");
  parts.push(last);
  return parts.join(" ");
}

type Status = "idle" | "loading" | "success" | "error";

function ContactFormInner(): JSX.Element {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("Your name");
  const [emailPlaceholder, setEmailPlaceholder] = useState("you@example.com");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const fakeName = generateName();
    setNamePlaceholder(fakeName);
    const firstName = /^Dr\./.test(fakeName) ? "the-doctor" : fakeName.split(" ")[0].toLowerCase();
    setEmailPlaceholder(`${firstName}@${pick(DOMAINS)}`);

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, string>;
      if (saved.name) setName(saved.name);
      if (saved.email) setEmail(saved.email);
      if (saved.message) setMessage(saved.message);
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist form state to localStorage as the user types.
  useEffect(() => {
    if (!name && !email && !message) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, message }));
    } catch {
      // ignore quota errors
    }
  }, [name, email, message]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) return;

    setStatus("loading");

    try {
      const token = await executeRecaptcha("contact");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setMessage("");
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, [executeRecaptcha, name, email, message]);

  return (
    <div className={styles.formContainer}>
      <form id="contact-form" className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={`${styles.formLabel} ${styles.required}`}>
            Preferred Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={styles.formControl}
            value={name}
            placeholder={namePlaceholder}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={`${styles.formLabel} ${styles.required}`}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={styles.formControl}
            value={email}
            placeholder={emailPlaceholder}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={`${styles.formLabel} ${styles.required}`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={styles.formControl}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>

        {status === "success" && (
          <p className={styles.statusSuccess}>
            Message sent! I&rsquo;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className={styles.statusError}>
            Something went wrong — please try again.
          </p>
        )}

        <Button
          type="submit"
          variant="filled"
          intent="accent"
          loading={status === "loading"}
          iconRight={<Icon name="arrowRight" size={16} />}
          disabled={status === "loading"}
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}

interface ContactFormProps {
  siteKey: string;
}

export default function ContactForm({ siteKey }: ContactFormProps): JSX.Element {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
}
