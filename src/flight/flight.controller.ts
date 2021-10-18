import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { PassegerService } from '../passeger/passeger.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('Flight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
    constructor(
        private readonly flightService : FlightService,
        private readonly passegerService : PassegerService
    ){}

    @Post()
    create(@Body() flightDTO: FlightDTO){
        return this.flightService.create(flightDTO);
    }
    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId : string,
        @Param('passengerId') passengerId : string
    ){
        const passenger = await this.passegerService.findOne(passengerId);
        if(!passenger) throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);

        return this.flightService.addPassenger(flightId, passengerId);
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