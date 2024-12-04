import { ClientStatus, Designation } from "src/common/constants/enum.constant";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";
import { Companies } from "src/modules/company/entity/company.entity";
import { Projects } from "src/modules/project/entity/project.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: TABLE_NAMES.CLIENT })
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: "enum", enum: Object.values(Designation), nullable: false })
  designation: Designation;

  @Column({ type: "int", nullable: false })
  companyId: number;

  @ManyToOne(() => Companies, (company) => company.clients, { nullable: false })
  @JoinColumn({ name: "companyId" })
  company: Companies;

  @Column({ nullable: false })
  clientCompanyName: string;

  @Column({ nullable: false })
  accountManager: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  skypeId: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  countryCode: string;

  @Column({ nullable: true })
  stateCode: string;

  @Column({ nullable: true })
  cityName: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ type: "enum", enum: Object.values(ClientStatus) })
  status: ClientStatus;

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
