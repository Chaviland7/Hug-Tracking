import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Case } from "./Case";
import { CourtType } from "./enum/CourtType";
import { CourtAction } from "./enum/CourtAction";

@Entity()
export class CourtCase extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Case) // TODO is there always a case?
    case: Case;
    
    @Column()
    date: Date;
    
    @Column()
    court_name: string;
    
    @ManyToOne(() => CourtType)
    court_type: CourtType;
    
    @ManyToOne(() => CourtAction)
    actions_taken: CourtAction; //TODO can there be multiple? Join table?
    
    @Column()
    result: string; //TODO ?
    
    @Column()
    notes: string;
    
    // TODO
    // province? Or is that always the same as the case province?

}