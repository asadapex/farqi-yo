import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class WithdrawService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWithdrawDto, req: Request) {
    try {
      const newWithdraw = await this.prisma.withdraw.create({
        data: {
          ...data,
          userId: req['user-id'],
          restaurantId: req['restaurant-id'],
        },
      });
      await this.prisma.order.update({
        where: { id: data.orderId },
        data: { status: OrderStatus.PAID },
      });
      return newWithdraw;
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
      const all = await this.prisma.withdraw.findMany({
        where: { restaurantId: req['restaurant-id'] },
        include: { order: true },
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

  async findOne(id: number, req: Request) {
    try {
      const one = await this.prisma.withdraw.findFirst({
        where: { id, restaurantId: req['restaurant-id'] },
      });
      if (!one) {
        throw new NotFoundException({ message: 'Withdraw not found' });
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

  async update(id: number, data: UpdateWithdrawDto, req: Request) {
    try {
      const one = await this.prisma.withdraw.findFirst({
        where: { id, restaurantId: req['restaurant-id'] },
      });

      if (!one) {
        throw new NotFoundException({ message: 'Withdraw not found' });
      }

      const updated = await this.prisma.withdraw.update({
        where: { id, restaurantId: req['restaurant-id'] },
        data,
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

  async remove(id: number, req: Request) {
    try {
      const one = await this.prisma.withdraw.findFirst({
        where: { id, restaurantId: req['restaurant-id'] },
      });

      if (!one) {
        throw new NotFoundException({ message: 'Withdraw not found' });
      }

      const deleted = await this.prisma.withdraw.delete({ where: { id } });
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
