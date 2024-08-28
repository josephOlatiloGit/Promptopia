import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

/**
 * Create a prompt Post  req function by making a req from the json to the DB
 * NOTE: In Next we need to always call the connectToDB method cause the DB dies after its serves it request.
 */

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
