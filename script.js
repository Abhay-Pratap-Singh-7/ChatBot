// created variables to access HTML elements
const data = {};
const container = document.querySelector('.container');
const searchButton = document.getElementById('search-btn');
const questionInput = document.getElementById('search_area');
const chatContainer = document.getElementById('chat');
const searchIcon = document.querySelector('.search img');
const apiInput = document.getElementById('api_input');
const submitKey = document.getElementById('api_set_btn');
let api_key = "";

// function to fetch response from the API
async function displayResponse(question) {
    if ( api_key === "" ) {
      alert("Please enter your API key");
      return "Error: API key not provided.";
    }
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "z-ai/glm-4.5-air:free",
        "messages": [
          {
            "role": "user",
            "content": `Answer the following question in plain text with no formatting no bold no special characters no tables and only minimal punctuation keep the response simple and direct Question: ${question}`
          }
        ]
      })
    });
    const data = await response.json();
    console.log(data);
    const answer = data.choices[0].message.content;
    
    return answer;
}

// button to send message and recieve response
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

// diaglog box to enter API key
submitKey.addEventListener('click', () => {
  const inputKey = apiInput.value;
  if (inputKey === "") {
    alert("Please enter a valid API key");
    return;
  }
  api_key = inputKey;
  document.querySelector('.api').style.display = "none";
  container.style.display = "block";
});