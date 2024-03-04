import { Injectable } from '@nestjs/common';
import { brandEntity } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { brandDto } from './dto/brand.dto';
import { modelEntity } from './entities/model.entity';

@Injectable()

export class VoitureService {
    constructor(
        @InjectRepository(brandEntity)
        private readonly brandRep:Repository<brandEntity>,
        @InjectRepository(modelEntity)
        private  readonly modelRep:Repository<modelEntity>
        
    ){}
    async addBrand(Creds:brandDto):Promise<brandEntity>{
      const brand= await this.brandRep.create({
        ...Creds
      })
      return await this.brandRep.save(brand);
    
    }
    async addBrandmodel(Creds:modelEntity,brandId:number){
        const brand=await this.brandRep.findOne({where:{id:brandId}});
        const model= await this.modelRep.create({

            ...Creds
        })
        return await this.modelRep.save(model);
    }

    
}
