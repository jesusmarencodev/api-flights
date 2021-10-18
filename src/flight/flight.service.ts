import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { FLIGHT } from '../common/models/models';

import { InjectModel } from '@nestjs/mongoose';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from '../common/interfaces/flight.interface';
import { ILocation } from '../common/interfaces/location.interface';
import { IWeather } from '../common/interfaces/weather.interface';
import axios from 'axios';
import * as moment from 'moment';

@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private readonly model:Model<IFlight>){}

    async getLocation(destinationCity: string):Promise<ILocation>{
        const { data } = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`)
        return data[0];
      
    }

    async getWeather(woeid: number, flightDate : Date):Promise<IWeather[]>{
        const dateFormat = moment.utc(flightDate).format();
        const year = dateFormat.substring(0, 4);
        const month = dateFormat.substring(5, 7);
        const day = dateFormat.substring(8, 10);

        const { data } = await axios.get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}/`)

        return data
    }

    async assign(
        { _id, pilot, airplane, destinationCity, flightDate, passengers }:IFlight,
        weather: IWeather[] 
    ): Promise<IFlight>{
            
        return Object.assign({
            _id,
            pilot,
            airplane,
            destinationCity,
            flightDate,
            passengers,
            weather 
        })
    }


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
        const flight =   await this.model.findById(id).populate('passengers')//populamos el array;

        console.log(flight)
        const location : ILocation = await this.getLocation(flight.destinationCity)
        console.log(location)
        const weather  : IWeather[] = await this.getWeather(location.woeid, flight.flightDate);
        console.log(weather)

        return this.assign(flight, weather);
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
