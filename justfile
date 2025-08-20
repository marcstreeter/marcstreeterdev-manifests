# Manifests development tasks

# Variables
NAME := "myApp" + `date +%s`
PUSH := "false"

# Default task
default:
    @just --list

# Helper command to check if Tilt is installed
_check-tilt: _check-docker
    @if ! command -v tilt &> /dev/null; then \
        echo "❌ Tilt is not installed. Please install Tilt first:"; \
        echo "   Visit: https://docs.tilt.dev/install.html"; \
        echo "   Or run: curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash"; \
        exit 1; \
    fi

# Helper command to check if Docker is installed and running
_check-docker:
    @if ! command -v docker &> /dev/null; then \
        echo "❌ Docker is not installed. Please install Docker Desktop first:"; \
        echo "   Visit: https://www.docker.com/products/docker-desktop"; \
        exit 1; \
    fi
    @if ! docker info &> /dev/null; then \
        echo "❌ Docker is not running. Please start Docker Desktop first."; \
        exit 1; \
    fi

# Helper command to check if uvx is installed
_check-uvx:
    @if ! command -v uvx &> /dev/null; then \
        echo "❌ uvx is not installed. Please install uv (>=0.7.19) first:"; \
        echo "   See: https://github.com/astral-sh/uv"; \
        exit 1; \
    fi

# Helper command to check if GitHub CLI is installed and authenticated
_check-gh:
    @if ! command -v gh &> /dev/null; then \
        echo "❌ GitHub CLI is not installed. Please install gh first:"; \
        echo "   Visit: https://cli.github.com/"; \
        exit 1; \
    fi
    @if ! gh auth status &> /dev/null; then \
        echo "❌ GitHub CLI is not authenticated. Please run 'gh auth login' first."; \
        exit 1; \
    fi

# Start local development with verbose logging
start: _check-tilt
    tilt up --verbose

# Complete cleanup - stops Tilt with namespace deletion and cleans Docker
nuke: _check-tilt
    @echo "🧹 Starting complete cleanup..."
    @echo "Stopping Tilt and deleting namespace..."
    tilt down --delete-namespaces
    @echo ""
    @echo "🧹 Cleaning up Docker system..."
    docker system prune --all --force
    @echo "✅ Cleanup complete!"

# Create a new FastAPI service from template
create-fastapi: _check-uvx
    @echo "🚀 Creating new FastAPI service from template..."
    @read -p "Enter service name (e.g., my-api): " service_name; \
    @sh -c 'read -p "Enter service name (e.g., my-api): " service_name; \
        uvx copier copy ./templates/fastapi ../ --data project_name=$service_name && \
        echo "✅ FastAPI service created successfully!" && \
        echo "📁 Navigate to: ../$service_name" && \
        echo "🚀 Run: cd ../$service_name && just start"'

# Create a new React service from template
# Usage: "just --set NAME bolo create-react" || "just create-react bolo"
create-react name=NAME push=PUSH: _check-uvx _check-gh
    @echo "🚀 Creating new React service from template..."
    @echo "Service name: {{name}}"
    @uvx copier copy ./templates/ghpreact ../ --data project_name="{{name}}" && \
    echo "✅ React service created successfully!" && \
    cd ../{{name}} && \
    git init && \
    just setup && \
    just check-fix-local && \
    git checkout -b main && \
    git add . && \
    git commit -m "Initial commit" && \
    if [ "{{push}}" = "true" ]; then \
        echo "🌐 Setting up GitHub repository and Pages..." && \
        gh repo create {{name}} --source=. --public --push || { echo "❌ GitHub repo creation failed (maybe already exists?)"; exit 1; } && \
        git push -u origin main && \
        gh api repos/$(gh api user --jq .login)/{{name}}/pages \
          --method POST \
          -f "source[type]=branch" \
          -f "source[branch]=main" \
          -f "build_type=workflow" \
          || echo "⚠️ GitHub Pages setup failed (may already be enabled)" && \
        echo "🌐 GitHub Pages enabled at: https://$(gh api user --jq .login).github.io/{{name}}/"; \
    else \
        echo "📝 GitHub deployment skipped (run with push=true to enable)"; \
    fi && \
    echo "📁 Navigate to: ../{{name}}" && \
    echo "🚀 Run: cd ../{{name}} && just start"

# Create a new Lambda Python service from template
# Usage: "just --set NAME bolo create-lambda-python" || "just create-lambda-python bolo"
create-lambda-python name=NAME push=PUSH: _check-uvx _check-gh
    @echo "🚀 Creating new React service from template..."
    @echo "Service name: {{name}}"
    @uvx copier copy ./templates/lambdapython ../ --data project_name="{{name}}" && \
    echo "✅ Lambda Python service created successfully!" && \
    cd ../{{name}} && \
    git init && \
    just prepare && \
    git checkout -b main && \
    git add . && \
    git commit -m "Initial commit" && \
    if [ "{{push}}" = "true" ]; then \
        echo "🌐 Setting up GitHub repository and Pages..." && \
        gh repo create {{name}} --source=. --public --push || { echo "❌ GitHub repo creation failed (maybe already exists?)"; exit 1; } && \
        git push -u origin main && \
        echo "🌐 GitHub Repository created at: https://github.com/$(gh api user --jq .login)/{{name}}"; \
    else \
        echo "📝 GitHub deployment skipped (run with push=true to enable)"; \
    fi && \
    echo "📁 Navigate to: ../{{name}}" && \
    echo "🚀 Run: cd ../{{name}} && just start"

# Check if any services need updates from the central template
check-updates:
    @echo "🔍 Checking for template updates across all services..."
    @for dir in ../marcstreeterdev-*; do \
        if [ -d "$$dir" ] && [ -f "$$dir/.copier-answers.yml" ]; then \
            echo "Checking $$(basename $$dir)..."; \
            cd "$$dir" && uvx copier update --dry-run || echo "  ⚠️  Updates available"; \
            cd - > /dev/null; \
        fi; \
    done

# Update all services from the central template
update-all-services: _check-uvx
    @echo "🔄 Updating all services from central template..."
    @for dir in ../marcstreeterdev-*; do \
        if [ -d "$$dir" ] && [ -f "$$dir/.copier-answers.yml" ]; then \
            echo "Updating $$(basename $$dir)..."; \
            cd "$$dir" && uvx copier update; \
            cd - > /dev/null; \
        fi; \
    done

# Setup command to initialize development environment
setup:
    @echo "🔄 Initializing and updating git submodules..."
    git submodule update --init --recursive
    @echo "✅ Submodules are up to date."
