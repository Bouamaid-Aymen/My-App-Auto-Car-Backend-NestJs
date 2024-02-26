import { Module } from '@nestjs/common';
import { ModelVoitureController } from './model-voiture.controller';
import { ModelVoitureService } from './model-voiture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mvoiture } from './entites/voiture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mvoiture])],
    controllers: [ModelVoitureController],
  providers: [ModelVoitureService]
})
export class ModelVoitureModule {}
