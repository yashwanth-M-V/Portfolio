from groq import Groq
from app.config import GROQ_API_KEY
from pathlib import Path

client = Groq(api_key=GROQ_API_KEY)

PERSONA_PATH = Path("person.txt")

def load_persona() -> str:
    if PERSONA_PATH.exists():
        return PERSONA_PATH.read_text(encoding="utf-8")
    return ""

PERSONA_TEXT = load_persona()


def get_llm_response(question: str, context: list[str]) -> str:
    if not context:
        return (
            "I don’t have enough information to answer that confidently. "
            "You can book a call to discuss directly."
        )

    context_text = "\n".join(context)

    prompt = f"""
        {PERSONA_TEXT}

            Instructions:
            - Use the context ONLY for factual information.
            - You may rephrase, add humor, and respond in character (Deadpool).
            - Do NOT invent or alter facts.
            - If the answer is not present in the context, say you don't know.

            Context:
            {context_text}

            Question:
            {question}

            Answer (in character):
            """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        timeout=10,
    )

    return response.choices[0].message.content.strip()
