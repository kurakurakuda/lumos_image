class ErrorRes {
  error: string;
  description: string;

  constructor(error: string, description: string) {
    this.error = error;
    this.description = description;
  }
}

export default ErrorRes;
