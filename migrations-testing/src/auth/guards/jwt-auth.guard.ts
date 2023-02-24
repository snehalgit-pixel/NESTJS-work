import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// yarn add @nestjs/passport
@Injectable()
export class JwtAuthGuard extends AuthGuard('local') {

}