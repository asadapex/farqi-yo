import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    try {
      let newProduct = await this.prisma.product.create({ data: createProductDto })
      return newProduct
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
      let data = await this.prisma.product.findMany()
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
      let one = await this.prisma.product.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Product not found")
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      let one = await this.prisma.product.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Product not found")
      }
      let updated = await this.prisma.product.update({ where: { id }, data: updateProductDto })
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
      let one = await this.prisma.product.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Product not found")
      }
      let deleted = await this.prisma.product.delete({ where: { id } })
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
