import { Module } from '@nestjs/common';
import { VoitureController } from './voiture.controller';
import { VoitureService } from './voiture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { brandEntity } from './entities/brand.entity';
import { modelEntity } from './entities/model.entity';

@Module({
  imports:[TypeOrmModule.forFeature([brandEntity,modelEntity])],
  controllers: [VoitureController],
  providers: [VoitureService]
})
export class VoitureModule {}
