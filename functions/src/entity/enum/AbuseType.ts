import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbuseType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

}

/*
* Sexual Abuse
* Physical Abuse
* Emotional Abuse
* Online Exploitation
*/