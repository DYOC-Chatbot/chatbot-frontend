export interface LogInPostData {
  username: string;
  password: string;
}

export interface SignUpPostData extends LogInPostData {}

export interface User {
  id: number;
  username: string;
}
