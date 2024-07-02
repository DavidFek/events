import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

const fakeUsers = [
  {
    id: 1,
    email: 'anson',
    password: 'password',
  },
  {
    id: 2,
    email: 'jack',
    password: 'password123',
  },
];

//query the database to find the user

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private databaseService: DatabaseService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    // console.log(findUsers, email, password);

    if (!user) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
      const payload = {
        email: user.email,
        role: user.role,
      };
      return {
        token: this.jwtService.sign(payload),
        role: user.role,
        userId: user.id,
      };
    }
  }
}
