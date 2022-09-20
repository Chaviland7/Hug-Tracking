import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Partner extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    country: string; // TODO ugh wtf do we do for this one

}

/*
* TICAC
* ATPD
* CyberInvestigations Unit
* FBI
* HSI
* Consulate
* Police
* RAFA
* ZOE International
* Other
*/