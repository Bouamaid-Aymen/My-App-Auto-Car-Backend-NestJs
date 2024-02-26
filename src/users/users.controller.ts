import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UpDateDTO } from './dto/update.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
    constructor( 
        private readonly userService: UsersService
    ){

    }

    @Post('register')
        async register(
            @Body()userData:RegisterDto
        ):Promise<User>{
            return this.userService.register(userData)
        }

    @Post('login')
        async login(
            @Body() loginCreds: LoginDTO
        ){
            return this.userService.login(loginCreds);
            
        }
        
    @Post('Admin/get-users')
        async getUser(
            @Body()Creds:LoginDTO
        ):Promise<User[]>{
            return this.userService.getUser(Creds)  
        }

    @Patch(':id')
        async update(
            @Body()Creds:UpDateDTO,
            @Param('id',ParseIntPipe)id:number
        ){
            return this.userService.update(id,Creds)
        }
        
    @Delete(':id')
        async delete(
            @Param('id',ParseIntPipe)id:number
        ){
            return this.userService.delete(id)
        }
    
}
