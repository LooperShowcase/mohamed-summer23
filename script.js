let open_ai_response;

let conversation = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hi,how can i help you??" },
];
async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "my happiness out of:" + sentiment + "." + "my input is:" + question,
  });
}

async function conversationAssistantAdd(response) {
  conversation.push({ role: "assistant", content: response });
}

async function openai_test() {
  var url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-uUPayv04E0azuKUx7fqkT3BlbkF";
  let part3 = "JAbsZR6JQELQpKK5nH0bl";

  let apiKey = part1 + part2 + part3;

  var data = {
    model: "gpt-3.5-turbo",
    messages: conversation,
  };

  var lamine_yamal = {
    country: "spain",
    birthday: "13 / 7 / 2007",
    club: "barcelona",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const messages = responseData.choices[0].message.content;
      conversationAssistantAdd(messages);
      const utterance = new SpeechSynthesisUtterance(messages);
      speechSynthesis.speak(utterance);
      return messages;
    } else {
      console.log("request failed with status:", response.status);
    }
  } catch (ereor) {
    console.log("an error occured:", error);
  }
}
