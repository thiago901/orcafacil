import { Post } from '@core/modules/post/entities/post';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { PostRepository } from '../ports/repositories/post-repository';

interface RequestProps {
  userId: number;
}

type ResponseProps = Either<
  null,
  {
    posts: Post[];
  }
>;

@Injectable()
export class ListPostsByUserUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ userId }: RequestProps): Promise<ResponseProps> {
    const posts = await this.postRepository.findByUserId(userId);

    return right({ posts });
  }
}
