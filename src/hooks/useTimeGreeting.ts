import { useState, useEffect } from "react";
import { getTimeGreeting } from "@/utils/greeting";

export function useTimeGreeting(): string {
  const [greeting, setGreeting] = useState("Hello!");

  useEffect(() => {
    setGreeting(getTimeGreeting());
  }, []);

  return greeting;
}
