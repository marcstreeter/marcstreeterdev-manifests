# marcstreeterdev Helm Chart Template

This is a template Helm chart for creating new services in the marcstreeterdev project.

## Purpose

This chart serves as a starting point for new services that need to be deployed to Kubernetes. It provides a standardized structure and common configuration options that align with the marcstreeterdev project patterns.

## Usage

To use this template for a new service:

1. Copy this entire directory to your new service's `manifests/` directory
2. Update the `Chart.yaml` with your service's name and description
3. Customize the `values.yaml` file for your service's specific needs
4. Update the templates in the `templates/` directory as needed
5. Add environment-specific values files (e.g., `values-dev.yaml`, `values-prod.yaml`)

## Structure

```
manifests/
├── Chart.yaml          # Chart metadata
├── values.yaml         # Default values
├── values-dev.yaml     # Development environment values
├── values-prod.yaml    # Production environment values
├── templates/          # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── _helpers.tpl
└── README.md           # This file
```

## Current Services

The following services have their own Helm charts based on this template:

- **Backend**: `marcstreeterdev-backend/manifests/`
- **Frontend**: `marcstreeterdev-frontend/manifests/`

## Notes

- This template is not currently used by any active services
- Each service maintains its own Helm chart for better isolation and flexibility
- The template follows the same patterns as the existing service charts 