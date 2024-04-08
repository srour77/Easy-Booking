import { model as Trip } from "./trip";
import { Model } from "sequelize";

export interface TripDayAttr {
  TripId: number;
  Day: string;
}

export const model = function (sequelize, DataTypes) {
const TripModel = Trip(sequelize, DataTypes);
  class TripDay extends Model<TripDayAttr> {}
  TripDay.init({
      TripId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: TripModel, key: "TripId" } },
      Day: { type: DataTypes.STRING, primaryKey: true, validate: { isIn: [ [ "sunday", "tuesday", "wednesday", "thursday", "friday", "saturday" ] ] } },
    }, { sequelize, timestamps: false } );

  return TripDay;
};