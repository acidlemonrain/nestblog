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
		//根据body创建一个标签
		const res = await this.categorydb.save(body);
		//对于收录到了该标签的文章要对他的标签分类就行修过（添加一个新标签）
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
	//获取所有
	@Get()
	async get() {
		return await this.categorydb.find({ relations: [ 'blogs' ] });
	}

	@Delete('/:id')
	async delete(@Param('id') id) {
		return await this.categorydb.delete(id);
	}
}
