import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private validationService: ValidationService) {}
  sayHello(first_name: string, last_name: string): string {
    const scheme = z.string().min(3).max(100);
    const firstName = this.validationService.validate(scheme, first_name);
    const lastName = this.validationService.validate(scheme, last_name);
    return `Hello ${firstName} ${lastName}`;
  }
}
