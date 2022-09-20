import { PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm";

import { Country } from "./enum/country";
import { Genders } from "./enum/enums";

export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;
    
    @Column()
    last_name: string;

    @Column("enum", { enum: Genders })
    gender: string;
    
    @Column()
    date_of_birth: Date;

    @ManyToMany(() => Country)
    @JoinTable()
    nationalities: Country[];
}