import {
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
	Body,
	Req,
 
	UploadedFiles,
	Delete,
	Patch
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './gallery.entity';
import { GalleryRepository } from './gallery.repository';
import { diskStorage } from 'multer';
import { FileInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { request } from 'express';
import { extname } from 'path';
import { GalleryModule } from './gallery.module';
import { unlinkSync } from 'fs';
import { Param } from '@nestjs/common';
import bodyParser = require('body-parser');
@Controller('gallery')
export class GalleryController {
	constructor(@InjectRepository(Gallery) private gallerydb: GalleryRepository) {}
	@Get()
	get() {
		return 'this is gallery';
	}

	@Post()
	@UseInterceptors(
		FilesInterceptor('file', 50, {
			storage: diskStorage({
				destination: './avatars',
				filename: (req, file, cb) => {
					return cb(null, `${Math.random()}${extname(file.originalname)}`);
				}
			})
		})
	)
	async post(@UploadedFiles() file, @Req() req) {
		//name , des , user , photos
		return await this.gallerydb.save({
			...req.body,
			...{
				photos: file.map((file) => {
					return file.filename;
				})
			}
		});
	}
	@Get('/:id')
	async getbyuser(@Param('id') id) {
		return await this.gallerydb.find({ user: id });
	}

	@Get('/edit/:id')
	async editbyid(@Param('id') id) {
		return await this.gallerydb.findOne({ id: id });
	}

	//delete
	@Delete('/:id')
	deletebyid(@Param('id') id) {
		this.gallerydb.delete(id);
		return 1;
	}

	//添加图片
	@Patch('/photo/:id')
	@UseInterceptors(
		FilesInterceptor('file', 50, {
			storage: diskStorage({
				destination: './avatars',
				filename: (req, file, cb) => {
					return cb(null, `${Math.random()}${extname(file.originalname)}`);
				}
			})
		})
	)
	async addimg(@UploadedFiles() file, @Param('id') id) {
		const addedimgs = file.map((file) => {
			return file.filename;
		});

		const target = await this.gallerydb.findOne(id);
		target.photos.push(addedimgs);
		return await this.gallerydb.save(target);
	}

	//删除选中图片
	@Patch('/imgrm/:id')
	async delete(@Param('id') id, @Body() body) {
		console.log(body);

		body.deletefiles.forEach((name) => {
			unlinkSync('avatars/' + name);
		});

		return await this.gallerydb.update(id, {
			photos: body.restfiles
		});
	}
}
