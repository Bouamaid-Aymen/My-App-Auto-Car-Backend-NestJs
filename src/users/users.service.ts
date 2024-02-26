import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
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

    // LOGIN 
            async login(loginCreds: LoginDTO){
                try {
                    let user_db = await this.userRepo.findOne({
                        where: {email: loginCreds.email}
                    });

                    if (user_db){
                        if (user_db.password == loginCreds.password){
                            return user_db;                    
                        }
                    }
                    return 'Wrong Creds !';
                }catch{
                    throw new HttpException(
                        'Error Adding User to database',
                        HttpStatus.BAD_REQUEST
                    ) 
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


    // delete
            async delete(
                id:number
            ){
            return this.userRepo.delete(id)

            }




}
