import { TABLE_NAMES } from "src/common/constants/table-name.constant";
import { Country } from "src/country/entity/country.entity";
import { Projects } from "src/project/entity/project.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: TABLE_NAMES.COMPANY })
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @ManyToOne(() => Country, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "countryId" })
  country: Country;

  @Column({ type: "int", nullable: false })
  countryId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Projects, (project) => project.company)
  projects: Projects[];
}
