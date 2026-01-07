import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'movella',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'movella_production',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
})
export class AppModule {}
