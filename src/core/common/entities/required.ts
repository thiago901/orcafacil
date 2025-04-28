/**
 * Make some properties required on type
 *
 * @example
 * ```typescript
 * type Post = {
 *  id?: string;
 *  name?: string;
 *  email?: string;
 * }
 *
 * RequiredProps<Post, 'id' | 'email'>
 * // id e email se tornam obrigatórios, name continua opcional
 * ```
 **/
export type RequiredProps<T, K extends keyof T> = {
  [P in K]-?: NonNullable<T[P]>;
} & Omit<T, K>;
