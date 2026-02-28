# 📁 projects.json — How to Add & Manage Projects

Keep this file next to `projects.json` as your personal reference.

---

## Template — copy this for each new project

```json
{
  "name"        : "Your Project Title",
  "skills"      : ["Skill1", "Skill2", "Skill3"],
  "description" : "One or two sentences about the project.",
  "media"       : "assets/projects/your-file.gif",
  "media_type"  : "gif",
  "github"      : "https://github.com/you/repo",
  "demo"        : "https://your-live-site.com"
}
```

---

## Field Reference

| Field | What it does |
|---    |---           |

| `name` | Project title shown on the card |
| `skills` | Array of tech tags shown as pill badges |
| `description` | 1–2 sentences. Keep it concise |
| `media` | Path to your file inside `assets/projects/` |
| `media_type` | Controls **how** the media is displayed (see below) |
| `github` | Full GitHub URL — leave `""` to hide the button |
| `demo` | Full live demo URL — leave `""` to hide the button |

---

## media_type options

### `"gif"` — Full bleed animated preview

The GIF fills the entire left panel edge to edge.
Use this when you have a screen recording of your project in action.

```json
"media"      : "assets/projects/my-project.gif",
"media_type" : "gif"
```

✅ Accepted files: `.gif`

---

### `"icon"` — Transparent logo centred on gradient

The PNG sits centred on the purple gradient background.
Best for tool/tech logos with a transparent background (Snowflake, Python, Power BI etc.)

```json
"media"      : "assets/projects/snowflake-icon.png",
"media_type" : "icon"
```

✅ Accepted files: `.png` `.svg` `.webp`
💡 Tip: Use 200×200px or larger with a transparent background

---

### `""` — No media (automatic fallback)

When you have nothing ready yet. Shows the gradient background with your project's initials in large text. Looks intentional, not broken.

```json
"media"      : "",
"media_type" : ""
```

---

## Tips

- **Add a project** → paste a new `{ }` block into the array
- **Remove a project** → delete its `{ }` block
- **Reorder projects** → move blocks up or down in the array
- **Order in the file = order in the carousel**
- Separate each block with a comma `,` — except the very last one
- Keep GIF files under **4 MB** for fast page loading
- Never put comments (`//`) inside the actual `projects.json` file — JSON doesn't support them and will break the page

---

## Full example with all four cases

```json
[
  {
    "name"        : "RAG Chatbot",
    "skills"      : ["Python", "LangChain", "FAISS", "OpenAI"],
    "description" : "MSc thesis chatbot using retrieval-augmented generation.",
    "media"       : "assets/projects/rag-chatbot.gif",
    "media_type"  : "gif",
    "github"      : "https://github.com/you/rag-chatbot",
    "demo"        : ""
  },
  {
    "name"        : "ETL Pipeline",
    "skills"      : ["Python", "Snowflake", "AWS S3", "SQL"],
    "description" : "Automated pipeline from S3 into Snowflake with Airflow scheduling.",
    "media"       : "assets/projects/snowflake-icon.png",
    "media_type"  : "icon",
    "github"      : "https://github.com/you/etl-pipeline",
    "demo"        : ""
  },
  {
    "name"        : "Portfolio Website",
    "skills"      : ["HTML", "CSS", "JavaScript"],
    "description" : "This responsive portfolio with glassmorphism and dark/light mode.",
    "media"       : "",
    "media_type"  : "",
    "github"      : "https://github.com/you/portfolio",
    "demo"        : "https://you.github.io"
  }
]
```
