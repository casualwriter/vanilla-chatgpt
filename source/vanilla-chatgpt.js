/*****************************************************************************
* vanilla-chatgpt.js - chat library for openai-chatgpt
* last updated on 2023/03/28, v0.60, basic chat, responsive, print-friendly, export.
*
* Copyright (c) 2023, Casualwriter (MIT Licensed)
* https://github.com/casualwriter/vanilla-chatgpt
*****************************************************************************/

const chat = (id) => window.document.getElementById(id);

// Set the API endpoint URL
chat.endPoint  = "https://api.openai.com/v1/chat/completions";
chat.model = "gpt-3.5-turbo"
chat.body  = { model: chat.model, temperature: 0.8 }
chat.history = []

// stream result from openai
chat.stream = function (prompt) {

  chat.body.stream = true 
  chat.body.messages = [ { role: "user", content: prompt} ]
  chat.headers = { "Authorization": `Bearer ${chat.apiKey}`, "Content-Type": "application/json" }
  chat.result = ''
  chat.controller = new AbortController();
  const signal = chat.controller.signal
   
  for (let i=chat.history.length-1; i>=0&&i>(chat.history.length-3); i--) {
    chat.body.messages.unshift( { role:'assistant', content: chat.history[i].result } );
    chat.body.messages.unshift( { role:'user', content: chat.history[i].prompt } );
  }
  
  fetch( chat.endPoint, { method:'POST', headers: chat.headers, body: JSON.stringify(chat.body), signal } )
  .then( response => { 
  
    if (!response.ok) {
        if (response.status == 401) throw new Error('401 Unauthorized, invalide API Key');
        throw new Error('failed to get data, error status '+response.status)
    }
    
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    
    reader.read().then( function processText({ done, value }) {
    
      if (done) return chat.oncomplete(chat.result);
      
      const lines = (chat.value=value).split('\n');

      for (let i in lines) {
        if (lines[i].length === 0) continue;     // ignore empty message
        if (lines[i].startsWith(':')) continue;  // ignore comment message
        if (lines[i] === 'data: [DONE]') return chat.oncomplete(chat.result); // end of message
        
        chat.json = JSON.parse(lines[i].substring(6));
        if (chat.json.choices) {
          chat.result += (chat.json.choices[0].delta.content||'') 
        }	 
      }

      chat.onmessage(chat.result)
      return reader.read().then(processText);
       
    } )
    
  } ).catch( error => chat.onerror(error) );
  
}
    
// send prompt to openai API (not used in vanilla-chatGPT)
chat.send = function (prompt) {
  
  chat.body.stream = false 
  chat.body.messages = [ { role: "user", content: prompt} ]
  chat.headers = { "Authorization": `Bearer ${chat.apiKey}`, "Content-Type": "application/json" }
  chat.result = ''
  chat.controller = new AbortController();
  const signal = chat.controller.signal
   
  fetch( chat.endPoint, { method:'POST', headers: chat.headers, body: JSON.stringify(chat.body), signal } )
  .then(response => response.json() )
  .then(json => {
     if ((chat.json = json).choices) {
        chat.result = json.choices[0].message.content
        chat.onmessage(chat.result)
        chat.oncomplete(chat.result)
     }	 
  })
  .catch(error => console.error(error));
}

// default error handle
chat.onerror = (error) => { alert(error);  };

// clear API key when logout
chat.logout = () => { 
  if (confirm( 'Logout and clear API Key?')) localStorage.clear();
}

// export conversation
chat.export = (fname) => {
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' 
  chat.history.forEach( (x) => { 
    link.href += encodeURIComponent('### '+x.prompt+'\n\n'+x.result+'\n\n') 
  } );  
  link.download = fname||('chat-'+new Date().toISOString().substr(0,16))+'.md';
  link.click();
} 
