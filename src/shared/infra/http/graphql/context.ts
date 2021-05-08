import { Request } from 'express';

export default interface Context {
  req: Request;
}
