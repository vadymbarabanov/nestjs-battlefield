import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async createPost(dto: CreatePostDTO, image: any) {
    return this.postRepository.create({ ...dto, image: fileName });
  }
}
