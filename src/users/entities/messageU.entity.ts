
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    usernameU: string;  

    @Column()
    email: string;

    @Column()
    nom_service: string;
    @Column()
    emailU:string

   
}