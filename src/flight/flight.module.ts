import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FLIGHT } from '../common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassegerModule } from 'src/passeger/passeger.module';


@Module({
  imports:[
    MongooseModule.forFeatureAsync(
    [ {
        name : FLIGHT.name,
        useFactory:()=>FlightSchema.plugin(require('mongoose-autopopulate')),
      }
    ]),
    PassegerModule, //se importa para que funcione el populate

  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
