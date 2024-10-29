import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly greet:string = "Hello World"


    public greeting():string{
        return this.greet
    }

}
