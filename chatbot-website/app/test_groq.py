try:
    import groq
    print("✅ Groq imported successfully")

    # Print version if available
    if hasattr(groq, "__version__"):
        print("📦 Groq version:", groq.__version__)
    else:
        print("📦 Groq version attribute not exposed")

    # Extra sanity check
    from groq import Groq
    print("🤖 Groq client class available")

except Exception as e:
    print("❌ Failed to import Groq")
    print("Error:", e)
