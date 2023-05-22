import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
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
    getCarById(@Param('id', ParseIntPipe) id: number) {
        console.log({ id })
        return (
            this.carsService.findOneById(id)
        )
    }

    @Post()
    createCar(@Body() body: any) {
        return {
            ok: true,
            method: 'Post',
            body
        }
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any
    ) {
        return {
            ok: true,
            method: 'Patch',
            body,
            id
        }
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseIntPipe) id: number) {
        return {
            ok: true,
            method: 'Delete',
            id,
        }
    }
}
