import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as Sentry from "@sentry/minimal";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            tap(null, (exception) => {
                Sentry.withScope((scope) => {
                    scope.setSDKProcessingMetadata({ request: context.switchToHttp().getRequest() });
                    scope.setUser(context.switchToHttp().getRequest().user);
                    Sentry.captureException(exception);
                });
                Sentry.captureException(exception);
            }),
        );
    }
}
