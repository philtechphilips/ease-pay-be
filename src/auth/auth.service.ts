import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/base';

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
  constructor(private jwtService: JwtService, @InjectRepository(User) private readonly userRepository: Repository<User>,) { }

  validateUser({ username, password }: CreateAuthDto) {
    const findUser = fakeUsers.find((user) => user.username === username);

    if (!findUser) throw new HttpException("Invalid credentials!", 400);
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }

  async create(registerDto: RegisterAuthDto) {
    try {
      const user = await this.userRepository.create(registerDto);
      const existingEmail = await this.userRepository.findOne({ where: { email: registerDto.email } });
      const existingUsername = await this.userRepository.findOne({ where: { username: registerDto.username } });

      if (existingEmail) {
        throw new BadRequestException('Account with this email exist!');
      } else if (existingUsername) {
        throw new BadRequestException('Username taken by another user!');
      }
      const password = await hashPassword(user.password)
      user.password = password;
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error)
      throw error;
    }
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
