import { ApiProperty } from "@nestjs/swagger"

export class EmailPassDto {

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

}
