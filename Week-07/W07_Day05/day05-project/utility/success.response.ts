import { Injectable } from "@nestjs/common";
import { SuccessHandler } from "interface/response.interface";
@Injectable()
export class ResponseHandler {
  successHandler(data: any, message: string, statusCode: number = 200): SuccessHandler {
    return {
      success: true,   
      statusCode,
      message,
      data,
    };
  }
}
