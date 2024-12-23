import { EmployeeRole } from "src/common/constants/enum.constant";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";
import { Projects } from "src/modules/project/entity/project.entity";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: TABLE_NAMES.EMPLOYEE })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: "enum", enum: Object.values(EmployeeRole), nullable: false })
  role: EmployeeRole;

  @Column({ nullable: false, unique: true })
  personalEmail: string;

  @Column({ nullable: false, unique: true })
  companyEmail: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  department: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: false })
  joiningDate: Date;

  @Column({ type: "int", nullable: false })
  reportingPersonId: number;

  @ManyToOne(() => Employee, (employee) => employee.reportees, {
    nullable: true,
  })
  @JoinColumn({ name: "reportingPersonId" })
  reportingPerson: Employee;

  @OneToMany(() => Employee, (employee) => employee.reportingPerson)
  reportees: Employee[];

  @Column({ nullable: false, unique: true })
  employeeCode: string;

  @BeforeInsert()
  async generateEmployeeCode() {
    const lastEmployee = await Employee.find({
      order: { id: "DESC" },
      take: 1,
    });
    const lastId = lastEmployee.length > 0 ? lastEmployee[0].id : 0;
    const nextId = lastId + 1;
    this.employeeCode = `EMP${String(nextId).padStart(2, "0")}`;
  }

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => Projects, (project) => project.projectManager)
  projectManager: Projects[];

  @OneToMany(() => Projects, (project) => project.teamLeader)
  teamLeader: Projects[];

  @OneToOne(() => Projects, (project) => project.createdByEmployee)
  projectCreated: Projects;

  @OneToOne(() => Projects, (project) => project.updatedByEmployee)
  projectUpdated: Projects;
}
