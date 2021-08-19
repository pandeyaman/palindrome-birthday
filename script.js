const birthDate = document.getElementById('birthDate');
const btnCheck = document.querySelector('.btn-check');
const remark = document.querySelector('.span-remark');

const checkPalindrome = () =>{
    const date = new Date(birthDate.value);
    let day = date.getDate();
    let month = date.getMonth()+1;
    let fullYear = date.getFullYear();

    if(day<10){
        day = "0" + day 
    }
    if(month<10)
        month = "0" + month;
    
    const dateArray = getDateinAllFormats(day,month,fullYear);
    const isPalindrome = reverseAndCheck(dateArray);
    console.log(isPalindrome)
    let [isTrue,dateFormats] = [...isPalindrome];
    
    if(isTrue){
        console.log("Palindrome");
        remark.textContent = "Yay ! Your birthdate is a Palindrom when in format: "+dateFormats;
    }  
    else
    {
        console.log("Is not a Palindrome");
        remark.textContent = "Oops ! Your birthdate is not a Palindrome in any of the formats!";
    }
    
    
    
}

function reverseAndCheck(dateArray){
let bool = false;
let plaindromrFormatDate = [];
    dateArray.forEach((date)=>{
        let reversedDate = reverseDate(date);
        // console.log("date is "+date+" reverse "+reversedDate)
        // console.log(date == reversedDate)
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






btnCheck.addEventListener('click',checkPalindrome);