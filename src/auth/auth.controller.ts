import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async create(@Body() registerDto: RegisterAuthDto) {
    try {
      const user = await this.authService.create(registerDto);
      return { success: true, data: user, message: 'Account created successfully!' };
    } catch (error) {
      if(error.status === 400){
        throw new HttpException({ success: false, message: error.message }, HttpStatus.BAD_REQUEST);
       }else{
        throw new HttpException({ success: false, message: 'Something went wrong!' }, HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
  }

  @Get('status')
  @UseGuards(JwtAuthGuard) 
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }

  @Get("user")
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
