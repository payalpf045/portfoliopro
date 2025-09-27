// This is a simple, non-production-ready auth mechanism for the admin panel.
// It relies on client-side sessionStorage.

const AUTH_KEY = 'payal-admin-auth';

export const checkPassword = (password: string): boolean => {
  // In a real application, this would be a secure, hashed password comparison.
  // For this project, we use an environment variable.
  return password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin');
};

export const setAuthenticated = (): void => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(AUTH_KEY, 'true');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(AUTH_KEY) === 'true';
  }
  return false;
};

export const clearAuthentication = (): void => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(AUTH_KEY);
  }
};
