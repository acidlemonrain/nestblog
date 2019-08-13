import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { BlogRepository } from '../blog/blog.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ CategoryRepository, BlogRepository ]) ],
	controllers: [ CategoryController ]
})
export class CategoryModule {}
