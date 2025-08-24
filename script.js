const responseContainer = document.getElementById("response");
const data = {};
const searchButton = document.getElementById('search-btn');
const questionInput = document.getElementById('search_area');
const chatContainer = document.getElementById('chat');
const searchIcon = document.querySelector('.search img');

async function displayResponse(question) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openai/gpt-oss-20b:free",
        "messages": [
          {
            "role": "user",
            "content": `Please provide an answer to the following question. Your response should be a single paragraph. Do not use bold font bullet points or tables. The content should be in simple words with minimal punctuation. The goal is a concise and direct explanation without any special formatting. Question: ${question}`
          }
        ]
      })
    });
    const data = await response.json();
    console.log(data);
    const answer = data.choices[0].message.content;
    
    return answer;
}

searchButton.addEventListener('click', async () => {

  searchIcon.src = "Loading.gif";

  const user = document.createElement('p');
  question = questionInput.value;    
  user.textContent = question;
  user.classList.add('input');
  chatContainer.appendChild(user);

  const result = await displayResponse(question);
  const output = document.createElement('p');
  output.textContent = result;
  output.classList.add('output');
  chatContainer.appendChild(output);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  questionInput.value = '';

  searchIcon.src = "search-interface-symbol.png";

});

searchButton.addEventListener('keyup', async (event) => {
  if (event.key === 'Enter') {
    const user = document.createElement('p');
    question = questionInput.value;    
    user.textContent = question;
    user.classList.add('input');
    chatContainer.appendChild(user);

    const result = await displayResponse(question);
    const output = document.createElement('p');
    output.textContent = result;
    output.classList.add('output');
    chatContainer.appendChild(output);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    questionInput.value = '';
  }
});