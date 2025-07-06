import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { password, confirmPass, ...rest } = createUserDto;
    if (password !== confirmPass) {
      throw new BadRequestException('Passwords do not match');
    }
    const emailExists = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const { password: _, ...safeUser } = savedUser.toObject();
    return safeUser;
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
