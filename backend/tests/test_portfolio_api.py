"""
Backend API tests for Deepak Bansal Portfolio.
Covers: /api/health, /api/profile, /api/github/repos, /api/contact (POST/GET).
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback to frontend/.env at runtime (tests run from /app)
    try:
        from pathlib import Path
        env_path = Path("/app/frontend/.env")
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_health_ok(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("status") == "healthy"
        assert body.get("db") == "connected"


# ---------- Profile ----------
class TestProfile:
    def test_profile_shape(self, session):
        r = session.get(f"{API}/profile", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "Deepak Bansal"
        assert data["title"] == "Senior Software Engineer"
        # 4 stats
        assert isinstance(data["stats"], list) and len(data["stats"]) == 4
        stat_values = {s["value"] for s in data["stats"]}
        assert {"+40%", "99.9%", "10,000+", "-25%"}.issubset(stat_values)
        # 4 projects
        assert len(data["projects"]) == 4
        keys = {p["key"] for p in data["projects"]}
        assert {"diagramai", "budgetplanner", "cardamage", "devportfolio"} == keys
        # 2 experiences
        assert len(data["experience"]) == 2
        # 3 awards
        assert len(data["awards"]) == 3
        # Skills 4 groups
        assert len(data["skills"]) == 4


# ---------- GitHub repos ----------
class TestGithubRepos:
    def test_repos_returns_array(self, session):
        r = session.get(f"{API}/github/repos", timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("source") in ("github", "fallback")
        assert isinstance(body.get("repos"), list)
        assert len(body["repos"]) >= 1
        # validate shape of first item
        sample = body["repos"][0]
        for key in ("name", "html_url", "description"):
            assert key in sample


# ---------- Contact ----------
class TestContact:
    def test_post_contact_valid_persists(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "subject": "Test subject",
            "message": "Hello from automated tests.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        body = r.json()
        # Data assertions
        assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["subject"] == payload["subject"]
        assert body["message"] == payload["message"]
        assert "created_at" in body

        # Verify persistence via GET /api/contact
        r2 = session.get(f"{API}/contact", timeout=15)
        assert r2.status_code == 200, r2.text
        items = r2.json()
        assert isinstance(items, list)
        emails = [i["email"] for i in items]
        assert payload["email"] in emails

        # newest first ordering: created_at descending
        if len(items) >= 2:
            assert items[0]["created_at"] >= items[1]["created_at"]

    def test_post_contact_invalid_email_returns_422(self, session):
        payload = {
            "name": "TEST_Bad_Email",
            "email": "not-an-email",
            "subject": "x",
            "message": "x",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422, f"expected 422, got {r.status_code}: {r.text}"

    def test_post_contact_missing_required_returns_422(self, session):
        # message is required
        payload = {"name": "TEST", "email": "ok@example.com"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_get_contact_returns_list(self, session):
        r = session.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        if data:
            sample = data[0]
            for key in ("id", "name", "email", "message", "created_at"):
                assert key in sample
