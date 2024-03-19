import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/singin.dto';
import { PinCodeDto } from 'src/email/dto/pinCode.dto';
import { SignInProvider } from './dto/singin.provider.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto): Promise<Object>{
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    
    @Post('reciveConfirmationPassCode')
    reciveConfirmationPassCode(@Body() pinCodeDto:PinCodeDto ): Promise<{access_token: string}> {
        return this.authService.reciveConfirmationPassCode(pinCodeDto.email,pinCodeDto.token_password);
    }

    @Post('loginProvider')
    signInProvider(@Body() signInProvider:SignInProvider ): Promise<Object> {
        return this.authService.signInProvider(signInProvider);
    }


}
