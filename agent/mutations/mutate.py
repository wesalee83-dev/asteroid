from datetime import datetime

def enrich_metadata(result, mutation_type, glyph):
    return {
        "content": result,
        "mutation": mutation_type,
        "glyph": glyph,
        "timestamp": datetime.now().isoformat(),
        "length": len(str(result)),
        "type": type(result).__name__,
        "notes": f"Mutation '{mutation_type}' applied successfully."
    }
