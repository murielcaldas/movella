import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import * as fs from 'fs';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  
  @Post('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/logos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `logo-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Apenas imagens são permitidas!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  uploadLogo(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/logos/${file.filename}`,
      filename: file.filename,
    };
  }

  @Post('hero')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/heroes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `hero-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Apenas imagens são permitidas!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  uploadHero(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/heroes/${file.filename}`,
      filename: file.filename,
    };
  }

  @Delete(':filename')
  deleteFile(@Param('filename') filename: string) {
    const logoPath = `./uploads/logos/${filename}`;
    const heroPath = `./uploads/heroes/${filename}`;

    if (fs.existsSync(logoPath)) {
      fs.unlinkSync(logoPath);
      return { success: true, message: 'Logo deletado' };
    }

    if (fs.existsSync(heroPath)) {
      fs.unlinkSync(heroPath);
      return { success: true, message: 'Hero deletado' };
    }

    return { success: false, message: 'Arquivo não encontrado' };
  }
}
