import { Module } from '@nestjs/common';
import { GetrestaurantService } from './getrestaurant.service';
import { GetrestaurantController } from './getrestaurant.controller';

@Module({
  controllers: [GetrestaurantController],
  providers: [GetrestaurantService],
})
export class GetrestaurantModule {}
