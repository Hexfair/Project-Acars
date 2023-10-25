import { Aircraft } from 'src/aircraft/aircraft.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
//===========================================================================================================

@Entity()
export class Acars {
	@PrimaryGeneratedColumn({ name: 'acars_id' })
	id: number;

	@ManyToOne(() => Aircraft, (aircraft) => aircraft.acars)
	aircraft: Aircraft;

	@Column()
	text: string;

	@Column()
	timestamp: string;

	@Column()
	callsign: string;

	@Column()
	program: string;

	@Column()
	from: string;

	@Column()
	to: string;

	@CreateDateColumn()
	createdAt: Date;
}