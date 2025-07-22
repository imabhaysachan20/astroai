export function mockGptResponse(prompt: string) {
  return {
    id: "chatcmpl-mock123",
    object: "chat.completion",
    created: Date.now() / 1000,
    model: "gpt-3.5-turbo-0613",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: `
✨ *Career Prediction* ✨

Your chart shows a strong Saturn influence indicating steady growth. A major opportunity might arise between October and December. Stay focused, avoid distractions.

🌟 *Good luck!*
          `.trim()
        },
        finish_reason: "stop"
      }
    ],
    usage: {
      prompt_tokens: 50,
      completion_tokens: 120,
      total_tokens: 170
    }
  };
}