# marcstreeterdev Cookiecutter Templates with Cruft

This directory contains [Cookiecutter](https://cookiecutter.readthedocs.io/en/stable/) templates for creating new services in the marcstreeterdev project, enhanced with [Cruft](https://cruft.github.io/cruft/) for template management and automated updates.

## Why Cruft?

Cruft extends Cookiecutter with powerful template management capabilities:

- **Template Validation**: Check if projects are up-to-date with `cruft check`
- **Automatic Updates**: Update projects with `cruft update` 
- **GitHub Actions Integration**: Automate updates across all your services
- **Conflict Resolution**: Handle template changes like git merges
- **Version Tracking**: Keep track of which template version each service uses

### Configuration

The workflows use:
- `GITHUB_TOKEN` for repository access
- Matrix strategy for parallel service updates
- Conditional updates (only when needed)
- Proper git configuration for automated commits

## Getting Started

Checkout available commands with just
```bash
# shows available commands for creating services, running tilt, etc
just
```

## Additional thank you's

These tools aided easier creation of filler data

- [chatgpt](https://chatgpt.com/) for the example logo creation
- [imagecompressor](https://imagecompressor.com) for taking large logo and reducing colors and optimizing image to 1/10th the size
- [convertio](https://convertio.co/) for converting simplified image into svg
- [svgomg](https://optimize.svgomg.net/) for easy svg optimization
- [pixelmator](https://www.pixelmator.com/pro/) for svg editing and export
- [cursor](https://cursor.com/) for the excellent editor that enabled much of this project