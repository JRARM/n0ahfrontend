
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable, Injector } from "@angular/core";
// import { Router } from "@angular/router";
// import { Observable, catchError } from "rxjs";

// @Injectable()
// export class Interceptor implements HttpInterceptor {
//     constructor(private inject: Injector, private router: Router) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req).pipe(catchError(x=>this.handleAuthError(x)));
//     }



// }