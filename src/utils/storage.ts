/**
 * Secure token storage using localStorage with fallback to sessionStorage
 * In production, consider using httpOnly cookies for refresh tokens
 */

const ACCESS_TOKEN_KEY = 'sentra_access_token';
const REFRESH_TOKEN_KEY = 'sentra_refresh_token';
const USER_KEY = 'sentra_user';

export const setTokens = (accessToken: string, refreshToken: string): void => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    // Store refresh token in memory or sessionStorage for enhanced security
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Failed to store tokens:', error);
  }
};

export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to retrieve access token:', error);
    return null;
  }
};

export const getRefreshToken = (): string | null => {
  try {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to retrieve refresh token:', error);
    return null;
  }
};

export const clearTokens = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
};

export const setUser = (user: any): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
};

export const getUser = (): any | null => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to retrieve user:', error);
    return null;
  }
};
