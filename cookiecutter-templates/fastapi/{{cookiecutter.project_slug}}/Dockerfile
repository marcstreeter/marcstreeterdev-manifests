# Use Python {{cookiecutter.python_version}} slim image
FROM python:{{cookiecutter.python_version}}-slim as base

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy requirements first for better caching
COPY pyproject.toml ./

# Install Python dependencies
RUN pip install --user uv && \
    uv pip install --system .

# Development stage
FROM base as development

# Install dev dependencies if requested
ARG INSTALL_DEV_DEPS=false
RUN if [ "$INSTALL_DEV_DEPS" = "true" ]; then \
        uv pip install --system ".[dev]"; \
    fi

# Copy source code explicitly
COPY {{cookiecutter.project_slug}}/ ./{{cookiecutter.project_slug}}/
COPY tests/ ./tests/
COPY README.md ./
COPY .env.example ./

# Create startup script
RUN echo '#!/bin/bash\n\
if [ "$DEBUGPY_ENABLED" = "true" ]; then\n\
    python -m debugpy --listen 0.0.0.0:$DEBUGPY_PORT --wait-for-client -Xfrozen_modules=off -m uvicorn {{cookiecutter.project_slug}}.main:app --host 0.0.0.0 --port 8000 --reload\n\
else\n\
    uvicorn {{cookiecutter.project_slug}}.main:app --host 0.0.0.0 --port 8000 --reload\n\
fi' > /app/start.sh && chmod +x /app/start.sh

# Switch to python user (default for python images)
USER python

# Expose port
EXPOSE 8000 5678

# Start the application
CMD ["/app/start.sh"]

# Production stage
FROM base as production

# Copy source code explicitly
COPY {{cookiecutter.project_slug}}/ ./{{cookiecutter.project_slug}}/
COPY README.md ./

# Switch to python user (default for python images)
USER python

# Expose port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "{{cookiecutter.project_slug}}.main:app", "--host", "0.0.0.0", "--port", "8000"] 