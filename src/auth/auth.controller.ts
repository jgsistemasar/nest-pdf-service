import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint de autenticación
   *
   * Recibe:
   * - dto: Objeto LoginDto con username y password
   *
   * Pasos:
   * 1. Recibe las credenciales del usuario desde el body
   * 2. Llama al método authenticate del AuthService
   * 3. El servicio valida las credenciales y genera el JWT
   * 4. Retorna el token de acceso
   *
   * Devuelve: Objeto {access_token: string}
   * Lanza: UnauthorizedException si las credenciales son inválidas
   */
  @Post('login')
  @ApiOperation({ summary: 'Autenticación, devuelve JWT' })
  @ApiOkResponse({ schema: { example: { access_token: 'jwt...' } } })
  login(@Body() dto: LoginDto) {
    return this.authService.authenticate(dto.username, dto.password);
  }
}