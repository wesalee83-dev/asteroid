// Flags tiny files as dead weight (moop)
export function DeadWeightRule(file) {
  const SMALL_THRESHOLD = 50_000 // 50 KB

  if (file.size < SMALL_THRESHOLD) {
    return {
      match: true,
      category: "dead-weight",
      note: `File under ${SMALL_THRESHOLD} bytes`
    }
  }

  return { match: false }
}
