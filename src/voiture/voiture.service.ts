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
import { serviceEntity } from './entities/service.entity';
import { serviceDto } from './dto/service.dto';
import { VerificationEnum } from 'src/enums/verification.enums';
import { serviceUPDto } from './dto/serviceUP.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()

export class VoitureService {
    constructor(
        @InjectRepository(brandEntity)
        private readonly brandRep:Repository<brandEntity>,
        @InjectRepository(modelEntity)
        private  readonly modelRep:Repository<modelEntity>,
        @InjectRepository(Voyant)
        private readonly voyantRepo:Repository<Voyant>,
        @InjectRepository(serviceEntity)
        private readonly serviceResp:Repository<serviceEntity>,
        @InjectRepository(User)
        private readonly userRepo:Repository<User>,
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

      async deletemodele(idB: number){
        const brand=await this.brandRep.findOne({
          where:{id:idB}
        });
        if(brand){
          await this.modelRep.remove(brand.model);

        }

        
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
   async addService(Creds:serviceDto):Promise<serviceEntity>{
    const services= await this.serviceResp.create({
      ...Creds
    });
    const userdb = new User();
    userdb.email = Creds.email;
    userdb.username = Creds.nomP;
    userdb.salt = await bcrypt.genSalt();
    userdb.password = await bcrypt.hash(Creds.password,userdb.salt);
    userdb.role = RoleEnum.SERVICE;

    await this.userRepo.save(userdb);
    return await this.serviceResp.save(services);
  }
  async deleteservice(idB: number){
    const services=await this.serviceResp.findOne({
      where:{id:idB}
    });
   
    return await this.serviceResp.remove(services);
  }
async getservice(){
  const service=await this.serviceResp.find(

  )
  return await service;
}
async upv(id:number){
  const service =await this.serviceResp.findOne({
    where:{id:id}
  })
  if(service){
    const ser=await this.serviceResp.preload({
      id,
      verifier:VerificationEnum.VERIFIER
    })
    return this.serviceResp.save(ser)
  }
  
}
async upN(id:number){
  const service =await this.serviceResp.findOne({
    where:{id:id}
  })
  if(service){
    const ser=await this.serviceResp.preload({
      id,
      verifier:VerificationEnum.NON_VERIFIER
    })
    return this.serviceResp.save(ser)
  }
   
  }
  async serviceUp(id:number,service:serviceUPDto){
    const serU=await this.serviceResp.preload({
      id,
      ...service

    })
    return await this.serviceResp.save(serU);
  }
  async verif(email: string) {
    const services = await this.serviceResp.findOne({
      where: { email: email }
    });

   
 

   
      
      if (services.verifier === "NON VÉRIFIÉ") {
        return { statusCode:400 , message: 'Utilisateur non vérifié' };
      }
    

    return { statusCode: 200, message: 'Tous les utilisateurs sont vérifiés' };
}




}

    
    