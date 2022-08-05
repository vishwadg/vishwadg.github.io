(function () {
    $(document).ready(() => {
        $("#date").attr('max', new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]);
        $("#viewBtn").click(getPicture);
    });

    const getPicture = () => {
        $.ajax({
            url: "https://api.nasa.gov/planetary/apod?api_key=iAzyoMtYrPv6u89G3sRRkKvLciFNhUWUPXoJoGdg",
            type: "GET",
            data: {
                api_key: "DEMO_KEY",
                date: $("#date").val()
            },
            dataType: "json",
            "success": showPicture,
            "error": noPicture
        });
    };

    const showPicture = (data) => {
        console.log(JSON.stringify(data));
        $("#pic").attr("src", data.url);
        $("#pic-title").text(data.title);
        $("#pic-desc").text(data.explanation)
    };

    const noPicture = (error) => {
        console.log(JSON.stringify(error));
        alert(error.responseText);
    };

})();
