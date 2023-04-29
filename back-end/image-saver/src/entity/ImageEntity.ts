import { Entity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { PrimaryColumn } from 'typeorm/decorator/columns/PrimaryColumn';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'path' })
  path: string;

  @Column({ name: 'file_type' })
  fileType: string;

  @CreateDateColumn({ name: 'created_date_timestamp' })
  createdDateTs: string;

  constructor(id: string, path: string, fileType: string) {
    this.id = id;
    this.path = path;
    this.fileType = fileType;
  }
}
