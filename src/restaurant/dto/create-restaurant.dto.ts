import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, Matches } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ type: String, example: 'Restaurant 1' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Address' })
  @IsString()
  address: string;

  @ApiProperty({ type: String, example: '+998901234567' })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      'Telefon raqami +998 bilan boshlanishi va 9 ta raqamdan iborat bo‘lishi kerak',
  })
  phone: string;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  tip: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  regionId: number;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isActive: boolean;
}
