import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
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
    createCar(@Body() body: any) {
        return { message: body }
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