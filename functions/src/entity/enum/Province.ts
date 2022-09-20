import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Province extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    hs: string;

}