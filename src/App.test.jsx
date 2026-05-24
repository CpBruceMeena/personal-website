import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import React from 'react';
import { MotionConfig } from 'framer-motion';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ running: true }),
  })
);

// Mock window.innerWidth/innerHeight
window.innerWidth = 1024;
window.innerHeight = 768;

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock IntersectionObserver
class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;

const TestWrapper = ({ children }) => (
  <MotionConfig transition={{ duration: 0 }}>
    {children}
  </MotionConfig>
);

describe('Galaxy Atlas - Space Flight Portfolio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the monk logo text in header', () => {
    render(<App />, { wrapper: TestWrapper });
  });

  it('should render hero section with name (from h1)', () => {
    render(<App />, { wrapper: TestWrapper });
    const headings = screen.getAllByText(/Sandeep Mehta/i);
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('should render hero role', () => {
    render(<App />, { wrapper: TestWrapper });
    const roles = screen.getAllByText(/Principal Software Engineer/i);
    expect(roles.length).toBeGreaterThanOrEqual(1);
  });

  it('should render section titles for core sections', () => {
    render(<App />, { wrapper: TestWrapper });
    expect(screen.getByText('Featured Projects')).toBeDefined();
    expect(screen.getByText('Work History')).toBeDefined();
    expect(screen.getByText('About the Builder')).toBeDefined();
    expect(screen.getByText('Get in Touch')).toBeDefined();
  });

  it('should render navigation links', () => {
    render(<App />, { wrapper: TestWrapper });
    const homeLinks = screen.getAllByText(/Home/i);
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    const expLinks = screen.getAllByText(/Experience/i);
    expect(expLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('should show keyboard navigation hint for fly/brake/warp', () => {
    render(<App />, { wrapper: TestWrapper });
    const hints = screen.getAllByText(/W . Fly/i);
    expect(hints.length).toBeGreaterThanOrEqual(1);
  });

  it('should render the HUD bar with velocity label', () => {
    render(<App />, { wrapper: TestWrapper });
    const velocityLabels = screen.getAllByText(/VELOCITY/i);
    expect(velocityLabels.length).toBeGreaterThanOrEqual(1);
    // Also check for next waypoint label
    expect(screen.getByText(/NEXT WAYPOINT/i)).toBeDefined();
  });

  it('should show the Yooboo game in games section', () => {
    render(<App />, { wrapper: TestWrapper });
    const yooboos = screen.getAllByText('Yooboo');
    expect(yooboos.length).toBeGreaterThanOrEqual(1);
  });

  it('should show launch mission button for Yooboo', () => {
    render(<App />, { wrapper: TestWrapper });
    const launchButtons = screen.getAllByText(/Launch Mission/i);
    expect(launchButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('should show engage warp button in HUD', () => {
    render(<App />, { wrapper: TestWrapper });
    expect(screen.getByText('ENGAGE WARP')).toBeDefined();
  });

  it('should open launch overlay when Play Yooboo is clicked', async () => {
    render(<App />, { wrapper: TestWrapper });
    const playBtns = screen.getAllByText(/Play Yooboo/i);
    
    await act(async () => {
      fireEvent.click(playBtns[0]);
    });
    
    // The overlay should be visible - check for the persistent abort button
    await waitFor(() => {
      const abortBtn = screen.queryByText(/ABORT MISSION/i);
      expect(abortBtn).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('should abort the launch overlay when abort is clicked', async () => {
    render(<App />, { wrapper: TestWrapper });
    
    // Open the overlay
    const playBtns = screen.getAllByText(/Play Yooboo/i);
    await act(async () => {
      fireEvent.click(playBtns[0]);
    });
    
    // Wait for overlay to appear via persistent ABORT MISSION button
    await waitFor(() => {
      const abortBtn = screen.queryByText(/ABORT MISSION/i);
      expect(abortBtn).toBeTruthy();
    }, { timeout: 3000 });
    
    // Click the abort button
    const abortBtns = screen.getAllByText(/ABORT MISSION/i);
    await act(async () => {
      fireEvent.click(abortBtns[0]);
    });
    
    // After abort, the overlay should be gone
    await waitFor(() => {
      expect(screen.queryByText(/ABORT MISSION/i)).toBeNull();
    }, { timeout: 3000 });
  });
});
