import { IsString, IsNotEmpty, IsPhoneNumber, MinLength, IsEnum, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum UserRole {
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
    WAITER = 'WAITER',
    CASHIER = "CASHIER"
}

export class CreateUserDto {
    @ApiProperty({ example: 'Ali Valiyev', description: 'Full name of the user' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '+998901234567', description: 'Phone number in Uzbekistan format' })
    @IsPhoneNumber('UZ')
    phone: string

    @ApiProperty({ example: 'mysecret123', description: 'Password (minimum 6 characters)' })
    @IsString()
    @MinLength(6)
    password: string

    @ApiProperty({ example: 'admin', enum: UserRole, description: 'Role of the user (admin, manager, waiter)' })
    @IsEnum(UserRole, { message: 'role must be one of: ADMIN OWNER WAITER CASHIER' })
    role: UserRole

    @ApiProperty({ example: 1, description: 'ID of the restaurant the user is associated with' })
    @IsNumber()
    restaurantId: number
}
