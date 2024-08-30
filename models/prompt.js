// import { Schema, model, models } from "mongoose";

// const PromptSchema = new Schema({
//   creator: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   prompt: {
//     type: String,
//     required: [true, "Prompt is required."],
//   },
//   tag: {
//     type: String,
//     required: [true, "Tag is required."],
//   },
// });

// const Prompt = models.Prompt || model("Prompt", PromptSchema);

// export default Prompt;

import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  creator: {
    type: Schema.Types.ObjectId, // Referencing the User model's ID
    ref: "User",
    required: true,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
