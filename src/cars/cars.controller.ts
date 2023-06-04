import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
// Para nivel de controlador
// @UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) { }


    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    // new ParseUUIDPipe({ version: '4' })
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        console.log({ id })
        return (
            this.carsService.findOneById(id)
        )
    }

    @Post()
    // Para nivel de función
    // @UsePipes(ValidationPipe)
    createCar(@Body() createCarDto: CreateCarDTO) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDTO: UpdateCarDTO
    ) {
        return this.carsService.update(
            id,
            updateCarDTO
        );
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return {
            ok: true,
            method: 'Delete',
            id,
        }
    }
}
