export interface GeneralDto<T> {
    data?: T;
    success: boolean;
    message?: string;
    errors?: string;
  }
  