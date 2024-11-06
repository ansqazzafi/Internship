import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        console.log(req.body);
        const role = req.body?.role
        if(!role){
            throw new ForbiddenException("property role doesn't exist")
        }
        if (role !== 'Admin') {
            throw new ForbiddenException("You are not Authorized")
        }
        return true
    }
}