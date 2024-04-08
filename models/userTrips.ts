import { model as Trip } from "./trip";
import { model as User } from "./user";
import { Model } from "sequelize";

export interface UserTripsAttr {
  UserId: number;
  TripId: number;
  Date: Date;
  SeatsNo: number
}

export const model = function (sequelize, DataTypes) {
const UserModel = User(sequelize, DataTypes), TripModel = Trip(sequelize, DataTypes)
  class UserTrip extends Model<UserTripsAttr> {}
  UserTrip.init({
      UserId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: UserModel, key: "UserId" } },
      TripId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: TripModel, key: "TripId" } },
      Date: { type: DataTypes.DATEONLY, primaryKey: true },
      SeatsNo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, { sequelize });

  return UserTrip;
};