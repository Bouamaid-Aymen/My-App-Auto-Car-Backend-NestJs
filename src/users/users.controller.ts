import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards ,Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UpDateDTO } from './dto/update.dto';
import { RegisterDto } from './dto/register.dto';
import { messageDto } from './dto/message.dto';
import { message } from './entities/messageU.entity';
import { UpDateDTO2 } from './dto/upd2.dto';
import { UserGuardGuard } from 'src/guards/user-guard/user-guard.guard';

@Controller('users')
export class UsersController {
    constructor( 
        private readonly userService: UsersService
    ){

    }
    @Get('message')
    async getmessage(){
        return await this.userService.getmessage();
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
        @Post('update-password')
        async MDP(
            @Body() updateCreds: UpDateDTO ,
        ){
            return await this.userService.MDP(updateCreds);
        }
        @Post('update-Email')
        async updemail(
            @Body() updateCreds: UpDateDTO2 ,
        ){
            return await this.userService.Updemail(updateCreds);
        }
        
        @UseGuards(UserGuardGuard)
        @Post('messages')
        async EnvoyerMessage(
            @Body()CredsV:messageDto,
            @Request() req,
        ){
            const userId = req.id;
            return this.userService.EnvoyerMessage(CredsV, userId);
            
        }
        @UseGuards(UserGuardGuard)
        @Post('message')
        async ReponseMessage(
            @Body()CredsV:messageDto,
            @Request() req,
        ){
            const userId = req.id;
            return this.userService.ReponseMessage(CredsV, userId);
            
        }
}
