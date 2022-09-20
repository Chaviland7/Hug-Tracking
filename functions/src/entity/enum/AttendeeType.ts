import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttendeeType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

}

/*
* Students
* Teachers
* Police
* Other
*/