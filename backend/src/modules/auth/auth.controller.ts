import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-otp')
  sendOTP(@Body('whatsapp') whatsapp: string) {
    return this.authService.sendOTP(whatsapp);
  }

  @Post('verify-otp')
  verifyOTP(@Body() body: { whatsapp: string; code: string }) {
    return this.authService.verifyOTP(body.whatsapp, body.code);
  }
}
