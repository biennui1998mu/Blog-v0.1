import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    generateJWT(user: User): Promise<string>{
        return this.jwtService.signAsync({user});
    }

    hashPassword(password: string): Observable<string>{
        return bcrypt.hash(password, 10);
    }

    comparePassword(password: string, hashedPassword: string): Observable<any>{
        return of<any | boolean>(bcrypt.compare(password, hashedPassword));
    }
}
