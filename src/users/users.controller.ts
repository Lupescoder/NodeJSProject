import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ReciveConfirmationEmailDto } from './dto/revice-confirmation-email.dto';
import { EmailDto } from 'src/email/dto/email.dto';
import { PinCodeDto } from 'src/email/dto/pinCode.dto';
import { EmailPassDto } from 'src/email/dto/emailPass.dto';
import { ChangePassDto } from 'src/email/dto/changePass.dto';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.usersService.verifyEmailExist(createUserDto.email);
    
    if(existingUser){
      throw new HttpException('Este E-mail já está em uso.',HttpStatus.CONFLICT);
    }

    return await this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers():  Promise<{users: User[]}> {
    return await this.usersService.findAllUsers();
  }

  @Post('reciveConfirmationEmail')
  async reciveConfirmationEmail(@Body() reciveConfirmationEmailDto: ReciveConfirmationEmailDto):  Promise<User> {
    return await this.usersService.reciveConfirmationEmail(reciveConfirmationEmailDto);
  }

  @Post('resendConfirmationEmail')
  async resendConfirmationEmail(@Body() email:EmailDto):  Promise<void> {
    await this.usersService.resendConfirmationEmail(email.email);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto'))
  async update(@UploadedFile() foto,@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      const base64Image = foto.buffer.toString('base64');
      updateUserDto.foto = base64Image;
    } catch (error) {
      
    }
    
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async asyncremove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(+id);
  }

  @Post('sendPassCode')
  async verifyEmailExist(@Body() emailDto:EmailDto): Promise<void>{
    const user = await this.usersService.verifyEmailExist(emailDto.email);
    if(!user){
      throw new HttpException('Este E-mail não existe em nosso sistema.',HttpStatus.NOT_FOUND);
    }

    await this.usersService.sendPasswordCode(user);

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('recoverPassword')
  async recoverPassword(@Body() emailPassDto: EmailPassDto): Promise<User>{
    return this.usersService.recoverPassword(emailPassDto.email, emailPassDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('changePassword')
  async changePassword(@Body() changePassDto: ChangePassDto, @Req() req): Promise<User>{
    const loggedUser = req.user;
    if(loggedUser.uid != changePassDto.id){
      throw new HttpException('Você não tem permissão para alterar a senha de outro Usuário.',HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.changePassword(changePassDto.id, changePassDto.oldPassword ,changePassDto.password);
  }


}
