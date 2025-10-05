import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Carga los usuarios desde el archivo users.json
   *
   * Pasos:
   * 1. Construye la ruta absoluta al archivo users.json
   * 2. Verifica que el archivo exista
   * 3. Lee el contenido del archivo
   * 4. Parsea el JSON y extrae el array de usuarios
   *
   * Devuelve: Array de usuarios
   * Lanza: Error si el archivo no existe
   */
  private loadUsers() {
    const filePath = path.resolve(process.cwd(), 'users.json');
    if (!fs.existsSync(filePath)) {
      throw new Error('users.json no encontrado. Verificá el path.');
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw).users || [];
  }

  /**
   * Valida las credenciales de un usuario
   *
   * Recibe:
   * - username: Nombre de usuario
   * - password: Contraseña en texto plano
   *
   * Pasos:
   * 1. Carga la lista de usuarios desde users.json
   * 2. Busca el usuario por nombre de usuario
   * 3. Si no existe, retorna null
   * 4. Compara la contraseña ingresada con el hash almacenado usando bcrypt
   * 5. Si no coincide, retorna null
   * 6. Si coincide, retorna objeto con username y roles
   *
   * Devuelve: Objeto {username, roles} si es válido, null si no lo es
   */
  async validateUser(username: string, password: string) {
    const users = this.loadUsers();
    const user = users.find((u: any) => u.username === username);
    if (!user) return null;
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return null;
    return { username: user.username, roles: user.roles };
  }

  /**
   * Genera un token JWT para un usuario válido
   *
   * Recibe:
   * - user: Objeto con username y roles del usuario
   *
   * Pasos:
   * 1. Crea el payload del JWT con sub (username) y roles
   * 2. Firma el token usando JwtService con configuración del módulo
   * 3. Retorna objeto con el access_token
   *
   * Devuelve: Objeto {access_token: string}
   */
  async login(user: { username: string; roles: string[] }) {
    const payload = { sub: user.username, roles: user.roles };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  /**
   * Autentica un usuario y genera su token JWT
   *
   * Recibe:
   * - username: Nombre de usuario
   * - password: Contraseña en texto plano
   *
   * Pasos:
   * 1. Valida las credenciales del usuario
   * 2. Si las credenciales son inválidas, lanza UnauthorizedException
   * 3. Si son válidas, genera y retorna el token JWT
   *
   * Devuelve: Objeto {access_token: string}
   * Lanza: UnauthorizedException si las credenciales son inválidas
   */
  async authenticate(username: string, password: string) {
    const valid = await this.validateUser(username, password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');
    return this.login(valid);
  }
}