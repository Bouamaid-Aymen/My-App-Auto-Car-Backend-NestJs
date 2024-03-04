import { Module } from '@nestjs/common';
import { ModelVoitureController } from './model-voiture.controller';
import { ModelVoitureService } from './model-voiture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mvoiture } from './entites/voiture.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Mvoiture, User])],
    controllers: [ModelVoitureController],
  providers: [ModelVoitureService, JwtService]
})
export class ModelVoitureModule {}
