import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ example: '+998901234567' })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}