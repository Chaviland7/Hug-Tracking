import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InteractionMedium extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

}

/*
* Online
* Offline
*/