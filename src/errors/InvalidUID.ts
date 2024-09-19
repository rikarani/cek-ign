export class InvalidUID extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "Invalid UID";
  }
}
