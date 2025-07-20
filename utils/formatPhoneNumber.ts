export const formatPhoneNumber = (input: string): string => {
  const cleaned = input.replace(/\D/g, "");

  if (cleaned.startsWith("09")) {
    return "+63" + cleaned.slice(1);
  } else if (cleaned.startsWith("9")) {
    return "+63" + cleaned;
  } else if (cleaned.startsWith("63")) {
    return "+" + cleaned;
  } else if (cleaned.startsWith("+63")) {
    return cleaned;
  } else {
    return cleaned; // fallback, but ideally we handle only PH numbers
  }
};
