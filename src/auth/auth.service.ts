import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    password: "password",
    username: "pelumiisola87@gmail.com"
  },
  {
    id: 2,
    password: "password",
    username: "pelumiisola0@gmail.com"
  }
]

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService){}
  validateUser({username, password}: CreateAuthDto) {
    const findUser = fakeUsers.find((user) => user.username === username);

    if(!findUser) throw new HttpException("Invalid credentials!", 400);
    if(password === findUser.password){
      const {password, ...user} = findUser;
      return this.jwtService.sign(user);
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
