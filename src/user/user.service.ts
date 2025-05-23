import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    try {
      let newUser = await this.prisma.user.create({ data: createUserDto })
      return newUser
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
}
