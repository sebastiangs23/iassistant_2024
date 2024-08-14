import { ObjectId } from "mongoose"

interface IAssistant extends Document {
    name: String,
    id_user: ObjectId,
    speciality: JSON,
    conversation: JSON
};

export default IAssistant;