import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '../ThemeProvider';
import { ExampleComponent } from './ExampleComponent';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ExampleComponent', () => {
  it('renders with title', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with description', () => {
    renderWithTheme(
      <ExampleComponent 
        title="Test Title" 
        description="Test description" 
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders action button when onAction is provided', () => {
    const mockAction = vi.fn();
    renderWithTheme(
      <ExampleComponent 
        title="Test Title" 
        onAction={mockAction} 
      />
    );
    
    const button = screen.getByRole('button', { name: 'Take Action' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('shows disabled state when disabled is true', () => {
    const mockAction = vi.fn();
    renderWithTheme(
      <ExampleComponent 
        title="Test Title" 
        onAction={mockAction}
        disabled={true}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });

  it('uses secondary variant when specified', () => {
    renderWithTheme(
      <ExampleComponent 
        title="Test Title" 
        onAction={() => {}}
        variant="secondary"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined'); // secondary variant class
  });

  it('does not render button when onAction is not provided', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders icon when showIcon is true', () => {
    renderWithTheme(<ExampleComponent title="Test Title" showIcon={true} />);
    const icon = screen.getByAltText('Example Icon');
    expect(icon).toBeInTheDocument();
  });

  it('does not render icon when showIcon is false', () => {
    renderWithTheme(<ExampleComponent title="Test Title" showIcon={false} />);
    expect(screen.queryByAltText('Example Icon')).not.toBeInTheDocument();
  });

  it('does not render icon by default', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.queryByAltText('Example Icon')).not.toBeInTheDocument();
  });
}); 