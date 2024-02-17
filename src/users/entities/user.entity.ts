import { RoleEnum } from "src/enums/role.enum";
import { TimeStampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        default: RoleEnum.USER
    })
    role: RoleEnum
}