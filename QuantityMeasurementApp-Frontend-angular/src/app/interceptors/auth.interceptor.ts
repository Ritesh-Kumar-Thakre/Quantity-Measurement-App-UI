import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuthEndpoint = req.url.includes('/auth/signup') || req.url.includes('/auth/signin');
  
  if (isAuthEndpoint) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }
  return next(req);
};