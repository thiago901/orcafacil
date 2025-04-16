import { Post } from '../../../entities/post';

export abstract class PostRepository {
  abstract save(user: Post): Promise<void>;
  abstract findByUserId(userId: number): Promise<Post[]>;
}
