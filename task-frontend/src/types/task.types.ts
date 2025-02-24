// export interface LoginCredentials {
//   username: string;
//   password: string;
// }

// export interface RegisterCredentials extends LoginCredentials {
//   confirmPassword: string;
// }

export interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}
