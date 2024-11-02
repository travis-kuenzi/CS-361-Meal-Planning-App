import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true}
});


export default mongoose.model('User', UserSchema);