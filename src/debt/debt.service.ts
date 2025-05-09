import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class DebtService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDebtDto, req: Request) {
    try {
      const newDebt = await this.prisma.debt.create({
        data: { ...data, restaurantId: req['restaurant-id'] },
      });
      return newDebt;
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
      const all = await this.prisma.debt.findMany({
        where: { restaurantId: req['restaurant-id'] },
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
      const one = await this.prisma.debt.findFirst({
        where: { id, restaurantId: req['restaurant-id'] },
      });
      if (!one) {
        throw new NotFoundException({ message: 'Debt not found' });
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

  async update(id: number, updateDebtDto: UpdateDebtDto, req: Request) {
    try {
      const one = await this.prisma.debt.findFirst({
        where: { id, restaurantId: req['restaurant-id'] },
      });
      if (!one) {
        throw new NotFoundException({ message: 'Debt not found' });
      }

      const updated = await this.prisma.debt.update({
        where: { id },
        data: updateDebtDto,
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
      const one = await this.prisma.debt.findFirst({
        where: { id, restaurantId: req['restaurant-id'] },
      });
      if (!one) {
        throw new NotFoundException({ message: 'Debt not found' });
      }

      const deleted = await this.prisma.debt.delete({ where: { id } });
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
