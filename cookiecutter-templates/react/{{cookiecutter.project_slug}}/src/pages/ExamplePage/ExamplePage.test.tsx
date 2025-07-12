import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '../../components/ThemeProvider';
import { ExamplePage } from './ExamplePage';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ExamplePage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders page title and description', () => {
    renderWithTheme(<ExamplePage />);
    
    expect(screen.getByText('Example Page')).toBeInTheDocument();
    expect(screen.getByText(/This is an example page demonstrating/)).toBeInTheDocument();
  });

  it('renders interactive and static component sections', () => {
    renderWithTheme(<ExamplePage />);
    
    expect(screen.getByText('Interactive Component')).toBeInTheDocument();
    expect(screen.getByText('Static Component')).toBeInTheDocument();
  });

  it('increments counter when action button is clicked', () => {
    renderWithTheme(<ExamplePage />);
    
    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.click(actionButton);
    
    expect(screen.getByText('Clicks: 1')).toBeInTheDocument();
  });

  it('shows success alert when action is performed', async () => {
    renderWithTheme(<ExamplePage />);
    
    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.click(actionButton);
    
    expect(screen.getByText(/Action completed! Counter is now 1/)).toBeInTheDocument();
  });

  it('hides alert after 3 seconds', async () => {
    renderWithTheme(<ExamplePage />);
    
    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.click(actionButton);
    
    expect(screen.getByText(/Action completed!/)).toBeInTheDocument();
    
    vi.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(screen.queryByText(/Action completed!/)).not.toBeInTheDocument();
    });
  });

  it('resets counter when reset button is clicked', () => {
    renderWithTheme(<ExamplePage />);
    
    // First increment the counter
    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.click(actionButton);
    expect(screen.getByText('Clicks: 1')).toBeInTheDocument();
    
    // Then reset it
    const resetButton = screen.getByRole('button', { name: 'Reset Counter' });
    fireEvent.click(resetButton);
    expect(screen.getByText('Clicks: 0')).toBeInTheDocument();
  });

  it('disables reset button when counter is 0', () => {
    renderWithTheme(<ExamplePage />);
    
    const resetButton = screen.getByRole('button', { name: 'Reset Counter' });
    expect(resetButton).toBeDisabled();
  });

  it('enables reset button when counter is greater than 0', () => {
    renderWithTheme(<ExamplePage />);
    
    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.click(actionButton);
    
    const resetButton = screen.getByRole('button', { name: 'Reset Counter' });
    expect(resetButton).not.toBeDisabled();
  });
}); 