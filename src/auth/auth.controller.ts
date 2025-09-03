import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticación, devuelve JWT' })
  @ApiOkResponse({ schema: { example: { access_token: 'jwt...' } } })
  login(@Body() dto: LoginDto) {
    return this.authService.authenticate(dto.username, dto.password);
  }
}