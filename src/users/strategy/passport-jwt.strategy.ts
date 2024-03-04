import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { And, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from '../dto/login.dto';
import { pyloadinterface } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: pyloadinterface, context: ExecutionContext) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user) {
        const request = context.switchToHttp().getRequest();
        request['userId'] = payload;
        console.log(request['user']);
        return true;
    } else {
        throw new UnauthorizedException();
    }
}
}
