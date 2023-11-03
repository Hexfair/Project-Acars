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

	@Column({ type: 'timestamptz' })
	timestamp: Date;

	@Column()
	callsign: string;

	@Column()
	mission: string;

	@Column()
	from: string;

	@Column()
	to: string;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	createdAt: Date;
}