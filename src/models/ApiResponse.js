class ApiResponse {
  message;
  status;

  constructor(message, status) {
    this.message = message;
    this.status = status;
  }
}

export default ApiResponse;
