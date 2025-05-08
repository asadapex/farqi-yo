import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({
        example: 'Toshkent'
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 50,)
    name: string;
}
