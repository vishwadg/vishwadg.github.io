const calculateTip = function () {
    var subTotal = document.getElementById("sub-total").value
    var tip = document.getElementById("tip").value
    var total = document.getElementById("total");

    if (subTotal <= 0 || tip <= 0) {
        window.alert("Subtotal/tip value can not be zero or negative")
    } else {
        var tot = subTotal * ((1 + (tip / 100.0)))
        total.innerHTML = tot.toFixed(2)
    }
}