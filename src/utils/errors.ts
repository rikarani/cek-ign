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
  public status: number = 503;
}

export class AccountNotFoundError extends CustomError {
  public code: string = "ACCOUNT_NOT_FOUND";
  public status: number = 404;
}
