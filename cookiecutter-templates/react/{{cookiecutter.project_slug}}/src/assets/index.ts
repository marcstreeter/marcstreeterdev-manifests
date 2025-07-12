// Asset exports
export { default as ExampleIcon } from './icons/example-icon.svg';
export { default as ExampleLogo } from './images/example-logo.png';

// You can also export asset URLs or other asset-related utilities here
export const ASSET_PATHS = {
  icons: {
    example: '/src/assets/icons/example-icon.svg',
  },
  images: {
    logo: '/src/assets/images/example-logo.png',
  },
} as const; 