/** Error with an HTTP status; thrown by controllers, caught by error middleware. */
export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
