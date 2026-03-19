export interface SignInRequestDTO {
  username: string;
  password: string;
}

export interface SignInResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequestDTO {
  name: string;
  username: string;
  password: string;
}

export interface SignUpResponseDTO {
  id: string;
}

export interface RefreshRequestDTO {
  refreshToken: string;
}

export interface RefreshResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutRequestDTO {
  accessToken: string;
}
