import mongoose, { Schema, Document, Model} from "mongoose";

export interface IPost extends Document {
    userId: Schema.Types.ObjectId;
    username: string;
    image: string;
    description: string;
}

const PostSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    username: { type: String, required: true},
    image: { type: String },
    description: { type: String }
})



const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema)

export default Post