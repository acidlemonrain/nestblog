import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([ BlogRepository ]) ],
	controllers: [ BlogController ]
})
export class BlogModule {}
