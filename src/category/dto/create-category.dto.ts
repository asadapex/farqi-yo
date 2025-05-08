import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Fast Food',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 1,
    })
    @IsInt()
    @Min(1)
    restaurantId: number;

    @ApiProperty({
        example: true,
    })
    @IsBoolean()
    isActive: boolean;
}