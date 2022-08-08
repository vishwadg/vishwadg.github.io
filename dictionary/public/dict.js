$(document).ready(function () {
    let pText;
    let content;

    $('#btn-lookup').click(function () {
        let uInput = $('#uinput').val();
        if (uInput) {
            $('.output').empty();
            $.ajax({
                url: `/lookup`,
                type: 'get',
                data: {
                    uInput: uInput
                },
                dataType: "json",
                "success": fetchDictData,
                "error": noDictData
            });
        } else {
            alert('Please enter value for lookup!!')
        }
    })

    function fetchDictData(data) {
        if (data.length > 0) {
            data.forEach((ele, ind) => {
                pText = $("<p></p>");
                content = ind + 1 + "(" + ele?.wordtype + ")" + " :: " + ele.definition;
                pText.text(content);
                $('.output').append(pText);
            });
        } else {
            $('.output').append('<p>No data found!!</p>');
        }
    }

    function noDictData(error) {
        console.log(error);
        $('.output').append('<p>No data found!!</p>');
    }
})