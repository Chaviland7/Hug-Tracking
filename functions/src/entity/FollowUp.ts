import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm";

import { Client } from "./Client";

@Entity()
export class FollowUp extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToMany(() => Client)
    @JoinTable()
    clients: Client[]; // TODO - should this be linked to cases instead of clients?
    
    @Column()
    date: Date;
    
    @Column()
    minutes: number;
    
    @Column()
    purpose: string; // TODO - enum?
    
    @Column()
    notes: string;

}