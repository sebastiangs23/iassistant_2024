import mongoose, { Document, Schema, Model, model } from "mongoose";
import IUser from "../../interfaces/IUser.js";
import TypeUser from "./typeUsers.js";

class UserClass {
    getData(this: IUser): string {
        return `${this.name} ${this.last_name}`;
    }
}

const UserSchema = new Schema<IUser>( {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    id_type_user: { type: Schema.Types.ObjectId, ref: 'TypeUser' , require: true }
});

UserSchema.loadClass(UserClass);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;