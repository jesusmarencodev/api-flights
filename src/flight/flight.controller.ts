import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller('api/v1/flight')
export class FlightController {
    constructor(private readonly flightService : FlightService){}

    @Post()
    create(@Body() flightDTO: FlightDTO){
        return this.flightService.create(flightDTO);
    }

    @Get()
    findAll(){
        return this.flightService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id :string){
        return this.flightService.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id :string, @Body() flightDTO : FlightDTO){
        return this.flightService.update(id, flightDTO);
    }

    @Delete(':id')
    delete(@Param('id') id :string){
        return this.flightService.delete(id);
    }
}