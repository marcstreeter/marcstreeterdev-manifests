# marcstreeterdev Cookiecutter Templates with Cruft

This directory contains [Cookiecutter](https://cookiecutter.readthedocs.io/en/stable/) templates for creating new services in the marcstreeterdev project, enhanced with [Cruft](https://cruft.github.io/cruft/) for template management and automated updates.

## Why Cruft?

Cruft extends Cookiecutter with powerful template management capabilities:

- **Template Validation**: Check if projects are up-to-date with `cruft check`
- **Automatic Updates**: Update projects with `cruft update` 
- **GitHub Actions Integration**: Automate updates across all your services
- **Conflict Resolution**: Handle template changes like git merges
- **Version Tracking**: Keep track of which template version each service uses

## Available Templates

### FastAPI Service Template
- **Location**: `fastapi/`
- **Purpose**: Create new FastAPI backend services
- **Features**:
  - FastAPI with Pydantic settings
  - Docker multi-stage builds with development support
  - Helm charts for Kubernetes deployment
  - Tilt configuration for local development
  - Comprehensive testing setup (pytest, coverage)
  - Linting and formatting (black, isort, flake8, mypy)
  - Pre-commit hooks
  - Debugpy support for remote debugging
  - Justfile with common development commands

### React Service Template
- **Location**: `react/`
- **Purpose**: Create new React frontend services
- **Features**:
  - React 18 with TypeScript
  - Vite for fast development and building
  - React Router for navigation
  - TanStack Query for data fetching
  - Docker multi-stage builds
  - Helm charts for Kubernetes deployment
  - Tilt configuration for local development
  - Comprehensive testing setup (Vitest, Testing Library)
  - Linting and formatting (ESLint, Prettier)
  - Storybook for component development
  - Justfile with common development commands

## Usage

### Prerequisites

1. Install Cruft:
   ```bash
   # Using pip
   pip install cruft
   
   # Using Homebrew (macOS)
   brew install cruft
   ```

2. Navigate to the manifests directory:
   ```bash
   cd marcstreeterdev-manifests
   ```

### Creating a New Service

#### Using the justfile commands (Recommended)

```bash
# Create a new FastAPI service
just create-fastapi

# Create a new React service
just create-react
```

### Managing Existing Services

#### Check for Updates

```bash
# Check if any services need updates
just check-updates
```

#### Update Services

```bash
# Update all services from central template
just update-all-services
```

#### Update Dockerfiles to Follow Best Practices

```bash
# Check all services for Docker best practices compliance
just update-dockerfiles

# Update a specific service's Dockerfile
just update-dockerfile SERVICE=marcstreeterdev-backend
```

#### Link Existing Projects

If you have existing projects that weren't created with Cruft, you can link them:

```bash
cd ../marcstreeterdev-existing-service
cruft link ./cookiecutter-templates/fastapi
```

## Automated Updates with GitHub Actions

This repository includes GitHub Actions that automatically update all services when the central templates change:

### Workflows

1. **Update All Services** (`.github/workflows/update-all-services.yml`)
   - Triggers when `cookiecutter-templates/` files change
   - Automatically discovers all marcstreeterdev repositories
   - Updates each service that has a `.cruft.json` file
   - Commits and pushes changes automatically

2. **Manual Trigger**
   - Can be triggered manually from GitHub Actions tab
   - Supports force updates and service filtering

### How It Works

1. **Template Changes**: When you update templates in `cookiecutter-templates/`
2. **Automatic Detection**: GitHub Action discovers all marcstreeterdev repositories
3. **Update Check**: Each service is checked for template updates
4. **Automatic Update**: Services are updated and changes are committed
5. **Notification**: Summary is posted to the workflow run

### Configuration

The workflows use:
- `GITHUB_TOKEN` for repository access
- Matrix strategy for parallel service updates
- Conditional updates (only when needed)
- Proper git configuration for automated commits

## Template Variables

Both templates support the following variables:

- `project_name`: Full project name (e.g., "marcstreeterdev-my-service")
- `project_slug`: URL-friendly project name (e.g., "marcstreeterdev_my_service")
- `project_description`: Description of the service
- `project_type`: Either "fastapi" or "react"
- `author_name`: Your name
- `author_email`: Your email
- `github_username`: Your GitHub username
- `python_version`: Python version for FastAPI (default: "3.11")
- `node_version`: Node.js version for React (default: "18")
- `use_docker`: Whether to include Docker support (y/n)
- `use_helm`: Whether to include Helm charts (y/n)
- `use_tilt`: Whether to include Tilt configuration (y/n)
- `use_just`: Whether to include Justfile (y/n)
- `use_pre_commit`: Whether to include pre-commit hooks (y/n)
- `use_tests`: Whether to include testing setup (y/n)
- `use_linting`: Whether to include linting setup (y/n)
- `use_debugging`: Whether to include debugging setup (y/n)
- `open_source_license`: License type (MIT, Apache, GPL, etc.)

## Generated Project Structure

### FastAPI Service
```
marcstreeterdev-my-api/
├── .cruft.json                    # Cruft tracking file
├── src/
│   └── my_api/
│       ├── __init__.py
│       ├── main.py
│       └── settings.py
├── tests/
│   └── test_main.py
├── manifests/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── values-dev.yaml
│   ├── values-prod.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── _helpers.tpl
├── Dockerfile
├── tiltfile
├── justfile
├── pyproject.toml
├── .env.sample
├── .gitignore
├── .pre-commit-config.yaml
└── README.md
```

### React Service
```
marcstreeterdev-my-ui/
├── .cruft.json                    # Cruft tracking file
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   └── components/
├── public/
├── manifests/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── values-dev.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── _helpers.tpl
├── Dockerfile
├── tiltfile
├── justfile
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.sample
├── .gitignore
├── .pre-commit-config.yaml
└── README.md
```

## Getting Started

After creating a new service:

1. Navigate to the new service directory:
   ```bash
   cd ../marcstreeterdev-my-service
   ```

2. Install dependencies:
   ```bash
   # For FastAPI
   just install-dev
   
   # For React
   just install-dev
   ```

3. Start development:
   ```bash
   just dev
   ```

## Best Practices

### Docker Best Practices

The templates follow Docker best practices:

1. **Default User Types**: Use the default user for each base image:
   - Python services: `USER python`
   - Node.js services: `USER node`
   - No custom user creation with `useradd`

2. **Explicit File Copying**: Avoid `COPY . .` and be explicit about what files are copied:
   ```dockerfile
   # Good - explicit copying
   COPY src/ ./src/
   COPY tests/ ./tests/
   COPY README.md ./
   
   # Bad - copying everything
   COPY . .
   ```

3. **Multi-stage Builds**: Separate development and production stages
4. **Layer Caching**: Copy dependency files first for better caching
5. **Security**: Run as non-root user and minimize attack surface

### Template Development

1. **Version Control**: Always commit template changes to track updates
2. **Testing**: Test templates with different configurations before pushing
3. **Backward Compatibility**: Consider existing services when making changes
4. **Documentation**: Update this README when adding new features

### Service Management

1. **Regular Updates**: Run `just check-updates` periodically
2. **Review Changes**: Always review automated updates before merging
3. **Custom Modifications**: Use `.cruft.json` to track custom changes
4. **Conflict Resolution**: Handle merge conflicts when updating
5. **Dockerfile Updates**: Use `just update-dockerfiles` to check for best practices compliance

## Troubleshooting

### Common Issues

1. **Cruft not found**: Install with `pip install cruft`
2. **Template not found**: Ensure you're in the correct directory
3. **Update conflicts**: Resolve conflicts manually and re-run `cruft update`
4. **GitHub Action failures**: Check repository permissions and token access

### Useful Commands

```bash
# Check Cruft version
cruft --version

# List all Cruft commands
cruft --help

# Check template status
cruft check

# Update with interactive mode
cruft update --apply-ask

# Link existing project
cruft link <template-path>
```

## Contributing

When updating templates:

1. Test the templates with different configurations
2. Update this README if you add new features
3. Ensure all generated projects follow marcstreeterdev conventions
4. Keep templates consistent with existing services
5. Consider the impact on existing services when making changes 