import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetrestaurantService {
  constructor(private readonly prisma: PrismaService) { }
  async category(id: number) {
    try {
      let data = await this.prisma.category.findMany({ where: { restaurantId: id } })
      return data
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
  async getProduct(id: number) {
    try {
      let data = await this.prisma.product.findMany({where:{restaurantId:id}})
      return data
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
