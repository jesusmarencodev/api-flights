import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post()
    create(@Body() userDTO: UserDTO){
        return this.userService.create(userDTO);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id :string){
        return this.userService.findOne(id);
    }
}
