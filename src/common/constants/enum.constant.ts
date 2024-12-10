export enum AppEnvironment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export enum EmployeeRole {
  ADMIN = "admin",
  SALES_MANAGER = "sales_manager",
  SALES_EXECUTIVE = "sales_executive",
  PROJECT_MANAGER = "project_manager",
  TEAM_LEADER = "team_leader",
  SENIOR_SOFTWARE_ENGINEER = "senior_software_engineer",
  SOFTWARE_ENGINEER = "software_engineer",
  TRAINEE = "trainee",
}

export enum ClientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum ProjectStatus {
  NOT_STARTED = "not_started",
  STARTED = "started",
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum BillingType {
  FIXED = "fixed",
  HOURLY = "hourly",
  MONTHLY = "monthly",
}

export enum CurrencyType {
  USD = "USD",
  GBP = "GBP",
  INR = "INR",
  EUR = "EUR",
}

export enum InvoiceStatus {
  GENERATED = "generated",
  PARTIAL_COMPLETED = "partial_completed",
  COMPLETED = "completed",
}

export enum InvoicePaymentCycle {
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
}

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
  PARTIAL_PAID = "partial_paid",
}

export enum CrStatus {
  NOT_STARTED = "not_started",
  STARTED = "started",
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
