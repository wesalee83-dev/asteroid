function validate(state, verbose = false) {
  if (verbose) console.log("Validating payload...");
  if (!state.ok) return state;

  if (!state.payload || typeof state.payload !== 'object') {
    return { ok: false, error: 'invalid_payload' };
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      validatedAt: Date.now()
    }
  };
}

module.exports = { validate };
