import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CourtAction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

}

/*
* Gathering Everyone
* Witness Interview
* Sentencing
*/