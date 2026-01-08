import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepo: Repository<Site>,
  ) {}

  findByUser(userId: number) {
    return this.sitesRepo.find({ where: { user_id: userId } });
  }

  async create(userId: number, data: any) {
    const site = this.sitesRepo.create({
      user_id: userId,
      ...data,
    });
    return this.sitesRepo.save(site);
  }

  findOne(id: number) {
    return this.sitesRepo.findOne({ where: { id } });
  }

  async update(id: number, data: any) {
    const oldSite = await this.findOne(id);
    
    // Se está atualizando settings com novas imagens, deletar as antigas
    if (data.settings && oldSite.settings) {
      const oldSettings = JSON.parse(oldSite.settings);
      const newSettings = JSON.parse(data.settings);
      
      // Deletar logo antigo se mudou
      if (oldSettings.logo_url && newSettings.logo_url && oldSettings.logo_url !== newSettings.logo_url) {
        this.deleteFile(oldSettings.logo_url);
      }
      
      // Deletar hero antigo se mudou
      if (oldSettings.hero_background && newSettings.hero_background && oldSettings.hero_background !== newSettings.hero_background) {
        this.deleteFile(oldSettings.hero_background);
      }
    }
    
    await this.sitesRepo.update(id, data);
    return this.findOne(id);
  }

  async publish(id: number) {
    await this.sitesRepo.update(id, { 
      is_published: true,
      published_at: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const site = await this.findOne(id);
    
    // Deletar todas as imagens do site antes de deletar
    if (site && site.settings) {
      try {
        const settings = JSON.parse(site.settings);
        
        if (settings.logo_url) {
          this.deleteFile(settings.logo_url);
        }
        
        if (settings.hero_background) {
          this.deleteFile(settings.hero_background);
        }
      } catch (err) {
        console.error('Erro ao deletar imagens:', err);
      }
    }
    
    await this.sitesRepo.delete(id);
    return { success: true };
  }

  private deleteFile(url: string) {
    try {
      // Extrair o caminho do arquivo da URL
      // Ex: /uploads/logos/logo-123.png -> ./uploads/logos/logo-123.png
      const filePath = path.join('.', url);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('✅ Arquivo deletado:', filePath);
      }
    } catch (err) {
      console.error('❌ Erro ao deletar arquivo:', err);
    }
  }
}
