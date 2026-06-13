"""
Deepak Bansal — Portfolio backend
FastAPI + MongoDB. All routes prefixed with /api.
"""
import os
import logging
from datetime import datetime, timezone
from typing import Annotated, Any, List, Optional

import httpx
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field

load_dotenv()

logger = logging.getLogger("portfolio")
logging.basicConfig(level=logging.INFO)

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ---------- Pydantic helpers ----------
def _coerce_objectid(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str):
        return v
    raise ValueError("Invalid ObjectId")

PyObjectId = Annotated[str, BeforeValidator(_coerce_objectid)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude_none=True)
        data.pop("_id", None)
        return data

    @classmethod
    def from_mongo(cls, doc: dict | None):
        if not doc:
            return None
        doc["_id"] = str(doc["_id"])
        return cls(**doc)


# ---------- Models ----------
class ContactMessageIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(min_length=1, max_length=4000)


class ContactMessage(BaseDocument):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: str


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
    try:
        await db.command("ping")
        return {"status": "healthy", "db": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"db unreachable: {e}")


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
            "company": "Coforge",
            "location": "Greater Noida, IN",
            "title": "Senior Software Engineer",
            "period": "Jul 2024 — Present",
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
            "github": "https://github.com/creatorbansal23-source/CarDamageEstimatorV2",
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
@api.post("/contact", status_code=status.HTTP_201_CREATED, response_model=ContactMessageOut)
async def submit_contact(payload: ContactMessageIn):
    doc = {
        "name": payload.name.strip(),
        "email": payload.email,
        "subject": (payload.subject or "").strip() or None,
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    res = await db.contact_messages.insert_one(doc)
    return ContactMessageOut(id=str(res.inserted_id), **doc)


@api.get("/contact", response_model=List[ContactMessageOut])
async def list_contact():
    items: List[ContactMessageOut] = []
    async for d in db.contact_messages.find().sort("created_at", -1).limit(100):
        items.append(
            ContactMessageOut(
                id=str(d["_id"]),
                name=d["name"],
                email=d["email"],
                subject=d.get("subject"),
                message=d["message"],
                created_at=d["created_at"],
            )
        )
    return items


app.include_router(api)


@app.on_event("shutdown")
async def shutdown():
    client.close()
