import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpService, private config: ConfigService) {}

  async findAll() {
    return this.http
      .get(this.config.get('URI'))
      .pipe(
        map((res) => {
          let {data} = res, rs = []

          for (let i = 0; i < data.length; i++) {
            const {username, email} = data[i]
            rs.push({username, email})
          }

          return rs
        })
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async findOne(id: number) {
    return this.http
      .get(`${this.config.get('URI')}${id}`)
      .pipe(
        map((res) => {
          const { username, email } = res.data;

          return { username, email };
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }
}
