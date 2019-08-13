import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Repository, Connection, getConnection } from 'typeorm';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('blog')
export class BlogController {
	constructor(@InjectRepository(Blog) private blogdb: BlogRepository) {}
	@Get()
	async get() {
		const res = await getConnection()
			.getRepository(Blog)
			.createQueryBuilder('blog')
			.leftJoinAndSelect('blog.categories', 'category')
			.getMany();
		return res;
		//	return await this.blogdb.find({ relations: [ 'categories' ] });
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
		return await this.blogdb.findOne(id);
	}

	@Patch('/:id') //url : id;  axios : html, content
	async PatchById(@Param('id') id, @Body() body) {
		return await this.blogdb.update(id, body);
	}

	@Delete('/:id')
	async deleteblog(@Param('id') id) {
		return await this.blogdb.delete(id);
	}
}
