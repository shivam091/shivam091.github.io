export const getTimeOfDay = (): string => {
  const now = new Date();
  const hourOfDay = now.getHours();

  if (hourOfDay <= 4) {
    return "night";
  } else if (hourOfDay <= 11) {
    return "morning";
  } else if (hourOfDay <= 17) {
    return "afternoon";
  } else if (hourOfDay <= 21) {
    return "evening";
  } else {
    return "night";
  }
};

export function getTimeGreeting(): string {
  const timeOfDay = getTimeOfDay();

  switch (timeOfDay) {
    case "morning":
      return "Good morning!";
    case "afternoon":
      return "Good afternoon!";
    case "evening":
    case "night":
      return "Good evening!";
    default:
      return "Good day!"
  }
}
