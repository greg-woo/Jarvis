//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

//const { task } = require("gulp");

localStorage.setItem("Tasks", JSON.stringify(
  [
    { name: "Get five clients", finished: false },
    { name: "Finish project", finished: false },
    { name: "Call Pablo", finished: true },
    { name: "Finish mockup", finished: false },
    { name: "Prepare for meeting", finished: true }
  ]))


var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work

var messageHelp
var askedForHelp = false
var userWantsHelp = false




// document.addEventListener("DOMContentLoaded", function(event) {
//     /* DOM is ready, so we can query for its elements */
//     var dragonHealth = document.getElementById("progbar").aria-valuenow;
//     console.log(dragonHealth);
//     // 410

//     /*additional code for comment*/
//     document.querySelector('checkTask').addEventListener("change", function(event){
//         if(this.checked) {
//             // Checkbox is checked..
//            document.getElementById("progbar").aria-valuenow += 10;
//         } else {
//             document.getElementById("progbar").aria-valuenow -= 10;

//         }
//             // Checkbox is not checked..
//     });
//     //
// });

var numberTasksTotal = 0;
var numberTasksLeft = 1;

function UpdatePercentage() {

  var allCheckBoxes = document.getElementsByClassName("option-input radio");

  numberTasksLeft = 0;
  var tasksCompleted = 0;
  for (var i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked) {
      tasksCompleted++;
    } else {
      numberTasksLeft++;
    }
  }
  numberTasksTotal = tasksCompleted + numberTasksLeft;
  var percentage = (tasksCompleted / numberTasksTotal) * 100;
  document.getElementById("completed_percentage").innerHTML = percentage.toFixed(0)  + "%";
  document.getElementById("progbar").style.width = percentage.toFixed(0)  + "%";
  document.getElementById("tasksLeft").innerHTML = numberTasksLeft;
  // if (this.checked) {
  //   tasksCompleted ++;
  //   percentage = tasksCompleted/numberTasksTotal * 100;
  //   numberTasksLeft --;
  //   document.getElementById("completed_percentage").innerHTML = percentage+"%";
  // } else {
  //   tasksCompleted --;
  //   percentage = tasksCompleted/numberTasksTotal * 100;
  //   numberTasksLeft ++;
  //   document.getElementById("completed_percentage").innerHTML = percentage+"%";
  // }

}



//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  var text = lastUserMessage
  if (userWantsHelp && text.toLowerCase().includes("development") || text.toLowerCase().includes("developing") || text.toLowerCase().includes("revenue") || text.toLowerCase().includes("index") || text.toLowerCase().includes("growth")) {
    const department = "Development"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have a " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now, I recommend that you ask: " + rec[0].name + ".\nDo you want me to send them the following message:\n" + messageHelp
  }
  else if (userWantsHelp && (text.toLowerCase().includes("it") || text.toLowerCase().includes("technical") || text.toLowerCase().includes("tech support") || text.toLowerCase().includes("troubleshooting") || text.toLowerCase().includes("software"))) {
    const department = "IT"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have an " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now, I recommend that you ask: " + rec[0].name + ".\nDo you want me to send them the following message:\n" + messageHelp
  }
  else if (userWantsHelp && text.toLowerCase().includes("analysis") || text.toLowerCase().includes("key consumer")) {
    const department = "Analysis"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have an " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now, I recommend that you ask: " + rec[0].name + ".\nDo you want me to send them the following message:\n" + messageHelp
  }
  else if (userWantsHelp && text.toLowerCase().includes("data analytics") || text.toLowerCase().includes("trends") || text.toLowerCase().includes("pattern recognition")) {
    const department = "Data Analytics"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have a " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now, I recommend that you ask: " + rec[0].name + ".\nDo you want me to send them the following message:\n" + messageHelp
  }
  else if (askedForHelp && text.toLowerCase().includes("yes")) {
    askedForHelp = false
    userWantsHelp = false
    botMessage = "You need help"
  }
  else if (askedForHelp && text.toLowerCase().includes("no")) {
    askedForHelp = false
    userWantsHelp = false
    botMessage = "Okay! Is there anything else that I can help you with?"
  }
  else if (!askedForHelp && text.toLowerCase().includes("no")) {
    userWantsHelp = false
    botMessage = "Good luck!"
  }
  else if (text.toLowerCase().includes("good morning")) {
    botMessage = "Good morning!\nHere are your tasks for the day:"
    JSON.parse(localStorage.getItem("Tasks")).filter(task => !task.finished).map(task => botMessage += "\n - " + task.name)
  }
  else if (text.toLowerCase().includes("add task")) {
    addTask("Hello");
    numberTasksLeft += 1;
    document.getElementById("tasksLeft").innerHTML = numberTasksLeft;

  }
  else if (text.toLowerCase().includes("task") && (text.toLowerCase().includes("list") || text.toLowerCase().includes("what are my"))) {
    botMessage = "Here are your tasks for the day: \n"
    JSON.parse(localStorage.getItem("Tasks")).filter(task => !task.finished).map(task => botMessage += "\n - " + task.name)
  }
  else if (text.toLowerCase().includes("tasks") && (text.toLowerCase().includes("completed") || text.toLowerCase().includes("finished"))) {
    botMessage = "Here are your finished tasks: "
    JSON.parse(localStorage.getItem("Tasks")).filter(task => task.finished).map(task => botMessage += "\n - " + task.name)
  }
  else if (text.toLowerCase().includes("hello"))
    botMessage = "Hello! \nHow can I help you today?"
  else if (text.toLowerCase().includes("task finished"))
    botMessage = "Good work! I've removed it from your remaining tasks!\nDo you want to start a new task or take a short break?"
  else if (text.toLowerCase().includes("break"))
    botMessage = "You've earned it! I'll leave you alone for 15 minutes and then check back in!"
  else if (text.toLowerCase().includes("start task"))
    botMessage = "Great motivation!"
  else if (text.toLowerCase().includes("help")) {
    userWantsHelp = true
    botMessage = "Ask me your question and I'll point you in the right direction."
  }
  else botMessage = "I'm sorry but I'm not sure what that means. \nIs there something I can help you with?"
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
    //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}

function getRecommendation(field) {
  const devProfiles = JSON.parse(localStorage.getItem("Profiles")).map(profile => ({ name: profile.Name, special: profile.Specializations.map((special) => special.field) })).filter(mem => (mem.special.includes(field)))
  return devProfiles
  // return "Bob"
}

function addTask(word) {
  document.getElementById('taskList').innerHTML += ('<div class="d-flex align-items-center"><label><input onclick = "UpdatePercentage()" type="checkbox" class="option-input radio"><span class="label-text">' + word + '</span></label></div>');
}