export interface IAuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  confirmationEmail: string | null;
  errorMessage: string | null;
  provider: "google-oauth2" | "spotify" | null;
  setAccess: (access: string) => void;
  setRefresh: (refresh: string) => void;
  setIsAuthenticated: (value: boolean) => void;
  setConfirmationEmail: (value: string) => void;
  setErrorMessage: (value: string) => void;
  setProvider: (provider: "google-oauth2" | "spotify") => void;
  clearUser: () => void;
  clearAccess: () => void;
  clearRefresh: () => void;
  clearErrorMessage: () => void;
  clearProvider: () => void;
  hydrate: () => void;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_company: boolean;
  company_name?: string;
  get_full_name: string;
  bio?: string;
  profile_images?: ProfileImage[];
  is_onboarded?: boolean;
  is_creator: boolean;
  date_of_birth: string;
  date_joined: string;
  last_visit: string;
  // followed_podcasts: string;
  // followed_blogs: string;
}

export interface ProfileImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface UserRegister {
  email: string;
  password: string;
  re_password: string;
  is_creator: boolean;
}

export interface UserActivation {
  uid: string;
  token: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface OAuthLogin {
  provider: "google-oauth2" | "spotify" | null;
}

export interface OAuthLoginResponse extends OAuthLogin {
  authorizationUrl: string;
}

export interface OAuthParams {
  state: string;
  code: string;
}

export interface OAuthAuthenticate extends OAuthLogin, OAuthParams {}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface UserRestorePassword {
  email: string;
}

export interface UserResetPassword {
  new_password: string;
  re_new_password: string;
}
