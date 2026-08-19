import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private BookService: BookService) {}

    @Post('create')
    createBook(@Body() payload: any) {
        return this.BookService.createBook(payload);
    }

    @Get('list')
    getBook() {
        return this.BookService.getBooks()
    }

    @Get('detail/:id')
    getDetailBook(@Param('id') id: number) {
        return this.BookService.getDetailBook(id)
    }

    @Put('update/:id')
    updateBook(@Param('id') id: number, @Body() payload: any) {
        return this.BookService.updateBook(id, payload)
    }
}
