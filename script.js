
// //set top time to element
const currentdate = new Date();
const yyyy = currentdate.getFullYear();
let mm = currentdate.getMonth() + 1; // Months start at 0!
let dd = currentdate.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const today = dd + '/' + mm + '/' + yyyy;
document.getElementById("currentDay").innerHTML = today;

//Set Color for row based on past present future
const row = document.getElementsByClassName("row");
let currentHour = parseInt(moment().format('H'));

function setColor(element, color) {
    element.style.backgroundColor = color;
  }
function settimecolor() {
Array.from(row).forEach(row => {
  let rowHour = parseInt(row.id);
  if (rowHour) {
    // compares row id to time to set color
    if (currentHour === rowHour) {
      setColor(row, "red");
    } else if ((currentHour < rowHour) ) {
      setColor(row, "green");
    } else if ((currentHour > rowHour) ) {
      setColor(row, "lightgrey");
    } else {
      setColor(row, "white");
    }
  }
  console.log("colors refreshed")
})
};



//Additionally, re-call function every 10 minutes

window.onload = function () {
    settimecolor(); //call page every 10 minutes 
    setInterval(settimecolor, 60000); //Then set it to run again after interval
}

//add event listener to body listening to clicks on tasks class
$('body').on('click', '.tasks', function(){
  
//log clicked element properties
    var $el = $(this);
    console.log($el.text());

// replace div with input 
    var $input = $('<input id = "input" class = "tasks col-9 d-flex flex-column" />').val( $el.text() );
    $el.replaceWith( $input );

//save new input values into replacement div
    var save = function(){
      var $p = $('<div class = "tasks col-9 d-flex flex-column" />').text( $input.val() );
      $input.replaceWith( $p );

    console.log("task clicked");
    };
    
//on clicking elsewhere save the div and focus
    $input.on('blur', save).focus();
    $input.on('keypress',function(e){
        if(e.which == 13) {
            save();
        }
    });
});


//local storage tasks 
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

//add event listener to listen for Save button clicks
$('body').on('click', '.saveBtn', function(){
    var task = (this.previousElementSibling.innerHTML);
    var rowid = (this.parentElement.id);
    localStorage.setObj(rowid,task)
});

//grab innerhtml from localstorage
function restoretasks() {
  $(".row").each( function() {

    let hour = $(this).attr("id")
    console.log(hour)
    let storedStuff = localStorage.getObj(hour)
    // compares row id to time to set color
    if (storedStuff) {
      //fill in function for replacement here 
      $(this).children(".tasks").text(storedStuff)
    } 
  console.log("tasks restored")
  })
};

restoretasks();


