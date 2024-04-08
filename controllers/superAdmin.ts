import { SuperAdminAttr } from "../models/superAdmin";
import jwt from "jsonwebtoken";

class SuperAdminController {
    static signSuperAdminToken(superAdmin: Pick<SuperAdminAttr, 'Name' | 'Email' | 'CompanyId'>): string {
        const { Name, Email, CompanyId } = superAdmin
        const token = jwt.sign({Name, Email, CompanyId, role: 'superAdmin'}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_PERIOD })
        return token
    }
}

export default SuperAdminController