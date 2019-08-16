import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from '../blog/blog.repository';
import { CategoryRepository } from './category.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ CategoryRepository, BlogRepository ]) ],
	controllers: [ CategoryController ]
})
export class CategoryModule {}
