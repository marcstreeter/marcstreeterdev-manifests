import type { Meta, StoryObj } from '@storybook/react';
import { ExampleComponent } from './ExampleComponent';

const meta: Meta<typeof ExampleComponent> = {
  title: 'Components/ExampleComponent',
  component: ExampleComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    onAction: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example Component',
    description: 'This is a basic example component with a title and description.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Interactive Component',
    description: 'This component has an action button that can be clicked.',
    onAction: () => console.log('Action clicked!'),
    showIcon: true,
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Variant',
    description: 'This component uses the secondary button variant.',
    variant: 'secondary',
    onAction: () => console.log('Secondary action clicked!'),
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Component',
    description: 'This component is disabled and cannot be interacted with.',
    onAction: () => console.log('This should not be called'),
    disabled: true,
  },
};

export const NoDescription: Story = {
  args: {
    title: 'Component Without Description',
  },
};

export const NoAction: Story = {
  args: {
    title: 'Static Component',
    description: 'This component has no action button.',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Component With Icon',
    description: 'This component includes an icon from the assets.',
    showIcon: true,
  },
}; 