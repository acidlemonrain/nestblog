import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { GalleryModule } from './gallery/gallery.module';
import { CommentModule } from './comment/comment.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'myblog',
			entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
			synchronize: true
		}),
		UserModule,
		BlogModule,
		CategoryModule,
		GalleryModule,
		CommentModule
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
