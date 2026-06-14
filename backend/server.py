"""
Deepak Bansal — Portfolio backend
FastAPI + MongoDB. All routes prefixed with /api.
"""
import os
import logging
import smtplib
import uuid
from datetime import datetime, timezone
from typing import Annotated, Any, List, Optional

import anyio
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field


load_dotenv()

logger = logging.getLogger("portfolio")
logging.basicConfig(level=logging.INFO)


# ---------- Models ----------
class ContactMessageIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(min_length=1, max_length=4000)


class ContactMessageOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: str



# ---------- App + Router ----------
app = FastAPI(title="Deepak Bansal Portfolio API", version="1.0.0")
api = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.get("/")
async def root():
    return {"service": "portfolio", "owner": "Deepak Bansal", "status": "ok"}


@api.get("/health")
async def health():
    return {"status": "healthy", "db": "disabled"}



# ---------- Profile (static, content-driven) ----------
PROFILE = {
    "name": "Deepak Bansal",
    "title": "Senior Software Engineer",
    "tagline": "Backend systems, Azure cloud, AI-enabled automation.",
    "summary": (
        "Senior software engineer with 4+ years building scalable web and "
        "backend systems in C#, .NET Core, ASP.NET Core, React and Azure. "
        "Shipped high-performance APIs powering UK housing portals used by "
        "10,000+ people, while leading code-quality and AI-automation initiatives."
    ),
    "location": "New Delhi, India",
    "email": "deepak23bansal1997@gmail.com",
    "phone": "+91 95543 99992",
    "social": {
        "github": "https://github.com/creatorbansal23-source",
        "email": "mailto:deepak23bansal1997@gmail.com",
    },
    "stats": [
        {"label": "Backend throughput", "value": "+40%", "detail": "API latency reduced on enterprise workloads"},
        {"label": "Uptime delivered", "value": "99.9%", "detail": "Across UK housing portals"},
        {"label": "End users served", "value": "10,000+", "detail": "On production REST APIs"},
        {"label": "Tech debt reduced", "value": "-25%", "detail": "Via SonarQube adoption"},
    ],
    "skills": [
        {
            "group": "Languages & Frameworks",
            "items": ["C#", ".NET Core", "ASP.NET Core", "REST APIs", "Microservices", "React", "JavaScript", "TypeScript"],
        },
        {
            "group": "Cloud & Data",
            "items": ["Azure App Services", "Azure Functions", "Blob Storage", "Application Insights", "Service Bus", "Cosmos DB", "SQL"],
        },
        {
            "group": "AI & Automation",
            "items": ["Copilot Studio", "Microsoft AI Foundry", "Bot Services", "Workflow Automation"],
        },
        {
            "group": "Tools & Practices",
            "items": ["Git", "Visual Studio", "Postman", "SonarQube", "xUnit", "MSTest", "Agile / Scrum", "CI/CD"],
        },
    ],
    "experience": [
        {
            "company": "Bitniti",
            "location": "Remote",
            "title": "Full Stack Developer - AI Integrations .Net & Azure",
            "period": "Mar 2026 — Present",
            "highlights": [
                "🔧 Built AI-powered .NET 8 microservices for insurance claims automation — vehicle damage estimation, diary summarization, and email classification using Azure OpenAI and Ollama.",
                "☁️ Architected dual-provider LLM pipelines with swappable Azure OpenAI (cloud) and Ollama (on-premise) backends, meeting enterprise privacy and cost requirements.",
                "🔐 Developed secure multi-tenant REST APIs with JWT auth, role-based authorization, tier enforcement, EF Core, and full Swagger documentation.",
                "🧠 Engineered reliable structured AI outputs using advanced prompt engineering, JSON validation, and hallucination-prevention techniques across high-volume claims workflows.",
            ],
        },
        {
            "company": "Coforge",
            "location": "Greater Noida, IN",
            "title": "Senior Software Engineer",
            "period": "Jul 2024 — Mar 2026",
            "highlights": [
                "Architected scalable ASP.NET Core REST APIs and microservices, improving backend throughput by 40% and reducing latency for enterprise workloads.",
                "Led SonarQube adoption across .NET and React codebases, reducing technical debt by 25% and lifting code-quality standards.",
                "Automated business workflows with background services and integration-driven processing.",
                "Partnered with UK-based product teams in Agile sprints to ship housing-sector applications.",
            ],
        },
        {
            "company": "Coforge",
            "location": "Greater Noida, IN",
            "title": "Software Engineer",
            "period": "Nov 2021 — Jul 2024",
            "highlights": [
                "Developed and maintained enterprise modules in C# / ASP.NET Core for high-load applications contributing to 99.9% uptime targets.",
                "Delivered optimized REST APIs used by 10,000+ end users across multiple UK housing portals.",
                "Collaborated with frontend teams to tighten API contracts and improve responsiveness.",
            ],
        },
    ],
    "awards": [
        {"name": "PAT On The Back Award", "issuer": "Coforge", "date": "Sep 2025"},
        {"name": "Collaborator Award", "issuer": "Coforge", "date": "Mar 2025"},
        {"name": "Hackathon Winner", "issuer": "Coforge", "date": "Dec 2024"},
    ],
    "education": [
        {
            "degree": "B.Tech, Electrical, Electronics & Communications Engineering",
            "institution": "SRMS CET, Bareilly",
            "year": "2020",
        },
        {
            "degree": "12th Higher Secondary Certification",
            "institution": "New Public School, Lucknow",
            "year": "2015",
        }
    ],
    "projects": [
        {
            "key": "diagramai",
            "name": "DiagramAI",
            "summary": "AI-assisted diagram generation tool — turn natural language into architecture diagrams.",
            "stack": ["Python", "AI", "Visualization"],
            "github": "https://github.com/creatorbansal23-source/DiagramAI",
            "accent": "primary",
        },
        {
            "key": "budgetplanner",
            "name": "Budget Planner",
            "summary": "Personal finance planner — track expenses, categorize spend, and project monthly budgets.",
            "stack": ["TypeScript", "React", "Charts"],
            "github": "https://github.com/creatorbansal23-source/budget-planner",
            "accent": "secondary",
        },
        {
            "key": "cardamage",
            "name": "Car Damage Estimator v2",
            "summary": "Image-based estimator that classifies and quantifies vehicle damage from photographs.",
            "stack": ["HTML", "Computer Vision", "Web"],
            "github": "https://github.com/creatorbansal23-source",
            "accent": "primary",
        },
        {
            "key": "devportfolio",
            "name": "DevPortfolio",
            "summary": "This site. Immersive 3D engineering portfolio built with React Three Fiber.",
            "stack": ["React", "Three.js", "Framer Motion"],
            "github": "https://github.com/creatorbansal23-source/DevPortfolio",
            "accent": "secondary",
        },
        {
            "key": "smart-grievance-redressal-system",
            "name": "Smart Grievance Redressal System",
            "summary": "A .NET 8 Azure Worker Service that auto-processes customer complaints in real-time via Service Bus, enriching each complaint with HuggingFace sentiment, custom ML classification, and GPT summarization — then persisting to Cosmos DB and notifying via Mailgun.",
            "stack": [".NET 8", "Azure Service Bus", "Cosmos DB", "HuggingFace", "OpenAI"],
            "github": "https://github.com/creatorbansal23-source/bs-complaints.git",
            "accent": "secondary",
        }
    ],
}


@api.get("/profile")
async def get_profile():
    return PROFILE


# ---------- GitHub repos (server-side, with graceful fallback) ----------
_GH_CACHE: dict = {"data": None, "ts": 0.0}


@api.get("/github/repos")
async def github_repos():
    """Fetch public repos for the GitHub user, cached 10 min in-memory."""
    import time
    now = time.time()
    if _GH_CACHE["data"] and now - _GH_CACHE["ts"] < 600:
        return _GH_CACHE["data"]
    url = "https://api.github.com/users/creatorbansal23-source/repos?per_page=30&sort=updated"
    try:
        async with httpx.AsyncClient(timeout=10) as c:
            r = await c.get(url, headers={"Accept": "application/vnd.github+json"})
        if r.status_code != 200:
            raise RuntimeError(f"github status {r.status_code}")
        repos = [
            {
                "name": x.get("name"),
                "full_name": x.get("full_name"),
                "description": x.get("description"),
                "html_url": x.get("html_url"),
                "language": x.get("language"),
                "stargazers_count": x.get("stargazers_count", 0),
                "forks_count": x.get("forks_count", 0),
                "updated_at": x.get("updated_at"),
                "topics": x.get("topics", []),
                "homepage": x.get("homepage"),
            }
            for x in r.json()
        ]
        payload = {"source": "github", "repos": repos}
        _GH_CACHE.update(data=payload, ts=now)
        return payload
    except Exception as e:
        logger.warning("github fetch failed: %s", e)
        # Fallback to curated projects so UI never breaks
        fallback = {
            "source": "fallback",
            "repos": [
                {
                    "name": p["name"],
                    "full_name": f"creatorbansal23-source/{p['key']}",
                    "description": p["summary"],
                    "html_url": p["github"],
                    "language": p["stack"][0],
                    "stargazers_count": 0,
                    "forks_count": 0,
                    "updated_at": None,
                    "topics": p["stack"],
                    "homepage": None,
                }
                for p in PROFILE["projects"]
            ],
        }
        return fallback


# ---------- Contact form ----------
def send_contact_email_sync(name: str, email: str, subject: Optional[str], message: str):
    smtp_host = os.environ["SMTP_HOST"]
    smtp_port = int(os.environ["SMTP_PORT"])
    smtp_username = os.environ["SMTP_USERNAME"]
    smtp_password = os.environ["SMTP_PASSWORD"]
    from_address = os.environ.get("SMTP_FROM_ADDRESS", smtp_username)
    from_name = os.environ.get("SMTP_FROM_NAME", "CarDamageEstimatorV2")
    to_address = os.environ.get("SMTP_TO_ADDRESS", smtp_username)

    msg = MIMEMultipart()
    msg['From'] = f"{from_name} <{from_address}>"
    msg['To'] = to_address
    msg['Subject'] = f"Portfolio Contact: {subject or 'No Subject'}"

    body = f"""New Contact Form Submission:

Name: {name}
Email: {email}
Subject: {subject or 'No Subject'}

Message:
--------------------------------------------------
{message}
--------------------------------------------------
"""
    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)


@api.post("/contact", status_code=status.HTTP_201_CREATED, response_model=ContactMessageOut)
async def submit_contact(payload: ContactMessageIn):
    name = payload.name.strip()
    email = payload.email
    subject = (payload.subject or "").strip() or None
    message = payload.message.strip()
    created_at = datetime.now(timezone.utc).isoformat()

    try:
        await anyio.to_thread.run_sync(
            send_contact_email_sync,
            name,
            email,
            subject,
            message
        )
    except Exception as e:
        logger.error("Failed to send contact email: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {e}"
        )

    generated_id = str(uuid.uuid4())
    return ContactMessageOut(
        id=generated_id,
        name=name,
        email=email,
        subject=subject,
        message=message,
        created_at=created_at
    )



@api.get("/contact", response_model=List[ContactMessageOut])
async def list_contact():
    return []


app.include_router(api)

