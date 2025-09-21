import { Request, Response, NextFunction } from 'express';

// Middleware para bypassar autenticação
export function bypassAuth(req: Request, _res: Response, next: NextFunction) {
  // Adiciona headers de autenticação fake
  req.headers.authorization = 'Bearer guest-token';
  req.headers['x-backstage-user'] = 'guest';
  next();
}
