# ☄️ Asteroid CLI

 **Swiss Army Knife of tools** for interacting**
Asteroid is a modular JSON pipeline CLI built entirely from a mobile device.  
It normalizes, validates, mutates, and enriches payloads with precision — perfect for data workflows, automation, and experimentation.

---

## 🚀 Features

- **Normalize** → Clean and standardize input
- **Validate** → Ensure payload integrity
- **Mutate** → Apply transformation rules
- **Enrich** → Add metadata and versioning
- **Process** → Run the full pipeline

---

## 🧠 Philosophy

Asteroid is designed for clarity, modularity, and future-proofing.  
Each stage lives in its own file (`core/normalize.js`, `core/validate.js`, etc.), making it easy to extend, test, and evolve.

Built entirely in Termux on Android, Asteroid proves that powerful tools can be born anywhere.

---

## ⚙️ Usage

```bash
asteroid process '{"hello":"world"}' --verbose

