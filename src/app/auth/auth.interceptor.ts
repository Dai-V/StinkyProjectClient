import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("stinkyToken1");
  if (token)
  {
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    });
  }
  return next(req);
};
