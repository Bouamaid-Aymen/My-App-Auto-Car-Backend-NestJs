import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/add-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ){}
    @Post('login')
    async login(
        @Body() loginCreds: LoginDTO
    ){
        return this.userService.login(loginCreds);
    }

    @Post('signup')
    async signup(
        @Body() signupCreds: SignUpDTO
    ){
        return this.userService.signup(signupCreds);
    }
}
