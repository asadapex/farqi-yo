import { IsString, IsNotEmpty, IsPhoneNumber, MinLength, IsEnum, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum UserRole {
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
    WAITER = 'WAITER',
    CASHIER = "CASHIER"
}

export class CreateUserDto {
    @ApiProperty({ example: 'Ali Valiyev'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '+998901234567'})
    @IsPhoneNumber('UZ')
    phone: string

    @ApiProperty({ example: 'mysecret123'})
    @IsString()
    @MinLength(6)
    password: string

    @ApiProperty({ example: 'admin', enum: UserRole })
    @IsEnum(UserRole, { message: 'role must be one of: ADMIN OWNER WAITER CASHIER' })
    role: UserRole

    @ApiProperty({ example: 1})
    @IsNumber()
    restaurantId: number
}
