import { IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	AfterLoad,
	AfterInsert,
	AfterUpdate,
} from "typeorm";

@Entity()
export class Entry {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => User,
		(user) => user.entries,
		{ nullable: false },
	)
	user: User;

	@Column()
	startTime: number;

	@Column()
	endTime: number;

	@IsOptional()
	duration: number;

	@AfterLoad()
	@AfterInsert()
	@AfterUpdate()
	generateDuration(): void {
		this.duration = Math.round((this.endTime - this.startTime) / 1000);
	}

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
