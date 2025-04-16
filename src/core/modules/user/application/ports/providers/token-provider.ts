export abstract class TokenProvider {
  abstract sign(user: any): Promise<string>;
}
