"""Application configuration using Pydantic Settings."""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Application
    APP_NAME: str = "Nodus API"
    APP_VERSION: str = "0.0.1"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"

    # API
    API_PREFIX: str = "/api/v1"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database (configured in Phase 2)
    DATABASE_URL: str | None = None
    DATABASE_POOL_SIZE: int = 5
    DATABASE_MAX_OVERFLOW: int = 10

    # Security (configured in Phase 3)
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    CORS_ORIGINS: list[str] = Field(
        default_factory=lambda: [
            "http://localhost:8081",
            "http://localhost:19006",
            "exp://localhost:8081",
        ]
    )

    # External Services (configured in later phases)
    # S3_STORAGE_URL: Optional[str] = None
    # S3_ACCESS_KEY: Optional[str] = None
    # S3_SECRET_KEY: Optional[str] = None
    # S3_BUCKET: Optional[str] = None
    # SPEECH_PROVIDER_API_KEY: Optional[str] = None
    # LLM_PROVIDER_API_KEY: Optional[str] = None
    # OCR_PROVIDER_API_KEY: Optional[str] = None
    # EMBEDDING_PROVIDER_API_KEY: Optional[str] = None

    # Feature Flags
    ENABLE_CLOUD_SYNC: bool = False
    ENABLE_AI_PROCESSING: bool = False


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
