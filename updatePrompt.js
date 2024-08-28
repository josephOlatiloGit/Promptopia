import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const updatePrompts = async () => {
  try {
    await connectToDB();

    // Find all prompts that are missing the creator field
    const promptsWithoutCreator = await Prompt.find({
      creator: { $exists: false },
    });

    for (const prompt of promptsWithoutCreator) {
      // Set the creator field (you can set a default user ID here)
      const defaultUser = await User.findOne({ email });
      prompt.creator = defaultUser._id;

      // Save the updated prompt document
      await prompt.save();
    }

    console.log("Prompts updated successfully");
  } catch (error) {
    console.error("Error updating prompts:", error);
  }
};

updatePrompts();
