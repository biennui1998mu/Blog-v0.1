import { userDto } from './../../dtos/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  create(
      @Body() userDto: userDto
  ){
      return this.userService.create(userDto);
  }

  @Post('/login')
  join(
      @Body() userDto: userDto
  ){
      return this.userService.join(userDto);
  }
}
