import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository : Repository<User>) {}
  async findUser(email: string): Promise<User> {
    const user : User = await this.userRepository.findOne({
      where: {email: email}
    });
    return user;
  }
  async create(createUser: CreateUserDto) {
    const user = new User();
    user.name = createUser.name;
    user.email = createUser.email;
    user.password = createUser.password;
    return await this.userRepository.save(user);
  }
  async loginUser(loginCreds: LoginUserDto){
    const user = await this.findUser(loginCreds.email);
    if(!user){
      throw new UnprocessableEntityException();
    }
    if(await bcrypt.compare(loginCreds.password, user.password)) {
      return true;
    }
    else {
      throw new UnprocessableEntityException();
    }
  }
}