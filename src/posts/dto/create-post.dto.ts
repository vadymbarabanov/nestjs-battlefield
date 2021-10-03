export class CreatePostDTO {
  readonly title: string;
  readonly content: string;
  // TODO: get user id from jwt
  readonly userId: number;
}
