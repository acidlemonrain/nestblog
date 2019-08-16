import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { User } from '../user/user.entity';
import { Blog } from '../blog/blog.entity';

@Entity()
export class Gallery extends BaseEntity {
	@PrimaryGeneratedColumn() id: Number;

	@Column() name: String;

	@Column() des: String;
	//所属人
	@ManyToOne((type) => User, (user) => user.galleries, { cascade: true, onDelete: 'CASCADE' })
	user: User;
	//包含的phptos
	@Column('simple-array') photos: string[];
}
