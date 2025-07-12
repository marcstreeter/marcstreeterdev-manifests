# {{cookiecutter.project_name}}

{{cookiecutter.project_description}}

## Project Structure

This template includes comprehensive examples demonstrating best practices for React development:

### Components (`src/components/`)
- **ExampleComponent**: A reusable component with TypeScript interfaces, props validation, and multiple variants
- **ThemeProvider**: Material-UI theme provider for consistent styling
- Each component has colocated test files (`ComponentName.test.tsx`)

### Pages (`src/pages/`)
- **ExamplePage**: Demonstrates page-level structure with state management, multiple components, and user interactions
- Pages are designed for route-level components with complex layouts

### Utilities (`src/utils/`)
- **example-utils.ts**: Common utility functions including:
  - `formatCurrency()`: Currency formatting with locale support
  - `capitalizeWords()`: Text capitalization utility
  - `debounce()`: Function debouncing utility
  - `isValidEmail()`: Email validation
  - `truncateString()`: String truncation with custom suffixes
- Each utility has comprehensive tests (`utilityName.test.ts`)

### Assets (`src/assets/`)
- **icons/**: SVG icons and icon components
- **images/**: Static images and logos
- **index.ts**: Centralized asset exports

### Stories (`src/components/*/ComponentName.stories.tsx`)
- Storybook stories for component documentation and testing
- Interactive controls for props
- Multiple story variants demonstrating different use cases

## Testing Strategy

This template follows the colocated testing pattern where test files live next to the files they test:

```
src/
├── components/
│   └── ExampleComponent/
│       ├── ExampleComponent.tsx
│       ├── ExampleComponent.test.tsx
│       ├── ExampleComponent.stories.tsx
│       └── index.ts
├── pages/
│   └── ExamplePage/
│       ├── ExamplePage.tsx
│       └── ExamplePage.test.tsx
└── utils/
    ├── example-utils.ts
    └── example-utils.test.ts
```

## Development

### Prerequisites
- Node.js (version specified in package.json)
- npm or yarn

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Testing
```bash
npm test
npm run test:ui
```

### Storybook
```bash
npm run storybook
```

### Building
```bash
npm run build
```

## Key Features

- **TypeScript**: Full type safety with proper interfaces
- **Material-UI**: Modern component library with theming
- **Vitest**: Fast unit testing with React Testing Library
- **Storybook**: Component documentation and development
- **ESLint + Prettier**: Code quality and formatting
- **Colocated Tests**: Tests live next to source files
- **Comprehensive Examples**: Real-world patterns and practices

## Example Usage

### Using Components
```tsx
import { ExampleComponent } from './components/ExampleComponent';

<ExampleComponent
  title="My Component"
  description="Optional description"
  onAction={() => console.log('Action!')}
  variant="primary"
  showIcon={true}
/>
```

### Using Utilities
```tsx
import { formatCurrency, isValidEmail } from './utils/example-utils';

const price = formatCurrency(1234.56); // "$1,234.56"
const isValid = isValidEmail('user@example.com'); // true
```

### Using Assets
```tsx
import ExampleIcon from './assets/icons/example-icon.svg';
import ExampleLogo from './assets/images/example-logo.png';

// Use in components
<img src={ExampleIcon} alt="Example Icon" />
<img src={ExampleLogo} alt="Example Logo" />

// Or import from the centralized assets index
import { ExampleIcon, ExampleLogo } from './assets';
```

### Writing Tests
```tsx
import { render, screen } from '@testing-library/react';
import { ExampleComponent } from './ExampleComponent';

describe('ExampleComponent', () => {
  it('renders with title', () => {
    render(<ExampleComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Customization

1. Replace example components with your actual components
2. Update the theme in `src/theme.ts`
3. Add your own utilities to `src/utils/`
4. Create new pages in `src/pages/`
5. Add assets to `src/assets/`

## Deployment

This project is configured for deployment with:
- Docker containerization
- Kubernetes manifests
- Tilt for development
- GitHub Actions CI/CD

See the `manifests/` directory for deployment configuration. 