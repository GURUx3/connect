import mongoose from "mongoose";



// scheme define the structure of our data in database
const UserSchema = new mongoose.Schema({    
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store hashed
});

export default mongoose.model("user", UserSchema);
