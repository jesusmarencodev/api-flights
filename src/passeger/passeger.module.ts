import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassegerController } from './passeger.controller';
import { PassegerService } from './passeger.service';
import { PASSENGER } from '../common/models/models';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync(
    [ {
        name : PASSENGER.name,
        useFactory:()=>{
          return PassengerSchema
        }
      }
    ]),
  ],
  controllers: [PassegerController],
  providers: [PassegerService]
})
export class PassegerModule {}
