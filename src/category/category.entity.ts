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
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn() id: Number;

	@Column() name: String;

	@Column() des: String;
	//所属人
	@ManyToOne((type) => User, (user) => user.categories, { cascade: true, onDelete: 'CASCADE' })
	user: User;
	//包含的文章
	@ManyToMany((type) => Blog, { cascade: true, onDelete: 'CASCADE' })
	@JoinTable()
	blogs: Blog[];
}
