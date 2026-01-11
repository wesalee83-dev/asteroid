// Represents the result of classifying a file or a group of files
export class ClassificationResult {
  constructor({ type, category, files, notes = [] }) {
    this.type = type              // "single" | "duplicate-set"
    this.category = category      // "keep" | "junk" | "duplicate" | "dead-weight"
    this.files = files            // array of FileRecord
    this.notes = notes            // explanations
  }
}
