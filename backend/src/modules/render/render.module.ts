import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenderController } from './render.controller';
import { RenderService } from './render.service';
import { Site } from '../sites/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  controllers: [RenderController],
  providers: [RenderService],
})
export class RenderModule {}
