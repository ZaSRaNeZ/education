var menuButtons = $('a.fl-l');
var ElIndex = 0;

$('<style>#modalEducation{position:absolute;z-index:1000;width:200px;height:150px;background:#fff;}</style>').appendTo('body');

$('<div id="modalEducation"><div id="modalEducationText"></div><div style="position:absolute; bottom:0;"><div id="endEducation">Завершить</div><div id="next">Продолжить</div></div></div>').appendTo('body');


function Education (index){


$(menuButtons[index]).css({
    'position': 'relative',
    'z-index': '1000',
    'background-color': '#6d6d6d'
});
$('#modal-overlay').css('display', 'block');
var modalTop = menuButtons[index].getBoundingClientRect().bottom + window.pageYOffset;
var modalLeft = menuButtons[index].getBoundingClientRect().left + window.pageXOffset;


$('#modalEducation').css({

    'top': modalTop + 10 + 'px',
    'left': modalLeft + 10 + 'px',

});


};



Education(ElIndex);

$('#next').click(function(){

$(menuButtons[ElIndex]).removeAttr( 'style' );
ElIndex++;
Education(ElIndex);

})
