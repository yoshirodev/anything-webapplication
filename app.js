let nameInput = document.getElementById("nameTextid").value;
let isNamed = false;
let nameVar;

// Alpha Body
function OnClick(){
    let bocchi = document.querySelector('#SObjectid');
    let header1 = document.getElementById('Sheader1');
    let num1 = 0;

    header1.textContent = num1;
    num1 + 1;

    if(num1 == 3){
        num1 = 0;
    }

    switch(num1){
        default:
        case num1 = 1:
            bocchi.style.left = "1100px";
            break;
        case num1 = 2:
            bocchi.style.top = "700px";
            break;
        case num1 = 3:
            bocchi.style.left = "10px";
            break;
        case num1 = 3:
            bocchi.style.top = "10px";
            break;
    }
}

// Beta Body
function MiniTextBot() {
    let inputBox = document.getElementById("inputText").value;
    let nameInpuBox = document.getElementById("nameInputBox");
    let buttonShow = document.querySelector('#linkid1');
    let text;

    let randomGreet = ["Hello", "Hi", "Greetings", "Sup", "Yo"];


    switch(inputBox){
        case inputBox = "Hello":
            text = randomGreet[Math.floor(Math.random()*randomGreet.length)];
            break;
        case inputBox = "What is your name?":
            if(!isNamed){
                text = "I don't have a name yet. create one for me :)";
            }else{
                text = "My Name is " + nameVar;
            }

            nameInpuBox.style.left = "30%";
            break;
        case inputBox = "How are you?":
            text = "I'm good, how about you? :)";
            break;
        case inputBox = "":
            alert("say something, don't be shy")
            text = "say something";
            break;
        case inputBox = "01195":
            text = "tap this link";
            buttonShow.style.left = "30%";
            break;
        default:
            text = "i don't know that word yet or maybe your missing something";
    }
    document.getElementById("appheaderid").innerHTML = text;
}

function NameValue(){
    if(nameInput.value !== null) {
        isNamed = true;
        nameVar = nameInput.ToString();
    }else{
        isNamed = false;
    }
    document.getElementById("nameHeader").innerHTML = "Name: " + nameVar;
}

// Gamma Body

function TestFunction(){
    let data = require('./data.json');

    alert(data);
}
