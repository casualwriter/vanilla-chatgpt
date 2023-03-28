# vanilla-chatgpt

A minimal ChatGPT client by vanilla javascript, run from local or any web host

For example, direct run from github source folder

* https://raw.githack.com/casualwriter/vanilla-chatgpt/main/source/index.html
* https://raw.githack.com/casualwriter/vanilla-chatgpt/main/source/vanilla-chatgpt.html

![](https://github.com/casualwriter/vanilla-chatgpt/blob/main/vanilla-chatgpt.jpg)


This repository includes 2 version of vanilla-chatGPT, and a js library for chatGPT API.

1. [index.html](https://github.com/casualwriter/vanilla-chatgpt/blob/main/source/index.html) is a single file version of vanilla-chatGPT. no dependence.
2. [vanilla-chatgpt.html](https://github.com/casualwriter/vanilla-chatgpt/blob/main/source/vanilla-chatgpt.html) is the minimum version using casual-markdown.js and vanilla-chatgpt.js.
3. [vanilla-chatgpt.js](https://github.com/casualwriter/vanilla-chatgpt/blob/main/source/vanilla-chatgpt.js) the js library reusable for your chatGPT client.

The program is very simple in 360/150 lines of code, easy to be revised in your purposes.


### vanilla-chatgpt.js

`vanilla-chatgpt.js` is the reusable code with the following functions:

* `chat.stream(prompt)` submit prompt in stream mode.
* `chat.send(prompt)` submit prompt in normal mode.
* `chat.onmessage(text)` will be triggered when message received.
* `chat.oncomplete(text)` will be triggered when message completed.
* `chat.controller.abort()` to abort fetch() process 
* `chat.export()` to export conversation to markdown file
* `chat.history[]` keep the conversation history
* `chat.apiKey` stored the OPENAI_API_KEY, please assign it before call above functions.


### How to use

Fork [this repo](https://github.com/casualwriter/vanilla-chatgpt), 
or just run from [github](https://raw.githack.com/casualwriter/vanilla-chatgpt/main/source/index.html), 
or download and run locally.

1. ``input OPENAI_API_KEY`` when load the page first time. (will be stored in browser local storage)
1. ``Sample prompts`` shows in right-corner, click to select it.
1. ``Input prompt`` and click `[Send]` or press `<ctrl-enter>` to submit 
1. ``Submitted prompts`` will show in right corner, click to jump to corresponding section.
1. Press [ctrl-p] to `print conversation`
1. Click on [export] button, to `export conversation` to markdown file.
1. Click on [clear] button, to `clear conversation history`
1. Click on **[logout]** button, to `clear OPENAI_API_KEY` from local storage.


### OPENAI_API_KEY

Program will prompt to input OPENAI_API_KEY when load the page first time. The key will be stored in 
browser **local storage** by the following script

```
// prompt for API key if not found in localStorage
window.onload = function () {
  chat.apiKey = localStorage.getItem('OPENAI_API_KEY');
  if (!chat.apiKey || chat.apiKey.length < 10 ) {
     chat.apiKey = prompt("Please input Secret API key (will store in local.storage)", "sk-");
     localStorage.setItem('OPENAI_API_KEY', chat.apiKey)
  }
}
```

For next time loading the page, it will retrieve API key from local storage.

To remove the API key from local storage, just click on [logout] button. 

It is safe to run it from local or web. 

If feel not convenience to input the key every time, you may can hard-code the API key as below

```
window.onload = function () {
  chat.apiKey = 'sk-???????????';
}  
```

However, please note that the key can be revealed if hard-code in html. 
Please run it from **LOCAL ONLY** or in private network


### Credit

Inspired by the some self-host solutions

* https://github.com/yuezk/chatgpt-mirror, mirror of ChatGPT (node.js, self-host)
* https://github.com/dirk1983/chatgpt, a simple self-host solution (php)


(2023/03/28, v0.60)
