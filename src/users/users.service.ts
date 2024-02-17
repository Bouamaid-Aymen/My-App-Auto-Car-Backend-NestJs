import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/add-user.dto';
import { LoginDTO } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ){}

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

    async signup(signUpCreds: SignUpDTO){
        try{
            let user_db = new User();
            user_db.email = signUpCreds.email;
            user_db.password = signUpCreds.password;
            user_db.username = signUpCreds.username;
            await this.userRepo.save(user_db);
            return 'User added successfully !';
        }catch{
            throw new HttpException(
                'Error Adding User to database',
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
