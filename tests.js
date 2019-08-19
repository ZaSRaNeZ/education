// Кнопка "назад"

var menuButtons = $('.menu.fl-l').find('a.fl-l');
var ElIndex = 0;

$('<style>#modalEducation {display:none;position: absolute;z-index: 1000;min-height: 150px;background: #fff;border-radius: 5px;box-shadow: 0 0 10px #d0d6ff; transition: all 0.4s ease 0s; min-width: 300px; max-width: 600px;}#EducationButtons{position: absolute;bottom: -35px;width: 100%;height: 30px;display: flex;justify-content: space-between;}div#endEducation, div#next {height: 30px;line-height: 22px;width: 50%;text-align: center;padding: 4px;box-sizing: border-box;color: #fff; cursor: pointer;}div#endEducation{border-radius: 5px 0 0 5px;border: 1px solid #f78a8a91;color: #f78a8a;border-right: none;}div#next{border: 1px solid #8bc34a85;border-radius: 0 5px 5px 0;color: #8bc34a;border-left:none;}div#endEducation:hover{background: #f78a8a;color: #fff;}div#next:hover{background:#8bc34a;color:#fff;}div#modalEducationText{margin: 12px;} div#modalEducationText img {max-width: 100%;margin-top: 40px;} div#modalEducation_start {position: absolute;top: calc(50% - 200px);left: calc(50% - 300px);z-index: 1000;min-height: 150px;background: #fff;border-radius: 5px;box-shadow: 0 0 10px #6ec4ff;width: 600px;height: 400px;}.startButtons {width: 100%;padding: 10px;box-sizing: border-box;display: flex;justify-content: space-around;}.start_button {width: 45%;height: 80px;line-height: 80px;text-align: center;border: 2px solid #1a8ad8;border-radius: 5px;cursor: pointer;user-select: none;font-size: 24px;color: #1a8ad8; transition: 0.2s all;}.startText{text-align: center;padding:40px; font-size: 1.2rem;}.startText>p{color: #1d1d1d;}.startText>h2{color: #1a8ad8;} .start_button:hover {color: #fff;background: #1a8ad8;}</style>').appendTo('body');

$('<div id="modalEducation"><div id="modalEducationText"></div><div id="EducationButtons"><div id="endEducation">Завершить</div><div id="next">Продолжить</div></div></div>').appendTo('body');

$('<div id="modalEducation_start"><div class="startText"><h2>Привет!</h2><p>Давай научимся работать с админкой =) </p></div><div class="startButtons"><div class="start_button" id="continue"> Продолжить </div><div class="start_button" id="new">Начать заново</div></div></div>').appendTo('body');

// Вся инфа переганяеться из google таблицы в моем google disk  EDUCATION_SCRIPT

if (localStorage.getItem('ElIndex') === null) {
    $("#continue").css({
        'filter': 'grayscale(100%)',
        'pointer-events': 'none'
    })
}

const text = (function() {
    var app = "https://script.google.com/macros/s/AKfycbzudkuxqqQoKn2Pp9ybnkcm_5IasX5AOichiAeWYi90J-8hJEQ/exec",
        output = {},
        xhr = new XMLHttpRequest();
    xhr.open('GET', app);
    xhr.onerror = function() {
        alert('Не удалсоь загрузить инфу с таблицы');
        window.location.reload();
    };
    xhr.onreadystatechange = function() {

        if (xhr.readyState !== 4) return;

        if (xhr.status == 200) {
            try {
                var r = JSON.parse(xhr.responseText),
                    result = r["result"];
                for (var i = 0; i < result.length; i++) {
                    var obj = r["result"][i];

                    output[obj[0]] = obj[1];
                    if (i == result.length - 1) output['LoadCheck'] = true;
                }
            } catch (e) {}
        }
    }
    xhr.send()
    return output;
})();

function Education() {
    if (ElIndex >= menuButtons.length) {
        alert("that`s all");
    }

    $(menuButtons[ElIndex]).css({
        'position': 'relative',
        'z-index': '1000',
        'background-color': '#6d6d6d',
        'display': 'block'
    });
    $('#modal-overlay').css('display', 'block');
    var modalTop = menuButtons[ElIndex].getBoundingClientRect().bottom + window.pageYOffset;
    var modalLeft = menuButtons[ElIndex].getBoundingClientRect().left + window.pageXOffset;

    // изменение текста внутри блока

    $('#modalEducationText').html(text[menuButtons[ElIndex].innerText]);
    let righDistance = document.documentElement.clientWidth - (modalLeft + $('#modalEducation').width());
    console.log(righDistance);

    if (righDistance < 0) {
        $('#modalEducation').css({

            'top': modalTop + 10 + 'px',
            'left': modalLeft + righDistance - 10 + 'px',
        });
    } else {

        $('#modalEducation').css({

            'top': modalTop + 10 + 'px',
            'left': modalLeft + 10 + 'px',
        });

    };
    localStorage.setItem('ElIndex', ElIndex);

};

$('div#modal-overlay').css({

    'display': 'block',
    'background': 'no-repeat center center url(https://i.pinimg.com/originals/9b/53/d4/9b53d4eaf1ffb58eca857738ea925fbb.gif) rgba(0, 0, 0, 0.7)',
})

function StartEducation() {

    let LoadTimer = setInterval(function() {

        if (text['LoadCheck']) {
            $('div#modal-overlay').removeAttr('style');
            $('#modalEducation').css('display', 'block');

            Education();
            clearInterval(LoadTimer);
        }
        return;


    }, 500);
}

$('#continue').click(function() {
    $('#modalEducation_start').css('display', 'none');
    ElIndex = localStorage.getItem('ElIndex');

    StartEducation();

})
$('#new').click(function() {
    $('#modalEducation_start').css('display', 'none');
    ElIndex = 0;

    StartEducation();

})




$('#next').click(function() {

    $(menuButtons[ElIndex]).removeAttr('style');
    ElIndex++;
    Education(ElIndex);

});


// для кнопки "назад" 

$('#back').click(function() {

    $(menuButtons[ElIndex]).removeAttr('style');
    ElIndex--;
    Education(ElIndex);

});

$('#endEducation').click(function() {

    window.location.reload();

});