import { Acars } from 'src/acars/acars.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
//=========================================================================================================================

@Entity()
export class Aircraft {
	@PrimaryGeneratedColumn({ name: 'aircraft_id' })
	id: number;

	@Column({ unique: true })
	hex: string;

	@Column()
	reg: string;

	@Column()
	type: string;

	@OneToMany(() => Acars, (acars) => acars.aircraft)
	acars: Acars[];

	@CreateDateColumn()
	createdAt: Date;
}
