export class NotFound extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "Not Found";
  }
}
