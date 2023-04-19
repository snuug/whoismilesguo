import { functions } from ".";
const summarizeFunctionID = "summarize";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const response = await functions.createExecution(summarizeFunctionID, JSON.stringify(body));
    if(response.statusCode === 200) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'content': response.response}),
      };
    }
    else {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({message: "Something went wrong"}),
      };
    }
  } catch (error:any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
