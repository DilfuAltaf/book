import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
 
@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  nama_buku: string;
 
  @Column()
  pengarang_buku: number;

  @Column()
  penerbit_buku: string;

  @Column()
  updated_at: string;
}
