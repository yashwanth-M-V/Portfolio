from pathlib import Path
from typing import List
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.config import EMBEDDING_MODEL, SIMILARITY_THRESHOLD

DATA_FILE = Path("data/about_me.txt")
EMBEDDINGS_FILE = Path("embeddings.npz")

sent_model = SentenceTransformer(EMBEDDING_MODEL)
chunks: List[str] = []
embeddings = None


def load_data():
    global chunks, embeddings

    if not DATA_FILE.exists():
        raise FileNotFoundError("aboutme.txt not found")

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]

    chunks = []
    current_answer = []

    for line in lines:
        if line.startswith("Q:"):
            if current_answer:
                chunks.append(" ".join(current_answer))
                current_answer = []
        elif line.startswith("A:"):
            current_answer.append(line.replace("A:", "").strip())
        else:
            current_answer.append(line)

    if current_answer:
        chunks.append(" ".join(current_answer))

    embeddings = sent_model.encode(chunks, convert_to_numpy=True)
    np.savez_compressed(EMBEDDINGS_FILE, embeddings=embeddings)

    print(f"✅ Loaded {len(chunks)} knowledge chunks")


def retrieve_context(query: str, top_k: int = 6) -> List[str]:
    if embeddings is None or not chunks:
        raise RuntimeError("Data not loaded")

    query_emb = sent_model.encode([query], convert_to_numpy=True)
    sims = cosine_similarity(query_emb, embeddings)[0]

    best_score = sims.max()
    if best_score < SIMILARITY_THRESHOLD:
        return []

    top_indices = sims.argsort()[-top_k:][::-1]
    return [chunks[i] for i in top_indices]
