## 🚀 Asteroid CLI

**Asteroid** is a modular command-line tool for processing JSON payloads through normalization, validation, and enrichment. It’s designed for extensibility and clarity, with a pipeline-style architecture and timestamped metadata.

### 🔧 Usage

```bash
asteroid process '{"hello":"world"}' --enriched
```

### ✅ Output

```json
{
  "ok": true,
  "payload": {
    "hello": "world"
  },
  "meta": {
    "normalizedAt": 1766105654713,
    "validatedAt": 1766105654713,
    "enrichedAt": 1766105654713,
    "version": 1
  }
}
```

### 🧠 Commands

- `process` — Run full pipeline (normalize → validate → enrich)
- `validate` — Validate JSON only
- `enrich` — Enrich JSON only

### 🏁 Flags

- `--parsed` (`-1`) — Stop after normalize + validate
- `--enriched` (`-2`) — Stop after full enrichment
- `--verbose` (`-v`) — Show extra logs
- `--help` (`-h`) — Show help menu

---

Asteroid is built for clarity, speed, and modularity. Whether you’re validating payloads or enriching metadata, it’s your Swiss Army Knife for structured JSON workflows.
