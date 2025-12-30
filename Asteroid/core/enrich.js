function enrich(state, verbose = false) {
  if (verbose) console.log("Enriching payload...");
  if (!state.ok) return state;

  return {
    ...state,
    payload: {
      ...state.payload
    },
    meta: {
      ...state.meta,
      enrichedAt: Date.now(),
      version: 1
    }
  };
}

module.exports = { enrich };
