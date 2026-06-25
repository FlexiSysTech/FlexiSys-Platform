import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      app: 'FlexiSys API',
      status: 'running',
      version: '1.0.0',
      message: 'FlexiSys API is connected successfully',
    };
  }
}