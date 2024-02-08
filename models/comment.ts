import mongoose, { Schema, Document, Model} from "mongoose";

export interface IComment extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    username: string;
    comment: string;
}

const CommentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true},
    username: { type: String },
    comment: { type: String }
})
 


const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema)

export default Comment