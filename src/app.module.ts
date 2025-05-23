import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { DebtModule } from './debt/debt.module';

@Module({
  imports: [PrismaModule, UserModule, RegionModule,RestaurantModule,OrderModule, CategoryModule, WithdrawModule, DebtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
