import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async createBook(payload: any): Promise<any> {
    try {
      //jika berhasil
      const res = await this.bookRepository.save({
        nama_buku: payload.nama_buku,
        pengarang_buku: payload.pengarang_buku,
        penerbit_buku: payload.penerbit_buku,
      });

      return {
        status: 'Succses',
        messege: 'Berhasil menambahkan',
        data: res,
      };
    } catch (err) {
      //jika ada error
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async getBooks(): Promise<any> {
    const res = await this.bookRepository.find();
    return {
      status: "Success",
      message: "List Buku ditermukan",
      data: res,
    };
  }

  async getDetailBook(id: number): Promise<any> {
    const detailBook = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
 
    if (detailBook === null) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }
    return {
      status: "Success",
      message: "Detail Buku ditermukan",
      data: detailBook,
    };
  }

  async updateBook(id: number, payload: any) {
    // const update =  await this.latihanRepository.update(
    //   {
    //     id: id
    //   },
    //   payload
    // )

    const update = await this.bookRepository.update(
      {
        id: id,
      },
      {
        ...payload,
        updated_at: new Date(),
      },
    );

    if (!update.affected) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }

    return {
      status: 'Succses',
      messege: 'Update berhasil',
      data: update,
    };
  }
}
