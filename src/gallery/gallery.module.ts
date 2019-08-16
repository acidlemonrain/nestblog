import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './gallery.entity';
import { GalleryRepository } from './gallery.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ GalleryRepository ]) ],
	controllers: [ GalleryController ]
})
export class GalleryModule {}
