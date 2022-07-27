(function () {
    "use-strict"

    $(document).ready(function () {
        var timeInterval = 250, pos = 0, frameSeparation = "=====\n";
        var currentFrame, originalFrame, animInterval;

        $("#stop").prop("disabled", true);

        if ($("#start").is(":enabled")) {
            $("#turbo-check").prop('disabled', true)
        }

        $("#start").click(function () {
            if ($("#txt-input").val()) {
                var frame = $("#txt-input").val();
                $("#stop").prop("disabled", false);
                $("#start").prop("disabled", true)
                $("#anim").prop("disabled", true);
                $("#turbo-check").prop('disabled', false)
                var isChecked = $("#turbo-check").is(':checked')
                clearInterval(animInterval)
                animateAscii(frame, isChecked ? 50 : 250);
            } else {
                alert("Animation is blank, please select one of them")
            }
        })

        $("#stop").click(function () {
            clearInterval(animInterval)
            pos = 0;
            $("#txt-input").val(originalFrame)
            $("#stop").prop("disabled", true);
            $("#start").prop("disabled", false)
            $("#anim").prop("disabled", false);
            $("#turbo-check").prop('disabled', true)
            $("#turbo-check").prop('checked', false)
        })

        $("#anim").change(function () {
            $("#txt-input").val(ANIMATIONS[$(this).val()])
            originalFrame = ANIMATIONS[$(this).val()]
        })

        $("#size").change(function () {
            $("#txt-input").css("font-size", $(this).val() + "")
        })

        $("#turbo-check").change(function () {
            var isChecked = $("#turbo-check").is(':checked')
            timeInterval = isChecked ? 50 : 250;
            if ($("#start").is(":disabled")) {
                clearInterval(animInterval)
                animateAscii(originalFrame, timeInterval)
            } else {
                alert("Please start the animation to change it to Turbo mode")
            }
        })

        function animateAscii(cFrame, time) {
            currentFrame = cFrame.split(frameSeparation);
            animInterval = setInterval(function () {
                console.log(timeInterval);
                if (pos === currentFrame.length) {
                    pos = 0;
                }
                $("#txt-input").val(currentFrame[pos]);
                pos++;

            }, time);
        }
    });
})();
