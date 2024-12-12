// User Schema
import mongoose, { InferSchemaType, Schema, model} from "mongoose";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false},
});

type User = InferSchemaType<typeof userSchema>;
const User = mongoose.models.User || model<User>('User', userSchema);

export default User;