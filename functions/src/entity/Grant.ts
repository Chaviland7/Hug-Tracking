import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Partner } from "./enum/Partner";

@Entity()
export class Grant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    start_date: Date;
    
    @Column()
    end_date: Date;
    
    @ManyToOne(() => Partner)
    granting_organization: Partner;
    
    @Column()
    notes: string;
    
}