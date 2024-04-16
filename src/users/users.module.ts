import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { serviceEntity } from 'src/voiture/entities/service.entity';
import { message } from './entities/messageU.entity';

dotenv.config();
@Module({
  imports: [TypeOrmModule.forFeature([User,serviceEntity,message]),
PassportModule.register({
  defaultStrategy :'jwt'
}),JwtModule.register({ 
  secret :process.env.SECRET,signOptions:{
    expiresIn:3600
  }
}),ConfigModule
],
  
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
})
export class UsersModule {}
