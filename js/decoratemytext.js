window.onload = function () {
    document.getElementById("text-area1").style.fontSize = "12pt";
    let bigBtn = document.getElementById('big-btn');
    bigBtn.onclick = increaseFont;

    let bling = document.getElementById('blin-check');
    bling.onchange = onChangeBling;

    let igpay = document.getElementById('btn-igpay');
    igpay.onclick = onIgpayClick;

    let malko = document.getElementById('btn-malko');
    malko.onclick = onMalcoClick;

    let clearIgPay = document.getElementById('btn-clear-igpay')
    clearIgPay.onclick = onClearIgPayClick;

    let clearMalco = document.getElementById('btn-clear-malko')
    clearMalco.onclick = onClearMalcoClick;

}


function increaseFont() {
    setInterval(onIncreaseFont, 500)
}


function onIncreaseFont() {
    var size = parseInt(document.getElementById("text-area1").style.fontSize);
    size += 2;
    document.getElementById('text-area1').style.fontSize = size + "pt";
}


function onChangeBling() {
    // jQuery
    // var isChecked = $('#blin-check').prop('checked')

    var isChecked = document.getElementById('blin-check').checked;
    var textArea = document.getElementById('text-area1')
    console.log(isChecked);
    if (isChecked) {
        textArea.style.fontWeight = "bold"
        textArea.style.color = "green";
        textArea.style.textDecoration = "underline"
        document.body.style.backgroundImage = "url('https://courses.cs.washington.edu/courses/cse190m/12su/labs/6/hundred-dollar-bill.jpg')";

    } else {
        textArea.style.fontWeight = "normal"
        textArea.style.color = "black";
        textArea.style.textDecoration = "none"
        document.body.style.backgroundImage = "none"
    }
}


function onIgpayClick() {
    var igVal = document.getElementById('text-area-igpay');
    var conIgPayVal = document.getElementById('con-igpay');

    const word = igVal.value.split(" ").map(function (e, i, arr) {
        var ele = e.toLowerCase();
        var finalWord = "";
        if (ele[0] === 'a' || ele[0] === 'e' || ele[0] === 'i' || ele[0] === 'o' || ele[0] === 'u') {
            finalWord += " " + ele + 'ay'
        } else {
            finalWord += " " + ele.substr(1, ele.length) + ele.substr(0, 1) + 'ay'
        }
        return finalWord;
    }).reduce(function (preval, ele, i, arr) {
        return preval + ele
    })

    conIgPayVal.style.border = "1px solid lightsalmon"
    conIgPayVal.innerHTML = word;

}

function onMalcoClick() {
    var malcoVal = document.getElementById('text-area-malko');
    var conMalkoVal = document.getElementById('con-malko');

    const word = malcoVal.value.split(" ").map(function (e, i, arr) {
        var ele = e.toLowerCase();
        var finalWord = "";
        if (ele.length >= 5) {
            finalWord += " " + "Malkovich";
        } else {
            finalWord += " " + ele;
        }
        return finalWord;
    }).reduce(function (preval, ele, i, arr) {
        return preval + ele
    })

    conMalkoVal.style.border = "1px solid lightsalmon"
    conMalkoVal.innerHTML = word;
}

function onClearIgPayClick() {
    var igVal = document.getElementById('text-area-igpay');
    var conIgPayVal = document.getElementById('con-igpay');

    igVal.value = "";
    conIgPayVal.style.border = "none"
    conIgPayVal.innerHTML = "";
}


function onClearMalcoClick() {
    var malcoVal = document.getElementById('text-area-malko');
    var conMalkoVal = document.getElementById('con-malko');

    malcoVal.value = "";
    conMalkoVal.style.border = "none"
    conMalkoVal.innerHTML = "";
}