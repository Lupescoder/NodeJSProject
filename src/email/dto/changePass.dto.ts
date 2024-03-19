import { ApiProperty } from "@nestjs/swagger"

export class ChangePassDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    oldPassword: string

    @ApiProperty()
    password: string

}
