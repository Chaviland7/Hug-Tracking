import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Country extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
    
    @Column()
    name: string;

}