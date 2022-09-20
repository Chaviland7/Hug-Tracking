import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

    /*
    Add a foreign key here referencing partners - but only if that's a common tip source
    */

}

/*
* Facebook
* Twitter
* Email
* LINE
* Phone Call
* Ourselves
* In Person
* Partners (which partner)
*/