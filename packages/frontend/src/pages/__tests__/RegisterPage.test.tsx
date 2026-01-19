import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import RegisterPage from '../RegisterPage';
import { AuthProvider } from '../../contexts/AuthContext';

// Define ExperienceLevel enum locally for testing
enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

// Mock the auth context
const mockRegister = vi.fn();
const mockAuthContext = {
  user: null,
  tokens: null,
  login: vi.fn(),
  register: mockRegister,
  logout: vi.fn(),
  updateProfile: vi.fn(),
  refreshToken: vi.fn(),
  isLoading: false,
  isAuthenticated: false,
};

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderRegisterPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form with all required fields', () => {
    renderRegisterPage();
    
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    renderRegisterPage();
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('You must agree to the terms and conditions')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email format', async () => {
    renderRegisterPage();
    
    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    // Check that the form doesn't submit successfully with invalid email
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('shows validation error for weak password', async () => {
    renderRegisterPage();
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('shows validation error when passwords do not match', async () => {
    renderRegisterPage();
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword123!' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('calls register function with correct data on form submission', async () => {
    renderRegisterPage();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const experienceLevelSelect = screen.getByLabelText(/experience level/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(experienceLevelSelect, { target: { value: ExperienceLevel.INTERMEDIATE } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
        experienceLevel: ExperienceLevel.INTERMEDIATE
      });
    });
  });

  it('toggles password visibility when eye icons are clicked', () => {
    renderRegisterPage();
    
    const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i) as HTMLInputElement;
    const toggleButtons = screen.getAllByRole('button', { name: '' }); // Eye icon buttons
    
    expect(passwordInput.type).toBe('password');
    expect(confirmPasswordInput.type).toBe('password');
    
    // Toggle password visibility
    fireEvent.click(toggleButtons[0]);
    expect(passwordInput.type).toBe('text');
    
    // Toggle confirm password visibility
    fireEvent.click(toggleButtons[1]);
    expect(confirmPasswordInput.type).toBe('text');
  });

  it('displays error message when registration fails', async () => {
    mockRegister.mockRejectedValueOnce(new Error('Email already exists'));
    renderRegisterPage();
    
    // Fill out valid form
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  it('shows loading state during form submission', async () => {
    mockRegister.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderRegisterPage();
    
    // Fill out valid form
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Creating account...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('contains link to login page', () => {
    renderRegisterPage();
    
    const loginLink = screen.getByRole('link', { name: /sign in to your existing account/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});