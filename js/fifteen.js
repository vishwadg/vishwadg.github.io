(function () {
    let currentDiv;
    let empty = 'empty';

    $(document).ready(() => {
        foundation();
    })

    const foundation = () => {
        $('#shufflebutton').click(() => {
            shufflePuzzSquare();
        });

        let puzzleArea = $('#puzzlearea')[0];
        let divs = puzzleArea.getElementsByTagName("div");

        for (let i = 0; i < divs.length; i++) {
            let div = divs[i];

            let x = ((i % 4) * 100);
            let y = (Math.floor(i / 4) * 100);

            div.className = "puzzlepiece";
            div.id = i;
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';

            div.onmouseover = onHoverPuzzSquare;
            div.onmouseout = onMouseOutPuzzSquare;
            div.onclick = onPuzzSquareClick;

            div.x = x;
            div.y = y;
        }
    }

    const shufflePuzzSquare = () => {
        let index = 0;
        let latNum = 0;
        let count = 0;

        if ($('#empty').val() === undefined) {
            appendPuzzSquare();
        }

        while (count < 200) {
            let sideSquares = [];
            let divVal = parseInt($('#empty').val());

            let leftId = divVal - 1;
            let rightId = divVal + 1;
            let topId = divVal - 4;
            let bottomId = divVal + 4;

            let leftPuzz = (isInRange(leftId)) && $('#' + leftId).css('left');
            let rightPuzz = (isInRange(rightId)) && $('#' + rightId).css('left');
            let topPuzz = (isInRange(topId)) && $('#' + topId).css('top');
            let bottomPuzz = (isInRange(bottomId)) && $('#' + bottomId).css('top');

            if (divVal == 4 || divVal == 8 || divVal == 12 || divVal == 0) {
                leftPuzz = undefined;
            }

            if (divVal == 3 || divVal == 7 || divVal == 11 || divVal == 15) {
                rightPuzz = undefined;
            }

            if (divVal == 0 || divVal == 1 || divVal == 2 || divVal == 3) {
                topPuzz = undefined;
            }

            if (divVal == 12 || divVal == 13 || divVal == 14 || divVal == 15) {
                bottomPuzz = undefined;
            }

            if (leftPuzz) {
                sideSquares.push(leftId);
            }

            if (rightPuzz) {
                sideSquares.push(rightId);
            }

            if (bottomPuzz) {
                sideSquares.push(bottomId);
            }

            if (topPuzz) {
                sideSquares.push(topId);
            }

            index = randNum(sideSquares.length, latNum);
            let emptyId = $('#empty').val();
            let currentDiv = sideSquares[parseInt(index) - 1];
            $('#empty').val(currentDiv);
            $('#' + currentDiv).attr('id', emptyId);

            swapPuzzles('empty', emptyId);
            sideSquares.length = 0;
            latNum = index;
            count++;
        }
    }

    const isInRange = (num) => {
        if (num >= 0 && num <= 15) {
            return true;
        }
        return false;
    }

    const randNum = (max, lastNum) => {
        let num = Math.floor((Math.random() * parseInt(max)) + 1);
        while (true) {
            num = Math.floor((Math.random() * parseInt(max)) + 1);
            if (lastNum != num) {
                break;
            }
        }
        return num;
    }

    function onHoverPuzzSquare() {
        let emptyX = parseInt($('#empty').css('left'));
        let emptyY = parseInt($('#empty').css('top'));

        let currentX = parseInt($(this).css('left'));
        let currentY = parseInt($(this).css('top'));

        if (currentX == (emptyX - 100) && (currentY == emptyY)) {
            $(this).toggleClass('movablepiece');
        }
        if (currentX == (emptyX + 100) && (currentY == emptyY)) {
            $(this).toggleClass('movablepiece');
        }
        if (currentY == (emptyY - 100) && (currentX == emptyX)) {
            $(this).toggleClass('movablepiece');
        }
        if (currentY == (emptyY + 100) && (currentX == emptyX)) {
            $(this).toggleClass('movablepiece');
        }
    }

    function onPuzzSquareClick() {
        let emptyX = parseInt($('#empty').css('left'));
        let emptyY = parseInt($('#empty').css('top'));

        let currentX = parseInt($(this).css('left'));
        let currentY = parseInt($(this).css('top'));

        if (!$('#empty').length) {
            alert('Click Shuffle button to start playing');
        }

        if ((currentX == (emptyX - 100)) && (currentY == emptyY)) {
            $('#empty').value = $(this).attr('id');
            $(this).attr('id', parseInt($(this).attr('id')) + 1);
            currentDiv = $(this).attr('id');
            swapPuzzles('empty', currentDiv);
        }

        if ((currentX == (emptyX + 100)) && (currentY == emptyY)) {
            $('#empty').value = $(this).attr('id');
            $(this).attr('id', parseInt($(this).attr('id')) - 1);
            currentDiv = $(this).attr('id');
            swapPuzzles('empty', currentDiv);
        }

        if ((currentY == (emptyY - 100)) && (currentX == emptyX)) {
            $('#empty').value = $(this).attr('id');
            $(this).attr('id', parseInt($(this).attr('id')) + 4);
            currentDiv = $(this).attr('id');
            swapPuzzles('empty', currentDiv);
        }

        if ((currentY == (emptyY + 100)) && (currentX == emptyX)) {
            $('#empty').value = $(this).attr('id');
            $(this).attr('id', parseInt($(this).attr('id')) - 4);
            currentDiv = $(this).attr('id');
            swapPuzzles('empty', currentDiv);
        }
    }

    function swapPuzzles(emptyId, fillId) {
        let emptyX = $('#' + emptyId).css('left');
        let emptyY = $('#' + emptyId).css('top');

        let currentX = $('#' + fillId).css('left');
        let currentY = $('#' + fillId).css('top');

        $('#' + emptyId).css({ 'left': currentX, 'top': currentY });
        $('#' + fillId).css({ 'left': emptyX, 'top': emptyY })
    }

    function onMouseOutPuzzSquare() {
        this.className = this.className.replace('movablepiece', '');
    }

    const appendPuzzSquare = () => {
        let puzz = document.createElement('div');
        puzz.id = 'empty';
        $('#puzzlearea').append(puzz);
        $('#empty').val('15');
        $('#empty').css({ 'left': '300px', 'top': '300px' })
    }

})();