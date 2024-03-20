import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { brandEntity } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { brandDto } from './dto/brand.dto';
import { modelEntity } from './entities/model.entity';
import { modeldDto } from './dto/model.dto';
import { Voyant } from './entities/voyant.entity';
import { voyantdto } from './dto/voyant.dto';
import { Uvoyantdto } from './dto/Uvoyant.dto';

@Injectable()

export class VoitureService {
    constructor(
        @InjectRepository(brandEntity)
        private readonly brandRep:Repository<brandEntity>,
        @InjectRepository(modelEntity)
        private  readonly modelRep:Repository<modelEntity>,
        @InjectRepository(Voyant)
        private readonly voyantRepo:Repository<Voyant>
        
    ){}
    async addBrand(Creds:brandDto):Promise<brandEntity>{
      const brand= await this.brandRep.create({
        ...Creds
      })
      return await this.brandRep.save(brand);
    
    }
    async addBrandTomodel(Nmodel:modelEntity,brandId){
        const brand=await this.brandRep.findOne({where:{model:brandId}});
        if(!brand){
          throw new Error("Brand not found");
        }
       
      const newModel = new modelEntity();
      newModel.name = Nmodel.name;
      newModel.brand = brandId;
        return await this.modelRep.save(newModel);
    }
    async getbrandmodel(brandId){
      try{
        let brand= await this.brandRep.findOne({
          where:{id:brandId}
        })
        if(brand){
          
          return brand
        }else{
          throw new HttpException(
              "Brand not found",
              HttpStatus.NOT_FOUND
          )
      }
      }catch{
        throw new HttpException(
          "Error fetching model",
          HttpStatus.BAD_REQUEST
      )
      } 
      }
      async modifybrand(brand:brandDto,id){
        const new_brand= await this.brandRep.preload({
          id,
          ...brand
        });
        return this.brandRep.save(new_brand)
      }

     
      
      async getbrand(){
        const brand = this.brandRep.find()   
      return brand
      
      
      }
      async deleteBrand(idB: number){
        const brand=await this.brandRep.findOne({
          where:{id:idB}
        });
       
        return await this.brandRep.remove(brand);
      }

      async getmodel(){
        const model= this.modelRep.find()   
      return model;
    
    }
     async addmodel(model:modeldDto,idB){
      const brand= await this.brandRep.findOne({
        where :{id:idB}
      });
      const new_model=await this.modelRep.create({
        ...model
      })
      return await this.modelRep.save(new_model);
     }

     async addVoy(voyant:voyantdto):Promise<Voyant>{
      const voy =await this.voyantRepo.create({
          ...voyant
      })
      return await this.voyantRepo.save(voy);
  
   }
   async getvoyant(){
    const Lvoy=await this.voyantRepo.find()
    return Lvoy
   }
   async editvoyant(id:number,newV:Uvoyantdto){
    const editV=await this.voyantRepo.preload({
      id,
      ...newV

    })
    return await this.voyantRepo.save(editV)
   }
   async deleteV(id:number){
    const v = await this.voyantRepo.findOne({
      where:{id:id}
    })
    if(v){
      return await this.voyantRepo.delete(v)
    }
   }
  }

    
    