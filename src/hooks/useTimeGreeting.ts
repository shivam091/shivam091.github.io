import { useState, useEffect } from "react";
import { getTimeGreeting } from "@/utils/greetings";

// Returns a time-of-day greeting string, hydrated on mount to avoid SSR/client mismatch.
export function useTimeGreeting(): string {
  const [greeting, setGreeting] = useState("Hello!");

  useEffect(() => {
    setGreeting(getTimeGreeting());
  }, []);

  return greeting;
}
