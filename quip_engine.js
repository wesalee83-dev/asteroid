import { quips } from './quip_library.js';
import fs from 'fs';

// ------------------------------------------------------------
// QUIP: general-purpose quip with optional delay
// ------------------------------------------------------------
export async function quip(type = "rest", restMs = 300) {
  const list = quips[type] || quips.rest;
  const line = list[Math.floor(Math.random() * list.length)];
  console.log(line);

  try {
    fs.appendFileSync(
      `${process.cwd()}/tools/saga_tales.log`,
      `${new Date().toISOString()} - QUIP (${type}) - ${line}\n`
    );
  } catch (err) {
    console.error("Failed to write quip to saga_tales.log", err);
  }

  return new Promise(resolve => setTimeout(resolve, restMs));
}

// ------------------------------------------------------------
// QUIP ERROR: special quip for failed attempts
// ------------------------------------------------------------
export function quipError(err) {
  if (Math.random() < 0.6) {
    const list = quips.failed_attempt;
    const line = list[Math.floor(Math.random() * list.length)];
    console.log(line);

    try {
      fs.appendFileSync(
        `${process.cwd()}/tools/saga_tales.log`,
        `${new Date().toISOString()} - FAILED_ATTEMPT: ${line}\n`
      );
    } catch (logErr) {
      console.error("Failed to write failed attempt quip", logErr);
    }
  }

  try {
    fs.appendFileSync(
      `${process.cwd()}/tools/saga_tales.log`,
      `${new Date().toISOString()} - ERROR: ${err.message || err}\n`
    );
  } catch (logErr) {
    console.error("Failed to write error to saga_tales.log", logErr);
  }
}

// ------------------------------------------------------------
// MUTATE: core mutation ritual
// ------------------------------------------------------------
export function mutate(fragment, transformFn, label) {
  quip("mutate", 400);

  let result;
  try {
    result = transformFn(fragment);
  } catch (err) {
    quipError(err);
    throw err;
  }

  const logEntry =
    `<${label}>\n` +
    `${JSON.stringify(result)}\n`;

  try {
    fs.appendFileSync(
      `${process.cwd()}/tools/saga_tales.log`,
      logEntry
    );
  } catch (logErr) {
    console.error("Failed to write mutation log to saga_tales.log", logErr);
  }

  return result;
}
