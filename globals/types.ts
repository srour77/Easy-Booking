import { UserAttr } from "../models/user";
import { AdminAttr } from "../models/admin";
import { SuperAdminAttr } from "../models/superAdmin";
import { Roles } from "./enums";

export type UserToken = Required< Pick<UserAttr, 'UserId' | 'Email' | 'Name' | 'PhoneNumber'> & { role: Roles.user } >

export type AdminToken = Required< Pick<AdminAttr, 'AdminId' | 'Email' | 'Name' | 'PhoneNumber' | 'CompanyId'> & { role: Roles.admin } >

export type SuperAdminToken = Required< Pick<SuperAdminAttr, 'SuperAdminId' | 'Email' | 'Name' | 'CompanyId'> & { role: Roles.superAdmin } >