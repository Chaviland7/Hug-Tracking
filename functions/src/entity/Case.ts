import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";

import { Province } from './enum/Province';
import { CourtCase } from "./Court_Case";
import { Partner } from "./enum/Partner";
import { AbuseType } from "./enum/AbuseType";
import { Staff } from "./Staff";
import { Client } from "./Client";
import { Perpetrator } from "./Perpetrator";

@Entity()
export class Case extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Province)
    province: Province;
    
    @Column()
    rescue_date: Date; 
    
    @Column()
    months_of_abuse: number;
    
    @ManyToMany(() => AbuseType)
    @JoinTable()
    abuse_types: AbuseType[];
    
    @Column()
    tip_type: string;
    
    @Column()
    reported_by_client: boolean; // TODO reported by who exactly (family, friends, client, other)
    
    @ManyToMany(() => Staff)
    @JoinTable()
    staff: Staff[];
    
    @ManyToMany(() => Client)
    @JoinTable()
    clients: Client[];
    
    @ManyToMany(() => Perpetrator)
    @JoinTable()
    perpetrators: Perpetrator[];
    
    @ManyToMany(() => Partner)
    @JoinTable()
    partners: Partner[];
    
    @OneToMany(() => CourtCase, court_case => court_case.case)
    court_cases: CourtCase[]

}