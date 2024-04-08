import { Model } from 'sequelize'
export interface UserAttr {
    UserId: number,
    Name: string,
    Email: string,
    EmailVerified: boolean,
    PhoneNumber: string,
    PhoneNumberVerified: boolean,
    Password: string
}

export const model = function(sequelize, DataTypes) {
    class User extends Model<UserAttr>{}
    User.init({
        UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Name: { type: DataTypes.STRING, allowNull: false, validate: { min: 1, max: 150 } },
        Email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        EmailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        PhoneNumber: { type: DataTypes.STRING },
        PhoneNumberVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        Password: { type: DataTypes.STRING, allowNull: false, validate: { min: 5, max: 50 } }
    }, { sequelize, timestamps: false })

    return User
}