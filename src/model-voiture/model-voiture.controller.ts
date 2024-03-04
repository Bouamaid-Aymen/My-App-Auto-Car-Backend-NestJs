import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { Mvoiture } from './entites/voiture.entity';
import { ModelVoitureService } from './model-voiture.service';
import { upmvoitureDto } from './dto/upvoiture.dto';
import { MvoitureDto } from './dto/add_voiture.dto';
import { UserGuardGuard } from 'src/guards/user-guard/user-guard.guard';

@Controller('voiture')

export class ModelVoitureController {
    constructor(
        private readonly voitureService:ModelVoitureService
    ){}

    @UseGuards(UserGuardGuard)
    @Post('add')
        async addVoiture(
            @Body()CredsV:MvoitureDto,
            @Request() req
        ):Promise<Mvoiture>{
            const userId = req.id;
            return this.voitureService.addvoiture(CredsV, userId);
            
        }
    @Patch(':id')
       async updvoiture(
            @Body()Creds:upmvoitureDto,
            @Param('id',ParseIntPipe)id:number
        ){
            return await this.voitureService.updatevoiture(id,Creds)

        }
        
    @UseGuards(UserGuardGuard)
    @Get('mycars')
        getMyCars(
            @Request() req
        ){
            const userId = req.id;
            console.log("SUCCESSFUL REQUEST!");
            return this.voitureService.getmyCars(userId);
        }

        @Delete(':id')
    
            async deleteV(
                @Param('id',ParseIntPipe)id:number
            ){
                return this.voitureService.delete(id)
            }

}
