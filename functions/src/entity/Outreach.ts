import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { AttendeeType } from "./enum/AttendeeType";
import { Staff } from "./Staff";

@Entity()
export class Outreach extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;
    
    @Column()
    topic: string;
    
    @Column()
    minutes: number;
    
    @Column()
    location: string;
    
    @Column()
    attendee_count: number;
    
    @ManyToOne(() => AttendeeType)
    attendee_type: AttendeeType;
    
    @ManyToMany(() => Staff)
    @JoinTable()
    staff: Staff[];
    
    @Column()
    feedback: string;

}