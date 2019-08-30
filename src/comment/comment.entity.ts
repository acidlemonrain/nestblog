import { User } from '../user/user.entity';
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

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn() id: Number;

	@ManyToOne((type) => User, (user) => user.comments)
    user: User;
    
    @Column() gen:Date

    @Column() content: String;
    
    
}
