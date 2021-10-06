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

    async findAll():Promise<IFlight[]>{
        return await this.model.find();
    }

    async findOne(id:string):Promise<IFlight>{
        return await this.model.findById(id);
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
