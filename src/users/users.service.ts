import { Body, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BSON, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { use } from 'passport';
import { UpDateDTO } from './dto/update.dto';
import { serviceDto } from 'src/voiture/dto/service.dto';
import { serviceEntity } from 'src/voiture/entities/service.entity';
import { messageDto } from './dto/message.dto';
import { UpDateDTO2 } from './dto/upd2.dto';
import { message } from './entities/messageU.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(serviceEntity)
        private readonly serviceResp:Repository<serviceEntity>,
        private readonly jwtService:JwtService,
        @InjectRepository(message)
        private readonly messageRep: Repository<message>,
        

    ){}

    // REGISTER 
            async register(userData:RegisterDto):Promise<User>{
                const user= await this.userRepo.create({
                    ...userData
                });
                user.salt=await bcrypt.genSalt();
                user.password=await bcrypt.hash(user.password,user.salt);
                try{
                    await this.userRepo.save(user)

                }catch(e){
                    throw new ConflictException('Le username est le password doivient unique ')
                }    
                delete user.salt;
                delete user.password;
                return user 

            }
    // login
             async login(credentials:LoginDTO){ 
                const { username , password } = credentials ;
                const user = await this.userRepo.createQueryBuilder("User")
                   .where("user.username =:username or user.email =:username",
                   {username})
                   .getOne();
                   
                 
                  if( !user){
                    throw new NotFoundException('username ou password erronée ')
                  }
                  const hashedPassword = await bcrypt.hash( password,user.salt);
                  if(hashedPassword === user.password ){
                    const userService = await this.serviceResp.findOne({
                        where:{email:user.email}
                    });
                  
                    if (userService && userService.verifier == "NON"){
                        throw new HttpException(
                            'service non verifié',
                            HttpStatus.BAD_REQUEST  
                        )
                    }
                    const pyload={
                        id: user.id,
                        username:user.username,
                        email:user.email,
                        role:user.role

                    };
                    const jwt = await this.jwtService.sign(pyload)
                    return{
                        "acces token" :jwt ,
                        "role": user.role,
                        "email":user.email
                        
                    }
                  }
                  else{
                    
                    throw new NotFoundException('username ou password erronée ')
                  }
                   }
    
    // Get Users 
             async getUser(Creds):Promise<User[]>{
                return this.userRepo.find(Creds)
             }

    // update
            async update(id,CredsUp):Promise<User>{
                
                const New_user= await this.userRepo.preload({
                    id,
                    ...CredsUp
                });
                if(!New_user){
                    throw new NotFoundException(`Il n'est pas User avec cette ID : ${id} .`)
                }
            
                return this.userRepo.save(New_user)
                
            }


            async deleteuser(id: number){
                const brand=await this.userRepo.findOne({
                  where:{id:id}
                });
               
                return await this.userRepo.remove(brand);
              }

            async MDP(updateCreds:UpDateDTO){
                const user = await this.userRepo.findOne({
                    where:{email:updateCreds.email}
                })
                  if( !user){
                    throw new NotFoundException('username ou password erronée ')
                  }

                  const hashedPassword = await bcrypt.hash( updateCreds.oldPassword, user.salt);

                  if(hashedPassword === user.password ){
                    let newPass = await bcrypt.hash( updateCreds.newPassword, user.salt);
                    user.password = newPass;
                    return this.userRepo.save(user);
                }else{
                    throw new HttpException(
                        "Worng Creds",
                        HttpStatus.BAD_REQUEST, 

                    )
                }
        }
        async Updemail(updateCreds:UpDateDTO2){
            const user = await this.userRepo.findOne({
                where:{email:updateCreds.email}
            })
            console.log(user);
              if( !user){
                throw new NotFoundException('username ou password erronée ')
              }

              const hashedPassword = await bcrypt.hash( updateCreds.oldPassword, user.salt);

              if(hashedPassword === user.password ){
                
                user.email= updateCreds.newemail;
                user.username=updateCreds.newusername;
                console.log(user.email);
                console.log(user.username);
                return this.userRepo.save(user);
                
            }else{
                throw new HttpException(
                    "Worng Creds",
                    HttpStatus.BAD_REQUEST, 

                )
            }
    }
    async EnvoyerMessage(Creds: messageDto, userId: number): Promise<message> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
    console.log()
        let msg = await this.messageRep.findOne({ where: { user: user } });
        console.log(msg)
    
        if (msg) {
            msg.message = `${msg.message}\n${Creds.message}`;
        } else {
            msg = new message();
            msg.message = Creds.message;
        }
    
        msg.email = Creds.email;
        msg.emailU = Creds.emailU;
        msg.nom_service = Creds.nom_service;
        msg.user = user;
        msg.idUser = Creds.idUser;
    
        return await this.messageRep.save(msg);
    }
    
    
    
        

        async getmessage(){
            const listeM=await this.messageRep.find()
            return await listeM
        }



        
}
