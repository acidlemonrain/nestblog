import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';

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
		CategoryModule
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
