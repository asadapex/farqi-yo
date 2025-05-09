import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return `This action updates a #${id} debt`;
  }

  remove(id: number) {
    return `This action removes a #${id} debt`;
  }
}
