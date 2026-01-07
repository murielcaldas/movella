import { Controller, Get, Query } from '@nestjs/common';
import { RenderService } from './render.service';

@Controller('render')
export class RenderController {
  constructor(private renderService: RenderService) {}

  @Get()
  getSiteData(@Query('subdomain') subdomain: string) {
    return this.renderService.getSiteBySubdomain(subdomain);
  }
}
