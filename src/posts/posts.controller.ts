import { Controller } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  createPost(dto: CreatePostDTO) {}
}
