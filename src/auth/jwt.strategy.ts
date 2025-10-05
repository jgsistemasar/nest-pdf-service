import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor de la estrategia JWT
   *
   * Pasos:
   * 1. Configura la extracción del JWT desde el header Authorization Bearer
   * 2. Establece que no se ignoren los tokens expirados
   * 3. Define la clave secreta para verificar el token
   *
   * Devuelve: Instancia configurada de la estrategia JWT
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  /**
   * Valida y extrae datos del payload del JWT
   *
   * Recibe:
   * - payload: Payload decodificado del JWT
   *
   * Pasos:
   * 1. Extrae el username desde payload.sub
   * 2. Extrae los roles (o array vacío si no hay)
   * 3. Retorna objeto con los datos del usuario
   *
   * Devuelve: Objeto {username: string, roles: string[]}
   * Nota: Este objeto se adjunta a request.user en los endpoints protegidos
   */
  async validate(payload: any) {
    return { username: payload.sub, roles: payload.roles || [] };
  }
}