import { Column, Entity } from "typeorm";

import { Person } from "./Person";

@Entity()
export class Staff extends Person {
    @Column()
    email: string;
}