import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, req: Request) {
    try {
      const newOrder = await this.prisma.order.create({
        data: {
          user: { connect: { id: req['user-id'] } },
          restaurant: { connect: { id: req['restaurant-id'] } },
          status: 'PENDING',

          items: {
            create: createOrderDto.product.map((item) => ({
              product: { connect: { id: item.id } },
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return newOrder;
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

  async findAll(req: Request) {
    try {
      const all = await this.prisma.order.findMany({
        where: { restaurantId: req['restaurant-id'] },
        include: { items: true },
      });
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
      const one = await this.prisma.order.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Order not found' });
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

  async remove(id: number) {
    try {
      const one = await this.prisma.restaurant.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Order not found' });
      }
      const deleted = await this.prisma.order.delete({ where: { id } });
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
