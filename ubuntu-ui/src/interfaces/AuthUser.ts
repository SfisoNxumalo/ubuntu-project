export interface AuthUser {
  id: string;        // Guid
  fullName: string;
  email: string;
  phoneNumber: string;
  token: string;
  role:string
}

export interface loginRequest {
  email: string;
  password: string;
}