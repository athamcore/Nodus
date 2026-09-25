"""Health check endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    """Health check response model."""

    status: str
    version: str
    environment: str


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Basic health check endpoint."""
    from app.core.config import settings

    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
    )


@router.get("/health/ready")
async def readiness_check() -> dict[str, object]:
    """Readiness check - verifies dependencies are available."""
    # In Phase 2, this will check database connectivity
    return {
        "status": "ready",
        "checks": {
            "database": "not_configured",  # Will be "healthy" in Phase 2
            "storage": "not_configured",
        },
    }


@router.get("/health/live")
async def liveness_check() -> dict[str, object]:
    """Liveness check - basic process health."""
    return {"status": "alive"}
