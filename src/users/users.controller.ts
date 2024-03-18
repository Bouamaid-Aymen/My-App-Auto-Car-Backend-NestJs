import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
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
            @Body() credentials: LoginDTO
        ){
            return this.userService.login(credentials);
            
        }
        
    @Get()
        async getUser(
            @Body()Creds
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
            @Param('id', new ParseIntPipe(
                {
                    errorHttpStatusCode:HttpStatus.NOT_FOUND
         }
            )) id:number
            
        ){
            return await this.userService.deleteuser(id);
        }
    
}
