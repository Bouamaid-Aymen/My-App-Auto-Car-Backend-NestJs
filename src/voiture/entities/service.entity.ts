import { VerificationEnum } from "src/enums/verification.enums";
import { message } from "src/users/entities/messageU.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    @Column({
        
    })
    gouvernorat :string;

    @Column({
        
    })
    ville :string;
    @Column({
       
    })
    description :string;

    @Column({
      
    })
    localisation :string;

    @Column({
        default : VerificationEnum.NON_VERIFIER
    }
    
    )
    verifier:VerificationEnum
    @OneToMany(
        type =>message,
        (message)=>message.service,
        {
            eager: true,
            onDelete:"CASCADE"
        })
        discussions: message[];
}
