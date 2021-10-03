import { Body, Controller, UploadedFile } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  create(@Body() dto: CreatePostDTO, @UploadedFile() image) {
    return this.postsService.createPost(dto, image);
  }
}
