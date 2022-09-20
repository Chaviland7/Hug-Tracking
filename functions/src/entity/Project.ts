import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Grant } from "./Grant";

@Entity()
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    start_date: Date;
    
    @Column()
    end_date: Date;
    
    @ManyToOne(() => Grant)
    grant: Grant;
    
    @Column()
    notes: string;
    
}