import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async createUser(@Body() createUserRequest: CreateUserDto): Promise<Users> {
    return await this.userService.createUser(createUserRequest);
  }

  @Get(':email')
  async getUser(@Param('email') getUserRequest: string): Promise<Users> {
    return await this.userService.getUserByEmail({ email: getUserRequest });
  }
}
