export interface User {
  id: number;
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  token: string;
}

export interface RegisterUserDto {
  username: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}
