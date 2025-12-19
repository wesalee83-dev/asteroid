// help.js
module.exports = `
Asteroid CLI - Swiss Army Knife of tools

Usage:
  asteroid <command> <json> [flags]

Commands:
  process     Run full pipeline (normalize → validate → enrich)
  validate    Validate JSON only
  enrich      Enrich JSON only

Flags:
  -1, --parsed     Stop after normalize + validate
  -2, --enriched   Stop after full enrichment
  -v, --verbose    Show extra logs
  -h, --help       Show this help menu
`;
