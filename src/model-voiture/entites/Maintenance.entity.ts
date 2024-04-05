import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mvoiture } from "./voiture.entity";

@Entity('maintenance')
export class MaintenanceEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    date:string;
    @Column()
    km:number;
    @Column()
    constatations:string;
    @Column()
    defectuosites:string;
    @Column()
    essaisFreinage:string;
    @Column()
    distancesArret:string;
    @Column()
    personneOperation:string;
    @Column()
    modifications:string;
    @Column()
    autre:string;
    @ManyToOne(
        type=>Mvoiture,
        (voiture)=>voiture.maintenance,
        {
            onDelete: "CASCADE"  
        })
        voiture:Mvoiture;

}