import { ClientStatus } from "src/common/constants/enum.constant";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";
import { Projects } from "src/modules/project/entity/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: TABLE_NAMES.CLIENT })
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  countryCode: string;

  @Column({ nullable: false })
  stateCode: string;

  @Column({ nullable: false })
  cityCode: string;

  @Column({ type: "enum", enum: ClientStatus })
  status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Projects, (project) => project.client)
  projects: Projects[];
}