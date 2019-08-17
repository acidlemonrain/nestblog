import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { CategoryRepository } from '../category/category.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ BlogRepository, CategoryRepository ]) ],
	controllers: [ BlogController ]
})
export class BlogModule {}
