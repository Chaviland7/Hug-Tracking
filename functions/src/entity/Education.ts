import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne } from "typeorm";

import { Client } from "./Client";
import { InteractionMedium } from "./enum/InteractionMedium";
import { Staff } from "./Staff";

@Entity()
export class Education extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;
    
    @Column()
    minutes: number;
    
    @ManyToOne(() => InteractionMedium)
    medium: string; // TODO
    
    @Column()
    type: string; // TODO enum?
    
    @ManyToMany(() => Staff)
    @JoinTable()
    staff: Staff[];
    
    @ManyToMany(() => Client)
    @JoinTable()
    clients: Client[]; // TODO ever more than one?

}