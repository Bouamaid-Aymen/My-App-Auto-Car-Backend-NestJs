import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MvoitureDto } from './dto/Mvoiture.dto';
import { Mvoiture } from './entites/voiture.entity';
import { ModelVoitureService } from './model-voiture.service';
import { upmvoitureDto } from './dto/upvoiture.dto';
import { JwtAuthGuard } from 'src/users/Guards/jwt.auth.guard';



@Controller('voiture')
export class ModelVoitureController {
    constructor(
        private readonly voitureService:ModelVoitureService
    ){}
    @Post('add')

        async addVoiture(
            @Body()CredsV:MvoitureDto
        ):Promise<Mvoiture>{

            return this.voitureService.addvoiture(CredsV)
            
        }

    @Patch(':id')
       async updvoiture(
            @Body()Creds:upmvoitureDto,
            @Param('id',ParseIntPipe)id:number
        ){
            return await this.voitureService.updatevoiture(id,Creds)

        }
    @Get()
    @UseGuards(JwtAuthGuard)
        getvoiture(
            @Body()Creds:Mvoiture
        ){
            return this.voitureService.getvoiture(Creds)

        }

        @Delete(':id')
            async deleteV(
                @Param('id',ParseIntPipe)id:number
            ){
                return this.voitureService.delete(id)
            }

}
