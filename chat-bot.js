//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


var messages = [], //array that hold the record of each string in chat
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
  talking = true;
  botMessage = "I'm confused"; //the default message

  if (lastUserMessage.toLowerCase() === 'hi' || lastUserMessage.toLowerCase() == 'hello') {
    const hi = ['hi', 'howdy', 'hello']
    botMessage = hi[Math.floor(Math.random() * (hi.length))];;
  }

  if (lastUserMessage === 'name') {
    botMessage = 'My name is ' + botName;
  }
  if (lastUserMessage === 'help') {
    botMessage = ScheduleProvider();
    botMessage = ScheduleProvider()
  }
  console.log(botMessage);
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
  if (available_people.length>1) {
    response += "It seems like "
    for (var i = 0; i< available_people.length - 1; i++) {
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