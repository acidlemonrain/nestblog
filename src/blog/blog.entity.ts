import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
	ManyToOne
} from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	//html
	@Column({
		type: 'text',
		charset: 'utf8'
	})
	html: string;
	//简介html
	@Column() content: string;
	//标题
	@Column() title: string;

	//创建时间
	@Column() gen: Date;

	//阅读量
	@Column({
		default: 0
	})
	views: number;

	//跟新时间
	// @Column() update: Date;

	@ManyToOne((type) => User, (user) => user.blogs)
	user: User;
	//categories
	@ManyToMany((type) => Category, { cascade: true, onDelete: 'CASCADE' })
	@JoinTable()
	categories: Category[];
}
