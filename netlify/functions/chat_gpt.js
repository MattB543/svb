import fetch from "node-fetch";

exports.handler = async function (event) {
  const payload = JSON.parse(event.body);
  const messages = payload.messages;
  const bearer = "Bearer " + process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1,
    }),
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
};
