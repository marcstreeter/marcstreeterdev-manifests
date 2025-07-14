# Manifests development tasks

# Default task
default:
    @just --list

# Helper command to check if Tilt is installed
_check-tilt:
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
_check-cruft:
    @if ! command -v uvx &> /dev/null; then \
        echo "❌ uvx is not installed. Please install uv (>=0.7.19) first:"; \
        echo "   See: https://github.com/astral-sh/uv"; \
        exit 1; \
    fi

# Start local development with verbose logging
start: _check-tilt _check-docker
    tilt up --verbose

# Complete cleanup - stops Tilt with namespace deletion and cleans Docker
nuke: _check-tilt _check-docker
    @echo "🧹 Starting complete cleanup..."
    @echo "Stopping Tilt and deleting namespace..."
    tilt down --delete-namespaces
    @echo ""
    @echo "🧹 Cleaning up Docker system..."
    docker system prune --all --force
    @echo "✅ Cleanup complete!"

# Create a new FastAPI service using Cruft
create-fastapi: _check-cruft
    @echo "🚀 Creating new FastAPI service with Cruft..."
    @read -p "Enter service name (e.g., my-api): " service_name; \
    TEMPLATE_PATH="./cookiecutter-templates/fastapi"; \
    echo "Using template path: $TEMPLATE_PATH"; \
    uvx cruft create "$TEMPLATE_PATH" --output-dir ../ \
        --config-file "./cookiecutter-templates/fastapi/cookiecutter.json" \
        --default-config \
        --extra-context '{"project_name": "marcstreeterdev-'"$$service_name"'", "project_type": "fastapi", "project_description": "A FastAPI service for marcstreeterdev", "author_name": "Marc Streeter", "author_email": "marc@marcstreeter.dev", "github_username": "marcstreeter", "python_version": "3.11", "use_docker": "y", "use_helm": "y", "use_tilt": "y", "use_just": "y", "use_pre_commit": "y", "use_tests": "y", "use_linting": "y", "use_debugging": "y", "open_source_license": "MIT"}'
    @echo "✅ FastAPI service created successfully!"
    @echo "📁 Navigate to: ../marcstreeterdev-$$service_name"
    @echo "🚀 Run: cd ../marcstreeterdev-$$service_name && just dev"

# Create a new React service using Cruft
create-react: _check-cruft
    @echo "🚀 Creating new React service with Cruft..."
    @read -p "Enter service name (e.g., my-ui): " service_name; \
    TEMPLATE_PATH="./cookiecutter-templates/react"; \
    echo "Using template path: $TEMPLATE_PATH"; \
    uvx cruft create "$TEMPLATE_PATH" --output-dir ../ \
        --config-file "./cookiecutter-templates/react/cookiecutter.json" \
        --default-config \
        --extra-context '{"project_name": "marcstreeterdev-'"$$service_name"'", "project_type": "react", "project_description": "A React service for marcstreeterdev", "author_name": "Marc Streeter", "author_email": "marc@marcstreeter.dev", "github_username": "marcstreeter", "node_version": "18", "use_docker": "y", "use_helm": "y", "use_tilt": "y", "use_just": "y", "use_pre_commit": "y", "use_tests": "y", "use_linting": "y", "use_debugging": "y", "open_source_license": "MIT"}'
    @echo "✅ React service created successfully!"
    @echo "📁 Navigate to: ../marcstreeterdev-$$service_name"
    @echo "🚀 Run: cd ../marcstreeterdev-$$service_name && just dev"

# Check if any services need updates from the central template
check-updates:
    @echo "🔍 Checking for template updates across all services..."
    @for dir in ../marcstreeterdev-*; do \
        if [ -d "$$dir" ] && [ -f "$$dir/.cruft.json" ]; then \
            echo "Checking $$(basename $$dir)..."; \
            cd "$$dir" && uvx cruft check || echo "  ⚠️  Updates available"; \
            cd - > /dev/null; \
        fi; \
    done

# Update all services from the central template
update-all-services:
    @echo "🔄 Updating all services from central template..."
    @for dir in ../marcstreeterdev-*; do \
        if [ -d "$$dir" ] && [ -f "$$dir/.cruft.json" ]; then \
            echo "Updating $$(basename $$dir)..."; \
            cd "$$dir" && uvx cruft update --skip-apply-ask --refresh-private-variables; \
            cd - > /dev/null; \
        fi; \
    done

# Migrate existing services to use Cruft
migrate-to-cruft: _check-cruft
    @echo "🔄 Migrating existing services to use Cruft..."
    @if [ -n "$(SERVICE)" ]; then \
        ./scripts/migrate-to-cruft.sh $(SERVICE); \
    else \
        echo "❌ Please provide a service name"; \
        echo "Usage: just migrate-to-cruft SERVICE=service-name"; \
        echo "Example: just migrate-to-cruft SERVICE=marcstreeterdev-backend"; \
        exit 1; \
    fi
