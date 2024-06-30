 // ----- [공통] 첫 번째 타이핑 효과 => 웹 개발자 -----
var isTypingJob = false;
var typingIdxJob = 0;
var tyIntJob;

 // #typing 할 텍스트 가지고 오기
 var typingTxtJob = document.querySelector('.job').innerText;  
 
 // #텍스트 한글자씩 자르기
 typingTxtJob = typingTxtJob.split(''); 

 // #typing 함수 만들기
 function typeTextJob() {
    if (typingIdxJob < typingTxtJob.length) {
        document.querySelector('.job-typing').innerText += typingTxtJob[typingIdxJob];
        typingIdxJob++;
    } else {
        clearInterval(tyIntJob);
        isTypingJob = false;
    }
};

// #typing이 진행되지 않으면 typing 실행함
setTimeout(() => {
    if (isTypingJob == false) {
        isTypingJob = true;
        tyIntJob = setInterval(typeTextJob, 100);
    }
}, 200);

// ----- [공통] bracket 나타나게 하기 -----
setTimeout(() => {
    document.querySelector('.highlight').classList.add('highlight-visible');
}, 500)

// ----- [공통] 두 번째 타이핑 효과 => 문정해 -----
var isTypingName = false;
var typingIdxName = 0;
var tyIntName; 

// #typing 할 텍스트 가지고 오기
var typingTxtName = document.querySelector('.name').innerText;  
 
// #텍스트 한글자씩 자르기
typingTxtName = typingTxtName.split(''); 

// #typing 함수 만들기
function typeTextName() {
   if (typingIdxName < typingTxtName.length) {
       document.querySelector('.name-typing').innerText += typingTxtName[typingIdxName];
       typingIdxName++;
   } else {
       clearInterval(tyIntName);
       isTypingName = false;
   }

// #typing이 진행되지 않으면 typing 실행함
setTimeout(() => {
    if (isTypingName == false) {
        isTypingName = true;
        tyIntName = setInterval(typeTextName, 100);
    }
}, 1100);
};