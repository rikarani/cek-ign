import { StatusMap } from "elysia";

abstract class CustomError extends Error {
  public abstract readonly code: string;
  public abstract readonly status: number;

  public toResponse(): Response {
    return Response.json(
      {
        success: false,
        error: {
          code: this.code,
          message: this.message,
        },
      },
      { status: this.status },
    );
  }
}

export class ExternalServerError extends CustomError {
  public code: string = "EXTERNAL_SERVER_ERROR";
  public status: number = StatusMap["Service Unavailable"];
  public message: string = "Ada error di API Codashop";
}

export class AccountNotFoundError extends CustomError {
  public code: string = "ACCOUNT_NOT_FOUND";
  public status: number = StatusMap["Not Found"];
  public message = "Akun tidak ditemukan";
}

export class InvalidUidError extends CustomError {
  public code: string = "INVALID_UID";
  public status: number = StatusMap["Unprocessable Content"];
  public message: string = "ID / UID tidak valid";
}

export class AccountRegionError extends CustomError {
  public code: string = "ACCOUNT_REGION_ERROR";
  public status: number = StatusMap["Service Unavailable"];
  public message: string = "Cuma bisa ngecek akun region Indonesia";
}
