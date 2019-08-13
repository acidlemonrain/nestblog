import { Controller, Post, Get, Body, Param, Res } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
	constructor(@InjectRepository(User) private userdb: UserRepository) {}
	@Post()
	async createUser(@Body() body) {
		const res = await this.userdb.save(body);
		return res;
	}

	//music

	@Get('avatars/:fileId')
	async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
		try {
			res.sendFile(fileId, { root: 'avatars' });
		} catch (e) {
			console.log(e);
		}
	}

	@Post('/auth') //axios : username, password
	async auth(@Body() body) {
		const user = await this.userdb.findOne(
			{ username: body.username },
			{
				relations: [ 'blogs', 'categories', 'categories.blogs', 'blogs.categories' ]
			}
		);
		if (user && user.password === body.password) {
			return user;
		} else {
			return false;
		}
	}
}
