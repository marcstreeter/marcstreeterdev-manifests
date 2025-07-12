# {{cookiecutter.project_name}}

{{cookiecutter.project_description}}

## Development

### Prerequisites
- [Tilt](https://docs.tilt.dev/install.html) - For containerized development
- [Docker](https://docs.docker.com/get-docker/) - For containerization
- Node.js (version specified in package.json) - For local development
- [just](https://just.systems/man/en/) - For development commands (optional, can use npm directly)

### Getting Started

This project uses a justfile for all development tasks. Run `just` to see all available commands.

**Quick start:**
```bash
just dev
```

## Key Features

- **TypeScript**: Full type safety with proper interfaces
- **Material-UI**: Modern component library with theming
- **Vitest**: Fast unit testing with React Testing Library
- **Storybook**: Component documentation and development
- **Biome**: Code quality, linting, and formatting
- **Colocated Tests**: Tests live next to source files
- **Tilt Integration**: Containerized development with live reloading
- **Comprehensive Examples**: Real-world patterns and practices

## Examples

This template includes working examples of:
- Reusable components with TypeScript interfaces
- Page-level components with state management
- Utility functions with comprehensive tests
- Asset imports and usage
- Storybook stories with interactive controls
- Colocated test patterns

Explore the `src/` directory to see these patterns in action.

## Deployment

This project is configured for deployment with:
- Docker containerization
- Kubernetes manifests
- Tilt for development
- GitHub Actions CI/CD

See the `manifests/` directory for deployment configuration. 