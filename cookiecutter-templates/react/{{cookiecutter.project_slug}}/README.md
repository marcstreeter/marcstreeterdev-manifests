# {{cookiecutter.project_name}}

{{cookiecutter.project_description}}

Completely update this file to suit {{cookiecutter.project_name}}!

## Requirements

- [Node.js 18.x](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Tilt](https://docs.tilt.dev/install.html)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) - for Kubernetes operations
- [asdf](https://asdf-vm.com) - for local installs (optional, see .tool-versions)
- [just](https://just.systems/man/en/) - For development commands (optional, can use npm/tilt directly)

## Development

### Getting Started

This project uses a justfile for all development tasks. Run `just` to see all available commands.

```bash
# Setup and start development
just dev
```

## Key Features

- **TypeScript**: Full type safety with proper interfaces
- **Vitest**: Fast unit testing with React Testing Library
- **Storybook**: Component documentation and development
- **Biome**: Code quality, linting, and formatting
- **Lefthook**: Git hooks for pre-commit checks
- **Colocated Tests**: Tests live next to source files
- **Tilt Integration**: Containerized reproducible development with live reloading
- **Comprehensive Examples**: Real-world patterns and practices

## Examples

This template includes working examples in the `src` directory of:
- Reusable components with TypeScript interfaces
- Page-level components with state management
- Utility functions with comprehensive tests
- Asset imports and usage
- Storybook stories with interactive controls
- Colocated test patterns

## Deployment

This project is meant for deployment with GitHub Actions CI/CD to Github Pages
