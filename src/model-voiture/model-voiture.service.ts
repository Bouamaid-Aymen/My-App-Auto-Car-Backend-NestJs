import { HttpException, HttpStatus, Injectable, NotFoundException, Post } from '@nestjs/common';
import { Mvoiture } from './entites/voiture.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MvoitureDto } from './dto/add_voiture.dto';
import { User } from 'src/users/entities/user.entity';
import { MaintenanceEntity } from './entites/Maintenance.entity';
import { maintenaceDto } from './dto/maintenance.dto';
import { Voyant } from '../voiture/entities/voyant.entity';
import { voyantdto } from '../voiture/dto/voyant.dto';

@Injectable()
export class ModelVoitureService {
    constructor(

        @InjectRepository(Mvoiture)
        private readonly voitureRepo: Repository<Mvoiture>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(MaintenanceEntity)
        private readonly mainRepo: Repository<MaintenanceEntity>,
        
    ){

    }
    async getmyCars(userId: number){
        try{
            let user = await this.userRepo.findOne({where: {id: userId}});
            if (user){
                return user.voiture;
            }else{
                throw new HttpException(
                    "User not found",
                    HttpStatus.NOT_FOUND
                )
            }
        }catch{
            throw new HttpException(
                "Error fetching cars",
                HttpStatus.BAD_REQUEST
            )
        }
    }


    async addvoiture(creds:MvoitureDto, userId: number):Promise<Mvoiture>{
        let voiture = new Mvoiture();
        let user = await this.userRepo.findOne({where: {id: userId}});
        voiture.age = creds.age;
        voiture.brand = creds.brand;
        voiture.km = creds.km;
        voiture.lastOilChangeDate = creds.lastOilChangeDate;
        voiture.model = creds.model;
        voiture.user = user;
        return await this.voitureRepo.save(voiture)
}

async updatevoiture(Id,CredsV){
    const New_V= await this.voitureRepo.preload({
        Id,
        ...CredsV
    });
    if(!New_V){
        throw new NotFoundException(`Il n'est pas User avec cette ID : ${Id} .`)
    }
    return this.voitureRepo.save(New_V)
}
async getvoiture(Creds):Promise<Mvoiture[]>{
    return this.voitureRepo.find(Creds)
}

 async delete(id){
    return this.voitureRepo.delete(id)
 }
 
 async maitenance(id,cahier:maintenaceDto){
    const voiture=await this.voitureRepo.findOne({
        where:{Id:id}
    })
    if(voiture){
        const maintenace=await this.mainRepo.create({
            voiture,
            ...cahier
        });
        return await this.mainRepo.save(maintenace);
    }

 }
 async fetchmaintenance(){
    const main= await this.mainRepo.find()
    return main
 }

 


}
