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


var messages = ["<b>" + "Chatbot" + ":</b> " + "Great to see you again!"], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work

var Calendar = {
  "Jack": {
    "2021-01-30": [{ title: "Daily Scrum meeting", startTime: "16:00", endTime: "16:15" }, { title: "Lunch and learn", startTime: "12:00", endTime: "13:00" }],
    "2021-01-31": [{ title: "Project presentation", startTime: "9:00", endTime: "11:00" }]
  },
  "Jill": {
    "2021-01-30": [{ title: "Coffee with Carl", startTime: "11:00", endTime: "11:30" }],
    "2021-01-31": [{ title: "Deadline for report numbers", startTime: "16:00", endTime: "16:15" }]
  }
}

var profiles = [{
  "Name": "Jack",
  "id": "27794733",
  "Specializations": [{ "field": "IT", "level": "advanced" },
  { "field": "Data Analytics", "level": "moderate" }],
  "calendarId": "jacks-calendar-1"
},
{
  "Name": "Jill",
  "id": "87394788",
  "Specializations": [{ "field": "Analysis", "level": "advanced" },
  { "field": "Development", "level": "moderate" }],
  "calendar-link": "jills-calendar-1"
},
{
  "Name": "Brian",
  "id": "83762453",
  "Specializations": [{ "field": "IT", "level": "advanced" },
  { "field": "Data Analytics", "level": "advanced" }],
  "calendar-link": "jills-calendar-1"
}]

localStorage.setItem('Profiles', JSON.stringify(profiles));
localStorage.setItem('Calendar', JSON.stringify(Calendar));


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



var wantsAdvice = false
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
    botMessage = "Based on people's availabilities right now and their expertise, I recommend that you ask: " + rec[0].name + "."
  }
  else if (userWantsHelp && (text.toLowerCase().includes("it") || text.toLowerCase().includes("technical") || text.toLowerCase().includes("tech support") || text.toLowerCase().includes("troubleshooting") || text.toLowerCase().includes("software"))) {
    const department = "IT"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have an " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now and their expertise, I recommend that you ask: " + rec[0].name + "."
  }
  else if (userWantsHelp && text.toLowerCase().includes("analysis") || text.toLowerCase().includes("key consumer")) {
    const department = "Analysis"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have an " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now and their expertise, I recommend that you ask: " + rec[0].name + "."
  }
  else if (userWantsHelp && text.toLowerCase().includes("data analytics") || text.toLowerCase().includes("trends") || text.toLowerCase().includes("pattern recognition")) {
    const department = "Data Analytics"
    const rec = getRecommendation(department)
    messageHelp = "Hi " + rec[0].name + "! \nI have a " + department + " issue. Could I ask you for some help?"
    askedForHelp = true
    botMessage = "Based on people's availabilities right now and their expertise, I recommend that you ask: " + rec[0].name + "."
  }
  else if (text.toLowerCase().includes("good morning") || text.toLowerCase().includes("morning") || text.toLowerCase().includes("hi") || text.toLowerCase().includes("hello")) {
    botMessage = "Hello! Your tasks for the day are on the right in the order that I recommend."
  }
  else if (text.toLowerCase().includes("task") && (text.toLowerCase().includes("new") || text.toLowerCase().includes("add") || text.toLowerCase().includes("create")))
  {
    text = text.split("task ")[1]
    addTask(text);
    numberTasksLeft += 1;
    document.getElementById("tasksLeft").innerHTML = numberTasksLeft;
    botMessage = "Great! New task added!"
  }
  else if (text.toLowerCase().includes("task") && (text.toLowerCase().includes("remove") || text.toLowerCase().includes("completed") || text.toLowerCase().includes("finished") || text.toLowerCase().includes("delete")))
  {
    botMessage = "Congratulations! One task less!"
    $(document.getElementById("task1button")).click()
    $(document.getElementById("task1")).css("text-decoration-line", "line-through")
  }
  else if (text.toLowerCase().includes("break"))
    botMessage = "You've earned it! I'll leave you alone for 15 minutes and then check back in!"
  else if (text.toLowerCase().includes("help")) {
    userWantsHelp = true
    botMessage = "Ask me your question and I'll point you in the right direction."
  }
  else if (text.toLowerCase().includes("commands"))
  {
    botMessage = "Based on what you ask me, I can create new tasks, mark them as completed, recommend someone to ask for help if you are stuck, and so much more..."
  }
  else botMessage = "I'm sorry but I'm not sure what that means. \nIs there something else I can help you with?"
}
function ScheduleProvider() {
  var available_people = []
  const today = new Date()
  const str_time = today.toJSON().toString().substring(11, 16)
  const str_day = today.toJSON().toString().substring(0, 10)
  for (var usr in Calendar) {
    for (var day in Calendar[usr]) {
      if (day === str_day) {
        for (var event in Calendar[usr][str_day]) {
          if (Date.parse("01/01/2011 " + Calendar[usr][str_day][0]["endTime"]) < Date.parse("01/01/2011 " + str_time) || (Date.parse("01/01/2011 " + Calendar[usr][str_day2][0]["startTime"]) > 90000 + Date.parse("01/01/2011 " + str_time))) {
            // available_people.push(usr);
            break;
          }
        }
      }
    }
  }
  response = ""
  if (available_people.length > 1) {
    response += "It seems like "
    for (var i = 0; i < available_people.length - 1; i++) {
      response += available_people[i] + ", "
    }
    response += "and " + available_people[available_people.length - 1] + " are available right now. Do you want to send one of them a message?"
  }
  if (available_people.length == 1) {
    response += "It seems like " + available_people[0] + " is available right now. Do you want to send them a message?"
  }
  if (available_people.length == 0) {
    response += "Unfortunately, it seems like no one is available right now... why not take a little coffee break to think it over?"
  }
  console.log(response);
  return response;
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
  var available_peers = []
  const devProfiles = JSON.parse(localStorage.getItem("Profiles")).map(profile => ({ name: profile.Name, special: profile.Specializations.map((special) => special.field) })).filter(mem => (mem.special.includes(field)))
  const today = new Date();
  const str_time = today.toJSON().toString().substring(11, 16)
  const str_day = today.toJSON().toString().substring(0, 10)
  var events = JSON.parse(localStorage.getItem("Calendar"))
  var i = 0
  while (i < devProfiles.length) {
    var usr = devProfiles[i]
    if (events[usr.name])
    {  
      var usr_events = events[usr.name][str_day]
      //var usr_events = events[usr["name"]][str_day]
      var available = true;

      var j = 0
      while (j < usr_events.length) {
        var event = usr_events[j]
        if ((Date.parse("01/01/2011 " + event["endTime"]) >= Date.parse("01/01/2011 " + str_time)) && (Date.parse("01/01/2011 " + event["startTime"]) <= 90000 + Date.parse("01/01/2011 " + str_time))) {
          available = false;
        }
        j++
      }
      if (available) {
        available_peers.push(usr);
      }

    }
    i++
  }
  //const filtered = devProfiles.filter(value => available_peers.includes(value));

  return available_peers
}

function addTask(word) {
  document.getElementById('taskList').innerHTML += ('<div class="d-flex align-items-center"><label><input onclick = "UpdatePercentage()" type="checkbox" class="option-input radio"><span class="label-text">' + word + '</span></label></div>');
}