# marcstreeterdev Cookiecutter Templates with Cruft

This directory contains [Cookiecutter](https://cookiecutter.readthedocs.io/en/stable/) templates for creating new services in the marcstreeterdev project, enhanced with [Cruft](https://cruft.github.io/cruft/) for template management and automated updates.

## Why Cruft?

Cruft extends Cookiecutter with powerful template management capabilities:

- **Template Validation**: Check if projects are up-to-date with `cruft check`
- **Automatic Updates**: Update projects with `cruft update` 
- **GitHub Actions Integration**: Automate updates across all your services
- **Conflict Resolution**: Handle template changes like git merges
- **Version Tracking**: Keep track of which template version each service uses

## Usage

Checkout available commands with just
```bash
# shows available commands for creating services, running tilt, etc
just
```

### Configuration

The workflows use:
- `GITHUB_TOKEN` for repository access
- Matrix strategy for parallel service updates
- Conditional updates (only when needed)
- Proper git configuration for automated commits

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