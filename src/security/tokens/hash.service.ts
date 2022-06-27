import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Unauthorized } from '../../errors';

@Injectable()
export class HashService {
  hashFunction(field: string) {
    const hash = createHash('sha256').update(field).digest('hex');

    return hash;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);

    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  }

  async comparePassword(password: string, hashPassword: string) {
    const isValid = await bcrypt.compare(password, hashPassword);

    if (!isValid) {
      throw new Unauthorized();
    }
  }
}
