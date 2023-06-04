import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CarInterface } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';

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
}
