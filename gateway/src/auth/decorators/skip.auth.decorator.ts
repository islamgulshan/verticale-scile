import { SetMetadata } from '@nestjs/common';
import { skip_auth } from '../../constants/jwt.constant';

export const SkipAuth = () => SetMetadata(skip_auth, true);
