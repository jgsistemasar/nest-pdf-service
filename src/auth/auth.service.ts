import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private loadUsers() {
    const filePath = path.resolve(process.cwd(), 'users.json');
    if (!fs.existsSync(filePath)) {
      throw new Error('users.json no encontrado. Verificá el path.');
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw).users || [];
  }

  async validateUser(username: string, password: string) {
    const users = this.loadUsers();
    const user = users.find((u: any) => u.username === username);
    if (!user) return null;
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return null;
    return { username: user.username, roles: user.roles };
  }

  async login(user: { username: string; roles: string[] }) {
    const payload = { sub: user.username, roles: user.roles };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async authenticate(username: string, password: string) {
    const valid = await this.validateUser(username, password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');
    return this.login(valid);
  }
}