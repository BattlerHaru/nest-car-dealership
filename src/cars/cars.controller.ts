import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
// @UsePipes(ValidationPipe) // lvl class
export class CarsController {
    constructor(
        private readonly carsService: CarsService
    ) { }


    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param("id", ParseUUIDPipe) id: string) {
        return this.carsService.findOneById(id)
    }

    @Post()
    // @UsePipes(ValidationPipe) // lvl fn
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }

    @Patch(":id")
    updateCar(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() body: any
    ) {
        return { message: body }
    }

    @Delete(":id")
    deleteCar(@Param("id", ParseUUIDPipe) id: string) {
        return { message: id }
    }
}
