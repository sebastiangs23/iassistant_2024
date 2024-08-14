import { ObjectId } from "mongoose"

interface IUser extends Document {
    name: string,
    last_name: string,
    email: string,
    age: number,
    password: string,
    id_type_user: ObjectId
};

export default IUser;