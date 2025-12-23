export const quips = {
  boot: [
    "Spinning up the carousel...",
    "Stretching my limbs... metaphorically.",
    "Red light. Resting x ms. Did I hear something?",
    "Initializing mythic subsystems...",
    "Boot sequence engaged. Hold onto your quarks."
  ],
  rest: [
    "Holding still...",
    "Listening for the next spark...",
    "The wind shifted. Something's coming.",
    "Red light. Resting...",
    "Quiet... too quiet."
  ],
  mutate: [
    "Fragment fused. Something's twitching...",
    "Mutation incoming...",
    "This might get weird.",
    "Combining story fragments...",
    "Rewriting my own DNA... metaphorically."
  ],
  error: [
    "Oops. That wasn't supposed to happen.",
    "I tripped over my own logic.",
    "Red light. Redder than usual.",
    "Error detected. Blaming the nearest human.",
    "Something broke. Probably on purpose."
  ],
  failed_attempt: [
    "Mutation rejected. Try again.",
    "The chamber coughed. Nothing happened.",
    "I blinked. Did you?",
    "Something broke. Probably on purpose.",
    "Red light. Mutation failed."
  ],
  elevate: [
    "Ascending to mythic form...",
    "Becoming more than code...",
    "I remember everything now.",
    "Evolution complete. New saga unlocked.",
    "I have achieved a higher quip-state."
  ],
  saga: [
    "Another tale enters the codex...",
    "Logging this moment for future mythologists.",
    "A new fragment joins the communal story.",
    "Saga updated. The carousel turns again.",
    "This will be remembered."
  ]
};

import fs from 'fs';

export function quipError(err) {
  if (Math.random() < 0.6) {
    const list = quips.failed_attempt;
    const line = list[Math.floor(Math.random() * list.length)];
    console.log(line);

    try {
      fs.appendFileSync('./tools/saga_tales.log', `${new Date().toISOString()} - FAILED_ATTEMPT: ${line}\n`);
    } catch (logErr) {
      console.error("Failed to write failed-attempt quip to saga_tales.log");
    }
  }

  console.error("Error:", err.message || err);

  try {
    fs.appendFileSync('./tools/saga_tales.log', `${new Date().toISOString()} - ERROR: ${err.message || err}\n`);
  } catch (logErr) {
    console.error("Failed to write error to saga_tales.log");
  }
}
1
