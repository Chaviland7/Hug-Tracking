import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Training extends BaseEntity {

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
    
    @Column()
    cost: number;

}