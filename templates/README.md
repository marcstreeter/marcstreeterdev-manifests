# marcstreeterdev Copier Templates

This directory contains Copier templates for creating new services in the marcstreeterdev project.

## Why Copier?

We chose Copier over Cruft/Cookiecutter for template management due to its healthier, more active community and modern development practices:

- **Active Development**: Copier has a more vibrant, actively maintained community
- **Modern Python**: Built with modern Python practices and better dependency management
- **Template Validation**: Check if projects are up-to-date with `copier update --dry-run`
- **Automatic Updates**: Update projects with `copier update`
- **GitHub Actions Integration**: Automate updates across all your services
- **Conflict Resolution**: Handle template changes with intelligent merging
- **Version Tracking**: Keep track of which template version each service uses
- **Better UX**: More intuitive CLI and better error messages

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
- [pngtowebp](https://cloudconvert.com/png-to-webp) for converting to webp (super compressed)
- [convertio](https://convertio.co/) for converting simplified image into svg (black and white)
- [adobe express](https://new.express.adobe.com/tools/convert-to-svg) for converting simplified image to svg (full color)
- [svgomg](https://optimize.svgomg.net/) for easy svg optimization
- [pixelmator](https://www.pixelmator.com/pro/) for svg editing and export
- [cursor](https://cursor.com/) for the excellent editor that enabled much of this project