function assignRole(payload) {
  const roles = payload.roles || [];

  if (payload.task === "push module") {
    if (!roles.includes("pusher")) {
      roles.push("pusher");
    }
  }

  if (payload.task === "admin action") {
    if (!roles.includes("admin")) {
      roles.push("admin");
    }
  }

  return { ...payload, roles };
}

function enrich(state, verbose = false) {
  if (verbose) console.log("Enriching payload...");
  if (!state.ok) return state;

  // Apply role mutation here
  const mutatedPayload = assignRole(state.payload);

  return {
    ...state,
    payload: mutatedPayload,
    meta: {
      ...state.meta,
      enrichedAt: Date.now(),
      version: 1
    }
  };
}

module.exports = { enrich, assignRole };
