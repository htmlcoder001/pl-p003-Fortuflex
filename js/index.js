const months=['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'],monthMin = ['','','','','','','','','','','',''],days = ['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'],daysMin = ['','','','','','',''],seasons = ['zima','wiosna','lato','jesień'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","monthFull","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, monthFull: getMonthName(_month, monthsName, false), year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getMonthName(_month, monthsName, bigFirstLetter, counter) { const monthCounter = !!counter ? counter : 0; let month; _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter; _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter; return changeFirstLetter(bigFirstLetter, monthsName[month - 1]) } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}

let doors = document.querySelectorAll(".door");
let doorSales = document.querySelectorAll(".door__sales");
let doorWrapper = document.querySelector(".door__wrapper");
let spinResultWrapper = document.querySelector(".spin-result-wrapper");
let orderBlock = document.querySelector("#order");
let door1 = document.getElementById("door__1");
let door2 = document.getElementById("door__2");
let door3 = document.getElementById("door__3");
let doorSale1 = document.getElementById("door__sales1");
let doorSale2 = document.getElementById("door__sales2");
let doorSale3 = document.getElementById("door__sales3");
let discount = "50%";
doors.forEach(function (door) {
 door.addEventListener("click", openDoor);
});
var closePopup = document.querySelector(".close-popup");
$(".pop-up-button").click(function (a) {
 a.preventDefault();
 $(".spin-result-wrapper").fadeOut();
});
$(".close-popup, .pop-up-button").click(function (a) {
 a.preventDefault();
 $(".spin-result-wrapper").fadeOut();
});
function openDoor(e) {
 e.currentTarget.classList.add("open");
 setTimeout(function () {
  spinResultWrapper.style.display = "block";
  setTimeout(function () {
   orderBlock.style.display = "block";
   doorWrapper.style.display = "none";
   document.querySelector(".door__head").style.display = "none";
   start_timer && start_timer();
  }, 3500);
 }, 1500);
 doorSales.forEach(function (sale) {
  if (door1.classList.contains("open")) {
   doorSale1.innerHTML = discount;
   doorSale2.innerHTML = discount === "50%" ? "25%" : "15%";
   doorSale3.innerHTML = discount === "50%" ? "10%" : "25%";
  } else if (door2.classList.contains("open")) {
   doorSale2.innerHTML = discount;
   doorSale1.innerHTML = discount === "50%" ? "10%" : "25%";
   doorSale3.innerHTML = discount === "50%" ? "25%" : "15%";
  } else if (door3.classList.contains("open")) {
   doorSale1.innerHTML = discount === "50%" ? "25%" : "15%";
   doorSale3.innerHTML = discount;
   doorSale2.innerHTML = discount === "50%" ? "10%" : "25%";
  }
 });
 for (let i = 0; i < doors.length; i++) {
  if (!doors[i].classList.contains("open")) {
   setTimeout(function () {
    doors[i].classList.add("open");
   }, 2500);
   $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 70
        }, 1000);
    });
  }
 }
 for (let j = 0; j < doors.length; j++) {
  doors[j].removeEventListener("click", openDoor);
 }
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    var targetOffset = $($.attr(this, 'href')).offset().top;
    var offsetValue;

    if ($(window).width() <= 407) {
        offsetValue = 0
    }

    else if ($(window).width() > 407 && $(window).width() <= 1023) {
        offsetValue = 20
    } else offsetValue = 30

    $('html, body').animate({
        scrollTop: targetOffset - offsetValue
    }, 1000);
});

var time = 1520;
var intr;
function start_timer() {
 intr = setInterval(tick, 1000);
}
function tick() {
 time = time - 1;
 var mins = Math.floor(time / 60);
 var secs = time - mins * 60;
 if (mins == 0 && secs == 0) {
  clearInterval(intr);
 }
 secs = secs >= 10 ? secs : "0" + secs;
 mins = mins >= 10 ? mins : "0" + mins;
 $("#min").html(mins);
 $("#sec").html(secs);
}
