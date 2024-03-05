import { Body, Controller, Param, ParseIntPipe, Post, Get, Patch } from '@nestjs/common';
import { brandDto } from './dto/brand.dto';
import { VoitureService } from './voiture.service';
import { modeldDto } from './dto/model.dto';
import { modelEntity } from './entities/model.entity';
import { promises } from 'dns';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

@Controller('car')
export class VoitureController {
    constructor(
        private readonly serviceCar:VoitureService
    ){}
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
    async updatebrand(
        @Body()brand:modeldDto,
        @Param('id',ParseIntPipe)id
    ){
        return await this.serviceCar.updatebrand(brand,id);
    }

}
