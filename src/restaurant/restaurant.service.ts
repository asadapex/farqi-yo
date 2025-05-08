import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const newRestaurant = await this.prisma.restaurant.create({
        data: createRestaurantDto,
      });
      return newRestaurant;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async findAll() {
    try {
      const all = await this.prisma.restaurant.findMany();
      return all;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.restaurant.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Restaurant not found' });
      }
      return one;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const one = await this.prisma.restaurant.findUnique({ where: { id } });

      if (!one) {
        throw new NotFoundException({ message: 'Restaurant not found' });
      }

      const updated = await this.prisma.restaurant.update({
        where: { id },
        data: updateRestaurantDto,
      });

      return updated;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async remove(id: number) {
    try {
      const one = await this.prisma.restaurant.findUnique({ where: { id } });

      if (!one) {
        throw new NotFoundException({ message: 'Restaurant not found' });
      }

      const deleted = await this.prisma.restaurant.delete({ where: { id } });
      return deleted;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }
}
