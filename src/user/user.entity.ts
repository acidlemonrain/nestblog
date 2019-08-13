import { Blog } from '../blog/blog.entity';
import { Category } from '../category/category.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
	ManyToMany,
	JoinTable,
	CreateDateColumn
} from 'typeorm';

//用户属性
@Entity()
export class User extends BaseEntity {
	//包含了 id 用户名 密码 昵称 简介 头像 性别
	@PrimaryGeneratedColumn() id: number;
	//用户名
	@Column({
		type: 'varchar',
		length: 10,
		unique: true
	})
	username: string;
	//密码
	@Column() password: string;
	//简介
	@Column({
		default: 'lazy boy'
	})
	des: string;
	//昵称
	@Column({
		type: 'varchar',
		length: 15,
		default: 'nick name',
		charset: 'utf8'
	})
	nickname: string;
	//头像
	@Column({
		default: 'avatar.jpg'
	})
	avatar: string;
	//博客
	@OneToMany((type) => Blog, (blog) => blog.user)
	blogs: Blog[];
	//博客分类
	@OneToMany((type) => Category, (categories) => categories.user)
	categories: Category[];
}
