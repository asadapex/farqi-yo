import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Cheeseburger' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 25000 })
    @IsInt()
    @IsPositive()
    price: number;

    @ApiProperty({ example: 2 })
    @IsInt()
    @Min(1)
    categoryId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    restaurantId: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    isActive: boolean;
}
