import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CarInterface } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto/';

@Injectable()
export class CarsService {
    private cars: CarInterface[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id)

        if (!car) throw new NotFoundException(`Car with id ${id} not found`);


        return car
    }

    create(createCarDTO: CreateCarDTO) {
        const { brand, model } = createCarDTO;

        const newCar: CarInterface = {
            id: uuid(),
            brand,
            model
        };

        this.cars.push(newCar);

        return newCar;
    }

    update(id: string, updateCarDTO: UpdateCarDTO) {
        if (updateCarDTO.id && updateCarDTO.id !== id) {
            throw new BadRequestException(`Car id is not valid inside body`)
        }

        let carDB = this.findOneById(id);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDTO,
                    id
                }
                return carDB
            }
            return car;
        });
        return carDB;
    }
}
