import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawDto {
  @ApiProperty({ type: Number, example: 1 })
  orderId: number;

  @ApiProperty({ type: Number, example: 123 })
  amount: number;
}