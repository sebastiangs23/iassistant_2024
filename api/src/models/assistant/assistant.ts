import mongoose, { Schema, Model, mongo } from "mongoose";
import IAssistant from "../../interfaces/IAssistant";

class AssistantClass {};

const AssistantSchema = new Schema<IAssistant>({
    name: { type: String, required: true },
    id_user: { type: Schema.Types.ObjectId, ref: "User" , required: true }, 
    speciality: { type: JSON, required: true },
    conversation: { type: JSON, required: false }
});

AssistantSchema.loadClass(AssistantClass);

const Assistant: Model<IAssistant> = mongoose.model('Assistant', AssistantSchema);

export default Assistant;