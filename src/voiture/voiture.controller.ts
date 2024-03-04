import { Body, Controller, Post, Request } from '@nestjs/common';
import { brandDto } from './dto/brand.dto';
import { VoitureService } from './voiture.service';
import { modeldDto } from './dto/model.dto';
import { modelEntity } from './entities/model.entity';
import { promises } from 'dns';

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

    

}
