import { Module } from '@nestjs/common';
import { VoitureController } from './voiture.controller';
import { VoitureService } from './voiture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { brandEntity } from './entities/brand.entity';
import { modelEntity } from './entities/model.entity';
import { Voyant } from './entities/voyant.entity';
import { serviceEntity } from './entities/service.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([brandEntity,modelEntity,Voyant,serviceEntity,User])],
  controllers: [VoitureController],
  providers: [VoitureService]
})
export class VoitureModule {}
