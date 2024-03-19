import { ApiProperty } from "@nestjs/swagger"

export class PinCodeDto {

    @ApiProperty()
    email: string

    @ApiProperty()
    token_password: string

}
