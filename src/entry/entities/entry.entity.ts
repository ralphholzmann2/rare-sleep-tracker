import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, VirtualColumn } from 'typeorm';

@Entity()
export class Entry {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.entries)
	user: User;

	@Column()
	date: Date;

	@Column()
	start: Date;

	@Column()
	end: Date;

  @VirtualColumn({ query: (alias) => `SELECT ${alias}."end" - ${alias}."start"` })
  duration: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
