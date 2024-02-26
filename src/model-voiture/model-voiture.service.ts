import { Injectable } from '@nestjs/common';
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
async updatevoiture(id,CredsV){
    const newV = await this.voitureRepo.preload({
        id,
        ...CredsV
})
    return this.voitureRepo.save(newV)
}
async getvoiture(Creds):Promise<Mvoiture[]>{
    
    
    return this.voitureRepo.find(Creds)
}
 async delete(id){
    return this.voitureRepo.delete(id)
 }
}
