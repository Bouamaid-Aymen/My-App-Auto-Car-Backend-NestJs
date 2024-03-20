import { Body, Controller, Param, ParseIntPipe, Post, Get, Patch, Delete } from '@nestjs/common';
import { brandDto } from './dto/brand.dto';
import { VoitureService } from './voiture.service';
import { modeldDto } from './dto/model.dto';
import { modelEntity } from './entities/model.entity';
import { promises } from 'dns';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import { voyantdto } from './dto/voyant.dto';
import { Uvoyantdto } from './dto/Uvoyant.dto';

@Controller('car')
export class VoitureController {
    constructor(
        private readonly serviceCar:VoitureService
    ){}
    @Get('voyant')
    async getvoy(){
        return this.serviceCar.getvoyant()
    }

    @Get('model')
    async getmodel(){
        return await this.serviceCar.getmodel()  
     }

    @Get('brand')
    async brand(){
        return await this.serviceCar.getbrand()
    }
    @Post('brand')
    async addBrandCar(
        @Body()brand:brandDto
    ){
        return await this.serviceCar.addBrand(brand);
    }
    @Post(':brand/model')
    async addModelToBrand(
        @Body() model: modelEntity,
        @Param('brand',ParseIntPipe) brandId: number
    ): Promise<modelEntity> {
        return await this.serviceCar.addBrandTomodel(model, brandId);
    }
    @Get(':id')
    async getbrandmodel(
        @Param('id',ParseIntPipe)id:number
    ){
    return this.serviceCar.getbrandmodel(id)
    }
    @Patch(':id')
    async modifybrand(
        @Body()brand:modeldDto,
        @Param('id',ParseIntPipe)id
    ){
        return await this.serviceCar.modifybrand(brand,id);
    }
    @Delete(':id')
    async deleteBrand(
        @Param('id',ParseIntPipe)idB
    ){
return await this.serviceCar.deleteBrand(idB);
    }

    @Post('voyant')
    async addvoy(
        @Body()voyant:voyantdto
    ){
        return this.serviceCar.addVoy(voyant)
    }
    @Patch(':id/voyant')
    async upVoy(
        @Param('id',ParseIntPipe)id:number,
        @Body()upVoy:Uvoyantdto
    ){
        return await this.serviceCar.editvoyant(id,upVoy)

    }
    @Delete(':id/voyant')
    async deleteV(
        @Param('id',ParseIntPipe)id:number

    ){
        return this.serviceCar.deleteV(id);
    }
}
