# marcstreeterdev Manifests

Centralized Kubernetes manifests and service management for the marcstreeterdev project ecosystem.

## Overview

This repository contains the central configuration for deploying and managing all marcstreeterdev services in Kubernetes. It provides:

- **Helm Charts**: Centralized Helm chart for deploying the entire stack
- **Service Templates**: [Copier] templates for making boilerplate for new services
- **Development Environment**: [Tilt] configuration for local development
- **Automated Updates**: GitHub Actions for keeping all services in sync with template updates

## Associated Services

The following services are designed to work together as part of the marcstreeterdev ecosystem:

| Name                                                                 | Service Type | Purpose                                      |
|----------------------------------------------------------------------|--------------|----------------------------------------------|
| [marcstreeterdev-backend](https://github.com/marcstreeter/marcstreeterdev-backend)   | FastAPI      | Backend API for business logic and data      |
| [marcstreeterdev-frontend](https://github.com/marcstreeter/marcstreeterdev-frontend) | React        | Frontend web application (UI)

## Tech Stack
Tech stack is easily reproduced using [asdf] or [brew] but choose your own adventure 🤞.

### Core Infrastructure
- [Kubernetes] - Container orchestration
- [Helm] - Kubernetes package manager
- [Docker] - Container runtime

### Requirements
- [Tilt] - Local development environment
- [Just] - Task runner (optional but highly suggested)
- [Copier] - Template management and updates and [why](https://john-miller.dev/posts/cookiecutter-with-cruft-for-platform-engineering/)
- [UV] - (see asdf's .tool-versions for the required version)
- [gh] - used so we can automate github activities (creating repository/github pages)

### Service Types

The intention is that as these templates are updated here, a github action will proactively update the dependent services.

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
[Copier]: https://copier.readthedocs.io/en/stable/
[FastAPI]: https://fastapi.tiangolo.com/
[React]: https://react.dev/
[asdf]: https://asdf-vm.com/
[brew]: https://brew.sh/
[UV]: https://docs.astral.sh/uv/
[gh]: https://cli.github.com/