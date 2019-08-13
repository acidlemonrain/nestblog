import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { create } from 'domain';
import { async } from 'rxjs/internal/scheduler/async';
import { Blog } from '../blog/blog.entity';
import { BlogRepository } from '../blog/blog.repository';

@Controller('category')
export class CategoryController {
	constructor(
		@InjectRepository(Category) private categorydb: CategoryRepository,
		@InjectRepository(Blog) private blogdb: BlogRepository
	) {}

	@Post()
	async create(@Body() body) {
		//axios : name, des, user, blog

		const res = await this.categorydb.save(body);
		let blogs = await this.blogdb.findByIds(
			[
				...body.blogs.map((blog) => {
					return blog.id;
				})
			],
			{ relations: [ 'categories' ] }
		);
		let _blogs = blogs.map((blog) => {
			return {
				...blog,
				...{
					categories: [ ...blog.categories, res ]
				}
			};
		});

		this.blogdb.save(_blogs);
		return res;
	}

	@Get()
	async get() {
		return await this.categorydb.find({ relations: [ 'blogs' ] });
	}

	@Delete('/:id')
	async delete(@Param('id') id) {
		return await this.categorydb.delete(id);
	}
}
