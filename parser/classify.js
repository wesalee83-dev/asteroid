export function classify(text) {
  const lower = text.toLowerCase();

  // Commands
  if (
    lower.startsWith("run ") ||
    lower.startsWith("do ") ||
    lower.startsWith("start ") ||
    lower.startsWith("go ")
  ) {
    return "command";
  }

  // Intentions
  if (
    lower.includes("i need") ||
    lower.includes("i want") ||
    lower.includes("i should") ||
    lower.includes("i gotta")
  ) {
    return "intention";
  }

  // Emotions
  if (
    lower.includes("i feel") ||
    lower.includes("i am ") ||
    lower.includes("i'm ") ||
    lower.includes("feeling")
  ) {
    return "emotion";
  }

  // Noise / empty
  if (lower.trim() === "") {
    return "noise";
  }

  // Unknown fallback
  return "unknown";
}
