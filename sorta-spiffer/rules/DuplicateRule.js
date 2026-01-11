// Groups files with matching hashes or duplicate-style names
export function DuplicateRule(file, allFiles) {
  // Hash-based duplicate detection
  const sameHash = allFiles.filter(f => f.hash && f.hash === file.hash)

  if (sameHash.length > 1) {
    return {
      match: true,
      category: "duplicate",
      group: sameHash,
      note: "Duplicate hash match"
    }
  }

  // Name-based duplicate detection: file(1).jpg, file (2).png, etc.
  const duplicatePattern = /\(\d+\)\./
  if (duplicatePattern.test(file.name)) {
    const baseName = file.name.replace(/\(\d+\)/, "")
    const siblings = allFiles.filter(f => f.name.startsWith(baseName))

    if (siblings.length > 1) {
      return {
        match: true,
        category: "duplicate",
        group: siblings,
        note: "Duplicate filename pattern"
      }
    }
  }

  return { match: false }
}
