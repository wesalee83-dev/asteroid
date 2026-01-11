// Defines the shape of a file on disk
export class FileRecord {
  constructor({ path, name, extension, size, hash }) {
    this.path = path
    this.name = name
    this.extension = extension
    this.size = size
    this.hash = hash || null
  }
}
