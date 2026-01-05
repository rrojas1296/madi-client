export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface Response {
  message: string;
  status: number;
}
