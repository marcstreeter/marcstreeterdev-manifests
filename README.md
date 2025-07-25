# marcstreeterdev Manifests

Centralized Kubernetes manifests and service management for the marcstreeterdev project ecosystem.

## Overview

This repository contains the central configuration for deploying and managing all marcstreeterdev services in Kubernetes. It provides:

- **Helm Charts**: Centralized Helm chart for deploying the entire stack
- **Service Templates**: [Cookiecutter] templates with [Cruft] integration for creating new services
- **Development Environment**: [Tilt] configuration for local development
- **Automated Updates**: GitHub Actions for keeping all services in sync with template updates

## Tech Stack
Most tools in the tech stack can be installed quickly using [asdf]  or [brew] but choose your own adventure 🤞 to install these tools.

## Associated Services

The following services are designed to work together as part of the marcstreeterdev ecosystem:

| Name                                                                 | Service Type | Purpose                                      |
|----------------------------------------------------------------------|--------------|----------------------------------------------|
| [marcstreeterdev-backend](https://github.com/marcstreeter/marcstreeterdev-backend)   | FastAPI      | Backend API for business logic and data      |
| [marcstreeterdev-frontend](https://github.com/marcstreeter/marcstreeterdev-frontend) | React        | Frontend web application (UI)                |

### Core Infrastructure
- [Kubernetes] - Container orchestration
- [Helm] - Kubernetes package manager
- [Docker] - Container runtime

### Requirements
- [Tilt] - Local development environment
- [Just] - Task runner (optional but highly suggested)
- [Cruft] - Template management using [Cookiecutter] and updates and [why](https://john-miller.dev/posts/cookiecutter-with-cruft-for-platform-engineering/)
- [UV](see .tool-versions for the required version)

### Service Types

The intention is that as these cookiecutters are updated here, a github action will proactively update the dependent services.

- [FastAPI] - Python web framework
- [React] - Frontend framework ready for github pages (still in process)
- _coming_ Argo Worker
_ _coming_ Google Cloud Function

## Quick Start

1. **Install dependencies** (see [Tech Stack](#tech-stack) for installation links)

2. **View available commands**:
   ```bash
   just
   ```

[Kubernetes]: https://kubernetes.io/
[Helm]: https://helm.sh/
[Docker]: https://www.docker.com/
[Tilt]: https://tilt.dev/
[Just]: https://github.com/casey/just
[Cookiecutter]: https://cookiecutter.readthedocs.io/en/stable/
[Cruft]: https://cruft.github.io/cruft/
[FastAPI]: https://fastapi.tiangolo.com/
[React]: https://react.dev/
[asdf]: https://asdf-vm.com/
[brew]: https://brew.sh/
[UV]: https://docs.astral.sh/uv/