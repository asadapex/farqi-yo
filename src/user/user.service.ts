import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const { password,restaurantId, ...rest } = createUserDto;
      let  restaurant = await this.prisma.restaurant.findFirst({where:{id: restaurantId}})
      if(!restaurant){
        throw new NotFoundException("Restaurant not found")
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
          restaurantId
        },
      });
      return newUser;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.user.findMany()
      return data
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.user.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("User not found")
      }
      return one
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let one = await this.prisma.user.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("User not found")
      }
      let updated = await this.prisma.user.update({ where: { id }, data: updateUserDto })
      return updated
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      let one = await this.prisma.user.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("User not found")
      }
      let deleted = await this.prisma.user.delete({ where: { id } })
      return one
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }
  async Login(data: LoginUserDto) {
    try {
      const { phone, password } = data;
      const user = await this.prisma.user.findUnique({ where: { phone } });

      if (!user) {
        throw new UnauthorizedException('Telefon raqami yoki parol notogri');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Telefon raqami yoki parol notogri');
      }
      let token = this.jwt.sign({ id: user.id, role: user.role })
      return { token }
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }
}
