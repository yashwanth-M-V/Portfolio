from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ChatRequest, ChatResponse
from app.rag import load_data, retrieve_context
from app.llm import get_llm_response
from app.config import MAX_QUERY_LENGTH

app = FastAPI(title="RAG Portfolio Chatbot")

# CORS for GitHub Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load embeddings once
load_data()


@app.get("/")
def health():
    return {"status": "RAG chatbot running"}


@app.post("/ask", response_model=ChatResponse)
def ask(req: ChatRequest):
    question = req.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="Empty question")

    if len(question) > MAX_QUERY_LENGTH:
        raise HTTPException(status_code=400, detail="Question too long")

    context = retrieve_context(question)

    try:
        answer = get_llm_response(question, context)
    except Exception as e:
        print("🔥 LLM ERROR:", str(e))
        raise HTTPException(status_code=500, detail="LLM error")

    return {"answer": answer}
