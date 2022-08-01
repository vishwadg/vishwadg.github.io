(function () {
    $(document).ready(function () {
        let isStarted = false;
        let isFinished = false;
        let isLoosed = false;

        $("#start").click(function () {
            isStarted = true;
            isFinished = false;
            $('#status').text("Game started, do not touch boundary !!");
            if (isLoosed) {
                $(".boundary").removeClass("youlose");
                $('#status').text('Click the "S" to begin.');
                isStarted = false;
                isLoosed = false;
            }
        })

        $("#end").click(function () {
            if (isStarted) {
                isFinished = true;
                isStarted = false;
                $('#status').text("You win :)");
            }
        })

        $(".boundary").mouseover(function () {
            showRedAlert();
        });

        $("#maze").mouseleave(function () {
            showRedAlert()
        });

        function showRedAlert() {
            if (isStarted) {
                isLoosed = true;
                isStarted = false;
                $(".boundary").addClass("youlose");
                $('#status').text("Sorry, you lost :(. Click 'S' to reset");
            }
        }
    })
})();
