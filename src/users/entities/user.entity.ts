import { RoleEnum } from "src/enums/role.enum";
import { TimeStampEntity } from "src/generics/timestamp.entity";
import { Mvoiture } from "src/model-voiture/entites/voiture.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique:true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;
    @Column()
    salt:string;

    @Column({
        default: RoleEnum.USER
    })
    role: RoleEnum
    
    @OneToMany(
        type => Mvoiture ,
        (voiture)=>voiture.user,
        {
            eager: true,
            onDelete: "CASCADE"
        }
    )
    voiture:Mvoiture;
   
}