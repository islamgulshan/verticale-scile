import { SetMetadata } from '@nestjs/common';
import { skip_auth } from '../../constants';

export const SkipAuth = () => SetMetadata(skip_auth, true);
