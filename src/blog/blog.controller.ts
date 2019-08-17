import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Repository, Connection, getConnection } from 'typeorm';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { async } from 'rxjs/internal/scheduler/async';
import { identity } from 'rxjs';
import { Category } from '../category/category.entity';
import { CategoryRepository } from '../category/category.repository';

@Controller('blog')
export class BlogController {
	constructor(
		@InjectRepository(Blog) private blogdb: BlogRepository,
		@InjectRepository(Category) private categorydb: CategoryRepository
	) {}
	@Get()
	async get() {
		return await this.blogdb.find({
			relations: [ 'categories' ],
			order: { gen: 'DESC' }
		});
	}

	@Post() //axios : html, content
	async createBlog(@Body() body) {
		const blog = {
			...body,
			...{
				gen: new Date(),
				user: 1
			}
		};
		const res = await this.blogdb.save(blog);
		return res;
	}

	@Get('/:id') //url : id
	async GetById(@Param('id') id) {
		return await this.blogdb.findOne(id, { relations: [ 'categories' ] });
	}

	@Patch('/update/:id') //url : id;  axios : html, content
	async PatchById(@Param('id') id, @Body() body) {
		return await this.blogdb.update(id, body);
	}

	@Delete('/:id')
	async deleteblog(@Param('id') id) {
		return await this.blogdb.delete(id);
	}

	@Patch('/blog/:blogid/tag/:tagid/')
	async addtag(@Param('blogid') blogid, @Param('tagid') tagid) {
		const target = await this.blogdb.findOne(blogid, { relations: [ 'categories' ] });
		const tag = await this.categorydb.findOne(tagid, { relations: [ 'blogs' ] });
		//添加新的标签
		target.categories.push(tag);
		console.log(await this.blogdb.save(target));

		//收录新的文章
		tag.blogs.push(target);
		console.log(await this.categorydb.save(tag));

		return 1;
	}

	@Patch('/deletetag/:blogid/tag/:tagid')
	async deletetag(@Param('blogid') blogid, @Param('tagid') tagid) {
		console.log(blogid, tagid);

		const target = await this.blogdb.findOne(blogid, { relations: [ 'categories' ] });
		const tag = await this.categorydb.findOne(tagid, { relations: [ 'blogs' ] });

		//删除已有的标签
		console.log(target.categories);

		target.categories = target.categories.filter((tag) => {
			return tag.id != tagid;
		});

		console.log(typeof await this.blogdb.save(target));
		console.log(target.categories);
		//删除已出去的文章
		tag.blogs = tag.blogs.filter((blog) => {
			return blog.id != blogid;
		});
		console.log(typeof await this.categorydb.save(tag));
		return 1;
	}
}
