import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne } from "typeorm";

import { InteractionMedium } from "./enum/InteractionMedium";
import { CounselingType } from "./enum/CounselingType";
import { Staff } from "./Staff";
import { Client } from "./Client";

@Entity()
export class Counseling extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;
    
    @Column()
    minutes: number;
    
    @ManyToOne(() => InteractionMedium)
    medium: InteractionMedium;
    
    @ManyToOne(() => CounselingType)
    type: CounselingType;
    
    @ManyToMany(() => Staff)
    @JoinTable()
    staff: Staff[];
    
    @ManyToMany(() => Client)
    @JoinTable()
    clients: Client[];

}