import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SitesModule } from './modules/sites/sites.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { RenderModule } from './modules/render/render.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'movella_production',
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'movella-secret-key-change-in-production',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UsersModule,
    SitesModule,
    TemplatesModule,
    RenderModule,
    UploadModule,
  ],
})
export class AppModule {}
