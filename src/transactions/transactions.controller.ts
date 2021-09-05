import { Controller, Get } from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {
    @Get()
    helloWorld() {
        return {message: 'Hello World'};
    }
}
