export interface ApiResponseDefault {
  success: boolean;
  message: string;
  path?: string;
  takenTime?: string;
}

export interface ApiResponse<T> extends ApiResponseDefault {
  data?: T;
}

export interface ExceptionResponse extends ApiResponseDefault {
  error?: string[] | undefined;
}
