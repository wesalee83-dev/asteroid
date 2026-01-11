import fs from "fs"
import crypto from "crypto"
import path from "path"
import { FileRecord } from "./schema/FileRecord.js"
import { classifyFiles } from "./classify.js"

function hashFile(filePath) {
  try {
    const data = fs.readFileSync(filePath)
    return crypto.createHash("md5").update(data).digest("hex")
  } catch {
    return null
  }
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir)
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isFile()) {
      const ext = path.extname(entry).toLowerCase()
      const name = path.basename(entry)
      const hash = hashFile(fullPath)

      files.push(
        new FileRecord({
          path: fullPath,
          name,
          extension: ext,
          size: stat.size,
          hash
        })
      )
    }
  }

  return files
}

// CLI usage: node index.js /path/to/dir
const target = process.argv[2]
if (!target) {
  console.error("Usage: node index.js <directory>")
  process.exit(1)
}

const files = scanDir(target)
const results = classifyFiles(files)

console.log(JSON.stringify(results, null, 2))
