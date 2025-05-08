import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductOrderDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Mahsulot ID butun son bo‘lishi kerak' })
  id: number;

  @ApiProperty({ example: 2 })
  @IsInt({ message: 'Miqdori butun son bo‘lishi kerak' })
  @Min(1, { message: 'Miqdor kamida 1 bo‘lishi kerak' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: [ProductOrderDto],
    example: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 5 },
      { id: 3, quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  product: ProductOrderDto[];
}
