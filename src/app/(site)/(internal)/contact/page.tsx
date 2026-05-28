import { JSX } from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import faqs from "@/data/faqs";
import styles from "@/app/(site)/(internal)/contact/contact.module.scss";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have questions or feedback? Browse FAQs or reach out directly. Let's connect and collaborate on web development ideas.",
};

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export default function ContactPage(): JSX.Element {
  return (
    <div className={styles.contactLayout}>
      <div className={styles.contactIntro}>
        <p>
          I&apos;d love to hear from you! Whether it&apos;s feedback, a question about a post, or a
          collaboration idea, feel free to reach out. I always enjoy connecting with readers — just
          use the form below to share your questions, comments, or ideas.
        </p>
        <p>
          If you have a question, please check the{" "}
          <strong>Frequently Asked Questions</strong>{" "}
          <span className={styles.rightText}>over on the right</span>
          <span className={styles.belowText}>below</span>
          {" "}— you might find the answer you&apos;re looking for.
        </p>
      </div>

      <div className={styles.contactSection}>
        <ContactForm siteKey={RECAPTCHA_SITE_KEY} />
        <p className={styles.recaptchaDisclaimer}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>

      <div className={styles.contactFaq}>
        <h2>Frequently Asked Questions</h2>
        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}
