export default interface ChangePassword {
  login?: string;
  token: string;
  password: string;
  confirmPassword: string;
}
