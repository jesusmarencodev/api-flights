import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { FLIGHT } from '../common/models/models';

import { InjectModel } from '@nestjs/mongoose';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from '../common/interfaces/flight.interface';

@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private readonly model:Model<IFlight>){}


    async create(flightDTO:FlightDTO):Promise<IFlight>{
        const newFlight = new this.model(flightDTO)
        return await newFlight.save();
    }
    async addPassenger(flightId:string, passengerId:string):Promise<IFlight>{
        
        return await this.model.findByIdAndUpdate(
            flightId,//busca por el flightId
            {
                //$addToSet se usa para adicionar a una propiedad un dato
                //si ese dato existe no lo agrega, pero si no existe lo agrega
                //es decir vamos agregando a la propiedad passengers que es un arrray
                //cada uno de los ids de los pasageros
                $addToSet : {
                    passengers :passengerId
                }
            },
            {
                new : true //me retorna el documento actualizado
            }
        ).populate('passengers')//populamos el array

    }

    async findAll():Promise<IFlight[]>{
        return await this.model.find().populate('passengers')//populamos el array;
    }

    async findOne(id:string):Promise<IFlight>{
        return await this.model.findById(id).populate('passengers')//populamos el array;
    }
    async update(id:string, flightDTO:FlightDTO):Promise<IFlight>{

        const fligth = {
            ...flightDTO
        }
        return await this.model.findByIdAndUpdate(id, fligth, { new : true});
    }
    async delete(id:string){
         await this.model.findByIdAndDelete(id);
         return {status : HttpStatus.OK}
    }
}
