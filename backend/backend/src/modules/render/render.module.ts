import { Module } from '@nestjs/common';
import { RenderController } from './render.controller';
import { RenderService } from './render.service';
import { SitesModule } from '../sites/sites.module';

@Module({
  imports: [SitesModule],
  controllers: [RenderController],
  providers: [RenderService],
})
export class RenderModule {}
