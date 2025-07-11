#!/bin/bash

# Script to migrate existing marcstreeterdev services to use Cruft
# Usage: ./scripts/migrate-to-cruft.sh [service-name]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if cruft is installed
check_cruft() {
    if ! command -v cruft &> /dev/null; then
        print_error "Cruft is not installed. Please install it first:"
        echo "  pip install cruft"
        echo "  or"
        echo "  brew install cruft"
        exit 1
    fi
}

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MANIFESTS_DIR="$(dirname "$SCRIPT_DIR")"

# Function to migrate a single service
migrate_service() {
    local service_name=$1
    local service_path="../$service_name"
    
    print_status "Migrating $service_name to Cruft..."
    
    # Check if service directory exists
    if [ ! -d "$service_path" ]; then
        print_error "Service directory $service_path does not exist"
        return 1
    fi
    
    # Check if already has .cruft.json
    if [ -f "$service_path/.cruft.json" ]; then
        print_warning "$service_name already has .cruft.json, skipping..."
        return 0
    fi
    
    # Determine template type based on service content
    local template_type=""
    if [ -f "$service_path/pyproject.toml" ]; then
        template_type="fastapi"
    elif [ -f "$service_path/package.json" ]; then
        template_type="react"
    else
        print_error "Could not determine template type for $service_name"
        return 1
    fi
    
    print_status "Detected template type: $template_type"
    
    # Link the service to the appropriate template
    cd "$service_path"
    
    # Create a backup of current state
    if [ -d ".git" ]; then
        print_status "Creating backup branch..."
        git checkout -b "backup-before-cruft-migration" 2>/dev/null || true
        git checkout main 2>/dev/null || true
    fi
    
    # Link to template
    print_status "Linking to template..."
    if cruft link "$MANIFESTS_DIR/cookiecutter-templates/$template_type" --checkout main; then
        print_success "$service_name successfully linked to $template_type template"
        
        # Check for updates
        print_status "Checking for template updates..."
        if cruft check; then
            print_success "$service_name is up to date with template"
        else
            print_warning "$service_name has template updates available"
            print_status "Run 'cruft update' in $service_path to apply updates"
        fi
    else
        print_error "Failed to link $service_name to template"
        return 1
    fi
    
    cd "$MANIFESTS_DIR"
}

# Main execution
main() {
    print_status "Starting migration to Cruft..."
    
    # Check prerequisites
    check_cruft
    
    # Change to manifests directory
    cd "$MANIFESTS_DIR"
    
    if [ $# -eq 1 ]; then
        # Migrate specific service
        migrate_service "$1"
    else
        # Migrate all services
        print_status "Discovering marcstreeterdev services..."
        
        for service_dir in ../marcstreeterdev-*; do
            if [ -d "$service_dir" ]; then
                service_name=$(basename "$service_dir")
                if [ "$service_name" != "marcstreeterdev-manifests" ]; then
                    migrate_service "$service_name"
                    echo ""
                fi
            fi
        done
        
        print_success "Migration complete!"
        print_status "Next steps:"
        echo "  1. Review the changes in each service"
        echo "  2. Test that services still work correctly"
        echo "  3. Commit the changes to each service"
        echo "  4. Run 'just check-updates' to verify everything is working"
    fi
}

# Run main function with all arguments
main "$@" 