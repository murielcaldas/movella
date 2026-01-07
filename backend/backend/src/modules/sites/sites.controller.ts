import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { SitesService } from './sites.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('sites')
@UseGuards(JwtAuthGuard)
export class SitesController {
  constructor(private sitesService: SitesService) {}

  @Get()
  findAll(@Req() req) {
    return this.sitesService.findByUser(req.user.sub);
  }

  @Post()
  create(@Req() req, @Body() data: any) {
    return this.sitesService.create(req.user.sub, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.sitesService.update(+id, data);
  }

  @Put(':id/publish')
  publish(@Param('id') id: string) {
    return this.sitesService.publish(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(+id);
  }
}
