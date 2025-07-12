from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.settings import settings
from api.health import router as health_router
from api.example import router as example_router

app = FastAPI(
    title="{{cookiecutter.project_name}}",
    description="{{cookiecutter.project_description}}",
    version="0.1.0",
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_urls_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes with prefixes
app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(example_router, prefix="/example", tags=["example"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.is_development,
    ) 