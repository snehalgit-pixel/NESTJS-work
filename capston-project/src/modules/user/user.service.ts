import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async createUser(userData: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;
    user.role = userData.role;

    const result = await this.repository.save(user);
    return result;
  }

  public async getUserByEmail(userMail: GetUserDto): Promise<Users> {
    return this.repository.findOne({ where: { email: userMail.email } });
  }
}
