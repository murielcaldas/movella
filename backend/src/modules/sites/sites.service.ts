import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Site} from './site.entity';

@Injectable()
export class SitesService{
  constructor(@InjectRepository(Site) private sitesRepo:Repository<Site>){}
  findByUser(userId:number){return this.sitesRepo.find({where:{user_id:userId}});}
  async create(userId:number,data:any){return this.sitesRepo.save(this.sitesRepo.create({user_id:userId,...data}));}
  findOne(id:number){return this.sitesRepo.findOne({where:{id}});}
  async update(id:number,data:any){
    const settingsToSave=typeof data.settings==='string'?data.settings:JSON.stringify(data.settings);
    await this.sitesRepo.update(id,{...data,settings:settingsToSave});
    return this.findOne(id);
  }
  async publish(id:number){
    await this.sitesRepo.update(id,{is_published:true,published_at:new Date()});
    return this.findOne(id);
  }
  async remove(id:number){await this.sitesRepo.delete(id);return {success:true};}
}
