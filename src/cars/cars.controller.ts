import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-cart.dto';

@Controller('cars')
// Para nivel de controlador
@UsePipes(ValidationPipe)
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
        return {
            ok: true,
            method: 'Post',
            createCarDto
        }
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
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
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return {
            ok: true,
            method: 'Delete',
            id,
        }
    }
}
