"""Main API router."""

from fastapi import APIRouter

from app.api.health import router as health_router

api_router = APIRouter()

api_router.include_router(health_router, tags=["health"])

# Placeholder for future routes (Phase 3+)
# api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
# api_router.include_router(courses_router, prefix="/courses", tags=["courses"])
# api_router.include_router(lectures_router, prefix="/lectures", tags=["lectures"])
# api_router.include_router(recordings_router, prefix="/recordings", tags=["recordings"])
# api_router.include_router(materials_router, prefix="/materials", tags=["materials"])
# api_router.include_router(search_router, prefix="/search", tags=["search"])
