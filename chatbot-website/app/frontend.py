# frontend.py
import streamlit as st
import requests

# Streamlit page configuration
st.set_page_config(page_title="Portfolio Chatbot", page_icon="🤖", layout="centered")

st.title("🧠 Portfolio Chatbot")
st.write("Ask questions about Yashwanth's resume/LinkedIn and get real answers!")

# Input box for user question
question = st.text_input("Your question:", "")

if st.button("Ask"):
    if not question.strip():
        st.warning("Please enter a question.")
    else:
        try:
            # Call the FastAPI endpoint
            response = requests.get("http://127.0.0.1:8000/ask/", params={"q": question})
            if response.status_code == 200:
                data = response.json()
                st.markdown(f"**Question:** {data['question']}")
                st.markdown(f"**Answer:** {data['answer']}")
            else:
                st.error(f"Error from server: {response.status_code} - {response.text}")
        except requests.exceptions.RequestException as e:
            st.error(f"Failed to connect to backend: {e}")
