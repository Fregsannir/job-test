import { Request } from 'express';
import { PayloadDto } from '../dto/payload.dto';

export type AuthorizedRequest = Request & { user: PayloadDto };
