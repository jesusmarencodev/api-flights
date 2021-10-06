import { Controller, Body, Post, Delete, Get, Param, Put } from '@nestjs/common';
import { PassegerService } from './passeger.service';
import { PassengerDTO } from './dto/passenger.dto';


@Controller('api/v1/passenger')
export class PassegerController {
    constructor(private readonly passegerService : PassegerService){}

    @Post()
    create(@Body() passengerDTO: PassengerDTO){
        return this.passegerService.create(passengerDTO);
    }

    @Get()
    findAll(){
        return this.passegerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id :string){
        return this.passegerService.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id :string, @Body() passengerDTO : PassengerDTO){
        return this.passegerService.update(id, passengerDTO);
    }

    @Delete(':id')
    delete(@Param('id') id :string){
        return this.passegerService.delete(id);
    }
}
