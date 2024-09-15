import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class CommentViewController {
  @Get('mycomment')
  @Render('index')
  home() {
    return {};
  }
}
