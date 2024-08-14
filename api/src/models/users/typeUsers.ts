import mongoose, { Schema, Model } from "mongoose";
import ITypeUser from "../../interfaces/ITypeUser";

class TypeUserClass {};

const TypeUserSchema = new Schema<TypeUserClass> ({
    name: { type: String, require: true }
});

TypeUserSchema.loadClass(TypeUserClass);

const TypeUser: Model<ITypeUser> = mongoose.model<ITypeUser>('type_users', TypeUserSchema);

export default TypeUser;