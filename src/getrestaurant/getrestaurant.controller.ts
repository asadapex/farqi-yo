import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetrestaurantService } from './getrestaurant.service';


@Controller('getrestaurant')
export class GetrestaurantController {
  constructor(private readonly getrestaurantService: GetrestaurantService) {}

  @Get('Category:id')
  category(@Param('id') id: string) {
    return this.getrestaurantService.category(+id);
  }
  @Get('Product:id')
  product(@Param('id') id: string) {
    return this.getrestaurantService.getProduct(+id);
  }
}
