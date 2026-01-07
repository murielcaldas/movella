import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../sites/site.entity';

@Injectable()
export class RenderService {
  constructor(
    @InjectRepository(Site)
    private sitesRepo: Repository<Site>,
  ) {}

  async getSiteBySubdomain(subdomain: string) {
    const site = await this.sitesRepo.findOne({ 
      where: { subdomain, is_published: true } 
    });
    
    if (!site) {
      throw new NotFoundException('Site não encontrado');
    }
    
    return site;
  }
}
