import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [ TypeOrmModule.forFeature([ UserRepository ]) ],
	controllers: [ UserController ]
})
export class UserModule {}
