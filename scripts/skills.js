// scripts/skills.js
(function () {

  // -----------------------------
  // Skills Data & Icons Mapping
  // -----------------------------
  const skillsData = {
    core: ["Python", "SQL", "Git", "Data Pipelines", "Linux&shell scripting", "APIs & Data extraction"],
    etl: ["Apache Airflow", "Pandas", "Data Cleaning & Transformation","Excel"],
    databases: ["Relational Databases","Azure","Snowflake", "NoSQL", "Data Lakes"],
    data_modeling: ["Dimensional Modelling", "Normalization", "ER Diagrams"],
    visualization: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Plotly"],
    soft: ["Communication Skills", "Working Within Deadlines", "Time Management"],
    others: ["Slack", "HubSpot", "Notion", "ChatGPT", "Adobe Creative"]
  };

  const skillIcons = {
    Python: "python.png",
    SQL: "sql-server.png",
    Git: "git.png",
    "Data Pipelines": "data-pipeline.png",
    "Linux&shell scripting": "linux.png",
    "APIs & Data extraction": "api.png",
    "Apache Airflow": "airflow.png",
    Pandas: "Pandas.png",
    "Data Cleaning & Transformation": "data-transformation.png",
    Excel: "excel.png",
    "Relational Databases": "table.png",
    Azure: "azure.png",
    NoSQL: "MongoDB.png",
    "Data Lakes": "datalake.png",
    Snowflake: "snowflake.png",
    Normalization: "normalization.png",
    "ER Diagrams": "erd.png",
    Tableau: "tableau.png",
    "Power BI": "powerbi.png",
    Matplotlib: "matplotlib.png",
    Seaborn: "seaborn.png",
    Plotly: "plotly.png",
    Slack: "slack.png",
    "HubSpot": "hubspot.png",
    Notion: "notion.png",
    ChatGPT: "chatgpt.png",
    "Adobe Creative": "creative-cloud.png",
  };

  // -----------------------------
  // Skill Progress Values
  // -----------------------------
  const skillProgress = {
    Python: 90,
    SQL: 100,
    Git: 80,
    "Data Pipelines": 75,
    "Linux&shell scripting": 70,
    "APIs & Data extraction": 65,
    "Apache Airflow": 60,
    Pandas: 85,
    "Data Cleaning & Transformation": 80,
    Excel: 90,
    "Relational Databases": 80,
    Azure: 60,
    NoSQL: 50,
    "Data Lakes": 55,
    Snowflake: 65,
    "Dimensional Modelling": 75,
    Normalization: 70,
    "ER Diagrams": 65,
    Tableau: 80,
    "Power BI": 75,
    Matplotlib: 85,
    Seaborn: 80,
    Plotly: 70,
    Slack: 90,
    "HubSpot": 70,
    Notion: 85,
    ChatGPT: 95,
    "Adobe Creative": 60,
    "Communication Skills": 85,
    "Working Within Deadlines": 80,
    "Time Management": 75
  };

  // -----------------------------
  // Skill Descriptions
  // -----------------------------
  const skillDetails = {
    Python: "data types, lists/tuples/dictionaries, functions, error handling, data manipulation with Pandas, ETL scripting, and automation.",
    SQL: "SELECT/FROM/WHERE clauses, JOINs, subqueries, CTEs, window functions, aggregations, stored procedures, and performance optimisation.",
    Git: "version control, branching/merging, pull requests, conflict resolution, and collaboration using platforms like GitHub.",
    "Data Pipelines": "designing and implementing data pipelines for ETL processes, ensuring data integrity and efficiency.",
    "Linux&shell scripting": "basic Linux commands, file manipulation, process management",
    "APIs & Data extraction": "working with RESTful APIs, data extraction techniques, and handling JSON/XML data formats.",
    "Apache Airflow": "workflow orchestration, DAG creation, task scheduling, and monitoring ETL jobs using Airflow.",
    Pandas: "data manipulation, cleaning, transformation, and analysis using the Pandas library in Python.",
    "Data Cleaning & Transformation": "Techniques for handling missing data, outliers, normalization, and data standardization.",
    Excel: "formulas, pivot tables, data visualization, and advanced functions for data analysis in Excel.",
    "Relational Databases": "database design principles, normalization, indexing, and query optimization in relational databases.",
    Azure: "cloud services, data storage solutions, and deployment of data applications on Microsoft Azure.",
    NoSQL: "understanding NoSQL databases, data modeling, and querying in document-based databases like MongoDB.",
    "Data Lakes": "concepts of data lakes, architecture, and best practices for storing and managing large datasets.",
    Snowflake: "cloud data warehousing, data loading, querying, and performance tuning in Snowflake.",
    "Dimensional Modelling": "designing star and snowflake schemas for data warehousing and business intelligence.",
    Normalization: "techniques for organizing database structures to reduce redundancy and improve data integrity.",
    "ER Diagrams": "creating entity-relationship diagrams to model database structures and relationships.",
    Tableau: "data visualization, dashboard creation, and interactive reporting using Tableau.",
    "Power BI": "building reports, dashboards, and data models using Microsoft Power BI.",
    Matplotlib: "creating static, animated, and interactive visualizations in Python using Matplotlib.",
    Seaborn: "statistical data visualization techniques using the Seaborn library in Python.",
    Plotly: "interactive graphing and data visualization using the Plotly library in Python.",
    Slack: "team communication, collaboration, and integration with other tools using Slack.",
    "HubSpot": "CRM management, marketing automation, and sales pipeline tracking using HubSpot.",
    Notion: "note-taking, project management, and collaboration using Notion's versatile workspace.",
    ChatGPT: "leveraging AI for content generation, brainstorming, and problem-solving using ChatGPT.",
    "Adobe Creative": "basic skills in Adobe Photoshop, Illustrator, and Premiere Pro for graphic design and video editing.",
    "Communication Skills": "effective verbal and written communication in professional settings.",
    "Working Within Deadlines": "time management and prioritization to meet project deadlines efficiently.",
    "Time Management": "strategies for organizing tasks and managing time effectively in a work environment."
  };

  // -----------------------------
  // Utility: Wait for element
  // -----------------------------
  function waitForElement(selector, timeout = 5000, interval = 150) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        const el = document.querySelector(selector);
        if (el) return resolve(el);
        if (Date.now() - start > timeout) return reject(new Error(`Timeout waiting for ${selector}`));
        setTimeout(check, interval);
      };
      check();
    });
  }

  // -----------------------------
  // Render skills on the left
  // -----------------------------
  function renderSkillsList(category) {
    const left = document.getElementById("skills-left");
    const right = document.querySelector(".skills-right");
    const bottom = document.getElementById("skills-bottom");
    if (!left || !right || !bottom) return;

    left.innerHTML = "";
    right.innerHTML = "";
    bottom.innerHTML = "";

    const list = skillsData[category] || [];

    list.forEach((skill, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "skill-item";
      btn.dataset.skillIndex = idx;
      btn.textContent = skill;
      left.appendChild(btn);
    });

    // Select first skill by default
    const firstSkill = left.querySelector(".skill-item");
    if (firstSkill) {
      firstSkill.classList.add("active");
      showSkillDetails(firstSkill.textContent);
    }
  }

  // -----------------------------
  // Animate SVG ring
  // -----------------------------
  function animateRing(circle, targetPercent, duration = 1000) {
    const radius = parseFloat(circle.getAttribute("r"));
    const circumference = 2 * Math.PI * radius;
    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const offset = circumference * (1 - (targetPercent / 100) * progress);
      circle.setAttribute("stroke-dashoffset", offset);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    circle.setAttribute("stroke-dasharray", circumference);
    circle.setAttribute("stroke-dashoffset", circumference);
    requestAnimationFrame(animate);
  }

  // -----------------------------
  // Show skill icon + progress + description
  // -----------------------------
  function showSkillDetails(skillName) {
    const right = document.querySelector(".skills-right");
    const bottom = document.getElementById("skills-bottom");
    if (!right || !bottom) return;
    right.innerHTML = "";
    bottom.innerHTML = "";

    const container = document.createElement("div");
    container.className = "icon-container";
    container.style.position = "relative";
    container.style.width = "120px";
    container.style.height = "120px";
    container.style.margin = "auto";
    right.appendChild(container);

    // Progress ring
    const progress = skillProgress[skillName] || 0;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";

    const circleFg = document.createElementNS(svgNS, "circle");
    circleFg.setAttribute("cx", "60");
    circleFg.setAttribute("cy", "60");
    circleFg.setAttribute("r", "54");
    circleFg.setAttribute("stroke", "#c800ff");
    circleFg.setAttribute("stroke-width", "6");
    circleFg.setAttribute("fill", "none");
    circleFg.setAttribute("stroke-linecap", "round");
    circleFg.setAttribute("transform", "rotate(-90 60 60)");
    svg.appendChild(circleFg);

    container.appendChild(svg);

    animateRing(circleFg, progress, 1000);

    // Icon
    const iconFile = skillIcons[skillName];
    if (iconFile) {
      const img = document.createElement("img");
      img.src = `assets/skills_pics/${iconFile}`;
      img.alt = skillName;
      img.style.width = "60%";
      img.style.height = "60%";
      img.style.objectFit = "contain";
      img.style.position = "absolute";
      img.style.top = "50%";
      img.style.left = "50%";
      img.style.transform = "translate(-50%, -50%)";

      img.onerror = () => {
        const ball = document.createElement("div");
        ball.style.width = "10px";
        ball.style.height = "10px";
        ball.style.backgroundColor = "black";
        ball.style.borderRadius = "50%";
        ball.style.position = "absolute";
        ball.style.top = "50%";
        ball.style.left = "50%";
        ball.style.transform = "translate(-50%, -50%)";
        container.appendChild(ball);
      };

      container.appendChild(img);
    } else {
      const ball = document.createElement("div");
      ball.style.width = "10px";
      ball.style.height = "10px";
      ball.style.backgroundColor = "black";
      ball.style.borderRadius = "50%";
      ball.style.position = "absolute";
      ball.style.top = "50%";
      ball.style.left = "50%";
      ball.style.transform = "translate(-50%, -50%)";
      container.appendChild(ball);
    }

    // Bottom description
    bottom.innerHTML = `<p>${skillDetails[skillName] || "Details not available yet."}</p>`;
  }

  // -----------------------------
  // Event delegation for buttons
  // -----------------------------
  function attachDelegation() {
    document.addEventListener("click", (e) => {
      const catBtn = e.target.closest(".skill-btn");
      if (catBtn) {
        document.querySelectorAll(".skill-btn").forEach(b => b.classList.remove("active"));
        catBtn.classList.add("active");
        renderSkillsList(catBtn.getAttribute("data-skill") || "tech");
        return;
      }

      const skillBtn = e.target.closest(".skill-item");
      if (skillBtn) {
        const left = skillBtn.closest("#skills-left");
        if (left) {
          left.querySelectorAll(".skill-item").forEach(b => b.classList.remove("active"));
          skillBtn.classList.add("active");
          showSkillDetails(skillBtn.textContent);
        }
      }
    });
  }

  // -----------------------------
  // Initialize skills section
  // -----------------------------
  function initSkills() {
    attachDelegation();
    const activeCategoryBtn = document.querySelector(".skill-btn.active");
    const initialCategory = activeCategoryBtn ? activeCategoryBtn.getAttribute("data-skill") : "tech";
    renderSkillsList(initialCategory);
  }

  waitForElement(".skills-section", 6000)
    .then(() => initSkills())
    .catch(err => {
      console.warn("Skills section not found — delegation attached for future load.", err);
      attachDelegation();
    });

})();
