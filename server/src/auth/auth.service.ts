import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    createUserDto.email = createUserDto.email.toLowerCase();
    return await this.userService.create(createUserDto);
  }

  async login(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { email: user.email, sub: user._id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
