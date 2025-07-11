from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from {{cookiecutter.project_slug}}.settings import settings

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

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Hello from {{cookiecutter.project_name}}!"}

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "service": "{{cookiecutter.project_slug}}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "{{cookiecutter.project_slug}}.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.is_development,
    ) 