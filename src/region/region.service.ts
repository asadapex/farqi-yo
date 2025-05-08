import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createRegionDto: CreateRegionDto) {
    try {
      let newRegion = await this.prisma.region.create({ data: createRegionDto })
      return newRegion
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
      let data = await this.prisma.region.findMany()
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
      let one = await this.prisma.region.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Region not found")
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

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      let one = await this.prisma.region.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Region not found")
      }
      let updated = await this.prisma.region.update({ where: { id }, data: updateRegionDto })
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
      let one = await this.prisma.region.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Region not found")
      }
      let deleted = await this.prisma.region.delete({ where: { id } })
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
