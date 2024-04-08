import bcrypt from 'bcrypt'
import { sequelize } from '../models';
import { DataTypes } from 'sequelize';
import { UserAttr, model as userConstructor } from './../models/user';
const UserModel = userConstructor(sequelize, DataTypes)

class UserManager {
    static async getAllUsers(): Promise<UserAttr[]> {
        const users = (await UserModel.findAll()).map(user => user.dataValues)
        return users
    }

    static async getUserByEmail(email: string): Promise<UserAttr> {
        const user = (await UserModel.findOne({ where: { Email: email } }))
        return user?.dataValues
    }

    static async verifyUserEmail(email: string): Promise<void> {
        const user = await UserModel.findOne({ where: { Email: email } })
        user.setDataValue('EmailVerified', true)
        await user.save()
    }

    static async getUserById(userId: number): Promise<Partial<UserAttr>> {
        const user = (await UserModel.findByPk(userId))?.dataValues
        return user
    }

    static async createUser(userToBeAdded: Pick<UserAttr, 'Name' | 'Email' | 'PhoneNumber' | 'Password'>): Promise<UserAttr> {
        userToBeAdded.Password = await bcrypt.hash(userToBeAdded.Password, Number(process.env.SALT_SIZE))
        const user = await UserModel.create(userToBeAdded)
        return user.dataValues
    }

    static async updateUser(userId: number, userToBeUpdated: Pick<UserAttr, 'Name' | 'Email' | 'PhoneNumber'>): Promise<boolean> {
        const { Name, Email, PhoneNumber } = userToBeUpdated
        await UserModel.update({ Name, Email, PhoneNumber }, { where: { UserId: userId } })
        return true
    }

    static async deleteUser(userId: number): Promise<boolean> {
        await UserModel.destroy({ where: { UserId: userId } })
        return true
    }

    static async updatePassword(email: string, password: string): Promise<void> {
        await UserModel.update({ Password: await bcrypt.hash(password, Number(process.env.SALT_SIZE)) }, { where: { Email: email } })
    }
}

export default UserManager