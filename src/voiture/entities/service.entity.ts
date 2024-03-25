import { VerificationEnum } from "src/enums/verification.enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('service')
export class serviceEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    email : string; 
    @Column()
    nomS : string; 
    @Column()
    nomP:string;
    @Column()
    tel :number;
    @Column()
    adress :string;
    @Column({
        default : VerificationEnum.NON_VERIFIER
    }
    
    )
    verifier:VerificationEnum


}