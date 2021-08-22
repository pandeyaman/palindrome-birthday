const birthDate = document.getElementById('birthDate');
const btnCheck = document.querySelector('.btn-check');
const remark = document.querySelector('.span-remark');
const missByDays = document.querySelector('.span-missDays');
const img = document.querySelector('.img-loading');

const clickHandler = (date)=>{

    let isPalindrome = checkPalindrome(date);
    let [isTrue,dateFormats] = [...isPalindrome];
    img.style.display = "none";
    if(isTrue){
        console.log("Palindrome");
        remark.style.display = "inline-block";
        remark.textContent = "Yay ! Your birthdate is a Palindrom when in format: "+dateFormats;
    }
    else{
        console.log("Is not a Palindrome");
        remark.style.display = "inline-block";
        remark.textContent = "Oops ! Your birthdate is not a Palindrome in any of the formats!";
        checkforMissedDays(date);
    }
}


function checkforMissedDays(date){
    let dayCounter = 0;
    let nextDayFormatted;
    let isTrue = false;
    while(!isTrue){
        let nextDay = calculateNextDay(date); 
        nextDayFormatted = formatNextDate(nextDay);
        dayCounter++;
        [isTrue,dateFormats] = checkPalindrome(nextDayFormatted);
        date = nextDayFormatted;
    }
    missByDays.style.display = "inline-block";
    missByDays.textContent = `You missed by ${dayCounter} days. The next palindrome date is ${nextDayFormatted}`;
}


const checkPalindrome = (inputDate) =>{
    const date = new Date(inputDate);
    let dateBreakDownArray = changeFormatToString(date);
    let day = dateBreakDownArray[0];
    let month = dateBreakDownArray[1];
    let fullYear = dateBreakDownArray[2];
    
    const dateArray = getDateinAllFormats(day,month,fullYear);
    const isPalindrome = reverseAndCheck(dateArray);
    console.log(isPalindrome)
    return isPalindrome;
    // if(isTrue){
    //     console.log("Palindrome");
    //     remark.textContent = "Yay ! Your birthdate is a Palindrom when in format: "+dateFormats;
    // }  
    // else
    // {
    //     console.log("Is not a Palindrome");
    //     remark.textContent = "Oops ! Your birthdate is not a Palindrome in any of the formats!";
    //     let nextDay = calculateNextDay(date); 
    //     let nextDayFormatted = ch(nextDay);
    //     console.log("Next date is : "+nextDayFormatted);
    //     checkPalindrome(nextDayFormatted);
    // } 
}

function changeFormatToString(date){
    let day = date.getDate();
    let month = date.getMonth()+1;
    let fullYear = date.getFullYear();
    if(day<10)
        day = "0" + day 
    if(month<10)
        month = "0" + month;
    return [day,month,fullYear]
}

function formatNextDate(date){
    let day = date.getDate();
    let month = date.getMonth()+1;
    let fullYear = date.getFullYear();
    if(day<10)
        day = "0" + day 
    if(month<10)
        month = "0" + month;
    let x = ""+fullYear+"-"+month+"-"+day;
    return x;
}


function calculateNextDay(date){
    let formattedDate = date.toLocaleString('en-GB',{
        year: 'numeric',
        day:'numeric',
        month: 'numeric',
    });
    const dateParts = date.split("-");
    let nextDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
}


function reverseAndCheck(dateArray){
let bool = false;
let plaindromrFormatDate = [];
    dateArray.forEach((date)=>{
        let reversedDate = reverseDate(date);
        if(reversedDate == date){
            bool = true;
            plaindromrFormatDate.push(date);
        }
    });
    return [bool,plaindromrFormatDate];
}

function reverseDate(currentDate){
   return currentDate.split("").reverse().join("");
}


function getDateinAllFormats(dd,mm,yyyy){
    let ddmmyyyy = ""+dd+mm+yyyy
    let mmddyyyy = ""+mm+dd+yyyy
    let yyyymmdd = ""+yyyy+mm+dd
    let ddmmyy = ""+dd+mm+yyyy.toString().slice(-2);
    let mmddyy = ""+mm+dd+yyyy.toString().slice(-2); 
    let yymmdd = ""+yyyy.toString().slice(-2)+mm+dd;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}


btnCheck.addEventListener('click',()=>{
    remark.style.display = "none";
    missByDays.style.display = "none";
    if(birthDate.value == ""){
        remark.style.display = "inline-block";
        remark.textContent = "Please enter your birthdate to continue.";
    }
    else{
        img.style.display = "block";
        setTimeout(()=>{
            clickHandler(birthDate.value);
        },3000)
    }
    
});