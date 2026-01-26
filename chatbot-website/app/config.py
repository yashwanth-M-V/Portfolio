import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("❌ GROQ_API_KEY not set in environment")

EMBEDDING_MODEL = "all-MiniLM-L6-v2"
MAX_QUERY_LENGTH = 300
SIMILARITY_THRESHOLD = 0.15
