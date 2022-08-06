
$(document).ready(() => {
    $("#date").attr('max', new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]);
    $("#viewBtn").click(apodPicture);


});

const apodPicture = () => {
    let inputDate = $("#date").val();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=iAzyoMtYrPv6u89G3sRRkKvLciFNhUWUPXoJoGdg&date=${inputDate}`)
        .then((response) => response.json())
        .then(data => {
            console.log("data ", data);
            $("#pic").attr("src", data.url);
            $("#pic-title").text(data.title);
            $("#pic-desc").text(data.explanation);
        }).catch(e => {
            console.log("error ", e);
        });
}

//==========================================================
// Need to debug this code why async and await not working
//==========================================================
// const apodPicture = async () => {
//     let inputDate = $("#date").val();
//     const apodResponse =  fetch(`https://api.nasa.gov/planetary/apod?api_key=iAzyoMtYrPv6u89G3sRRkKvLciFNhUWUPXoJoGdg&date=${inputDate}`);
//     const apod = await apodResponse.json();
//     return apod;
// };

// apodPicture()
//     .then(data => {
//         console.log("data ", data);
//         $("#pic").attr("src", data.url);
//         $("#pic-title").text(data.title);
//         $("#pic-desc").text(data.explanation);
//     }).catch(e => console.log(e));
//==========================================================