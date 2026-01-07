import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async sendOTP(whatsapp: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`📱 OTP para ${whatsapp}: ${code}`);
    return { success: true, message: 'Código enviado via WhatsApp' };
  }

  async verifyOTP(whatsapp: string, code: string) {
    let user = await this.usersRepo.findOne({ where: { whatsapp } });
    
    if (!user) {
      user = this.usersRepo.create({ whatsapp, role: 'client' });
      await this.usersRepo.save(user);
    }
    
    const token = this.jwtService.sign({ 
      sub: user.id, 
      whatsapp: user.whatsapp 
    });
    
    return { token, user };
  }
}
