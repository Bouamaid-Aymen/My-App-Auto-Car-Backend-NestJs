import { Injectable, NotFoundException } from '@nestjs/common';
import { MvoitureDto } from './dto/Mvoiture.dto';
import { Mvoiture } from './entites/voiture.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelVoitureService {
    constructor(

        @InjectRepository(Mvoiture)
        private readonly voitureRepo: Repository<Mvoiture>
        
    ){

    }
    async addvoiture(creds:MvoitureDto):Promise<Mvoiture>{
        return await this.voitureRepo.save(creds)
}
async updatevoiture(id,CredsV):Promise<Mvoiture>{
    const New_V= await this.voitureRepo.preload({
        id,
        ...CredsV
    });
    if(!New_V){
        throw new NotFoundException(`Il n'est pas User avec cette ID : ${id} .`)
    }

    return this.voitureRepo.save(New_V)
}
async getvoiture(Creds):Promise<Mvoiture[]>{
    
    
    return this.voitureRepo.find(Creds)
}
 async delete(id){
    return this.voitureRepo.delete(id)
 }
}
