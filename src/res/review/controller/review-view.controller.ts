import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ReviewViewController {
  @Get('myreview')
  @Render('index')
  home() {
    return {};
  }
}
