# vanilla-chatgpt

A minimal ChatGPT client by vanilla javascript, run from local or any web host

For example, 

* https://raw.githack.com/casualwriter/vanilla-chatgpt/main/source/index.html
* https://raw.githack.com/casualwriter/vanilla-chatgpt/main/source/vanilla-chatgpt.html

![](vanilla-chatgpt.jpg)


### Features

* no dependence in vanilla javascript
* no installation, run from local or web
* simple with reusable library
* print friendly for conversation
* responsive for mobile

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

However, please note that the key can be revealed by html source. Please run it from **LOCAL ONLY**


### How to run and use

Fork [this repo](https://github.com/casualwriter/vanilla-chatgpt), 
or just run from [github](https://raw.githack.com/casualwriter/vanilla-chatgpt/main/source/index.html), 
or download and run locally.

1. ``input OPENAI_API_KEY`` when load the page first time. API key will be stored in browser local storage.
1. ``Prompt Samples`` shows in right-corner, click to select it.
1. ``Input prompt`` and click `[Send]` button or press `ctrl-enter`
1. ``Submitted prompts`` will show in right corner, click to jump to corresponding section.
1. Press [ctrl-p] to `print conversation`
1. Click on [clear] button, to `clear conversation history`
1. Click on **[logout]** button, to `clear OPEN_API_KEY` from local storage.


### Files

This repository includes 2 version of vanilla-chatGPT, and its javascript libary

1. `index.html` is the all-in-one version of vanilla-chatGPT. no dependence in vanilla javascript.
2. `vanilla-chatgpt.html` is the minimum version using casual-markdown.js and vanilla-chatgpt.js.
3. `casual-markdown@0.91.js`  // [casual-markdown parser](https://raw.githack.com/casualwriter/casual-markdown), for chatGPT markdown
4. `vanilla-chatgpt.js`  //  js library for vanilla-chatgpt, reusable for your chatGPT client.


### Credit

Inspired by the some self-host solutions

* https://github.com/yuezk/chatgpt-mirror, mirror of ChatGPT (node.js, self-host)
* https://github.com/dirk1983/chatgpt, a simple self-host solution (php)


(2023/03/27, v0.50, casualwriter, MIT license)
