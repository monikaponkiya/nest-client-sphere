import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";
import { TABLE_NAMES } from "../common/constants/table-name.constant";
import { UserRole } from "../common/constants/enum.constant";

const columns = [
  {
    name: "id",
    type: "int",
    isPrimary: true,
    isGenerated: true,
    generationStrategy: "increment",
  },
  {
    name: "firstName",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "lastName",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "role",
    type: "enum",
    enum: Object.values(UserRole),
    isNullable: false,
  },
  {
    name: "personalEmail",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "companyEmail",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "phone",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "department",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "designation",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "password",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "dateOfBirth",
    type: "date",
    isNullable: true,
  },
  {
    name: "joiningDate",
    type: "date",
    isNullable: false,
  },
  {
    name: "reportingPerson",
    type: "varchar",
    isNullable: false,
  },
  {
    name: "userCode",
    type: "varchar",
    isNullable: false,
    unique: true,
  },
  {
    name: "createdAt",
    type: "timestamp",
    default: "CURRENT_TIMESTAMP",
  },
  {
    name: "updatedAt",
    type: "timestamp",
    default: "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  },
];

const columnsObjects = columns.map((column) => {
  const { generationStrategy, ...rest } = column;
  if (generationStrategy) {
    return new TableColumn({
      ...rest,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      generationStrategy: generationStrategy as any, // Cast to any to bypass the type check
    });
  }
  return new TableColumn(rest);
});

export class UserEntity1717681709976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAMES.USER,
        columns: columnsObjects,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.USER);
  }
}
