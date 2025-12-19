function normalize(input, verbose = false) {
  if (verbose) console.log("Normalizing input...");
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'invalid_input' };
  }

  return {
    ok: true,
    payload: input,
    meta: {
      normalizedAt: Date.now()
    }
  };
}

module.exports = { normalize };
