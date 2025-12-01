import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type UserRole = 'ADMIN' | 'OPERATOR';

interface User {
  id: string;
  username: string;
  password: string; // plain for demo
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  private users: User[] = [
    { id: '1', username: 'admin', password: 'admin', role: 'ADMIN' },
    { id: '2', username: 'operator', password: 'operator', role: 'OPERATOR' },
  ];

  validate(username: string, password: string): User {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  login(username: string, password: string) {
    const user = this.validate(username, password);
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwt.sign(payload),
      user,
    };
  }

  verifyUser(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
