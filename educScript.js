var menuButtons = $('.menu.fl-l').find('a.fl-l');
var ElIndex = 0;

$('<style>#modalEducation {position: absolute;z-index: 1000;width: 300px;min-height: 150px;background: #fff;border-radius: 5px;box-shadow: 0 0 10px #d0d6ff; transition: all 0.4s ease 0s;}#EducationButtons{position: absolute;bottom: -35px;width: 100%;height: 30px;display: flex;justify-content: space-between;}div#endEducation, div#next {height: 30px;line-height: 22px;width: 50%;text-align: center;padding: 4px;box-sizing: border-box;color: #fff; cursor: pointer;}div#endEducation{border-radius: 5px 0 0 5px;border: 1px solid #f78a8a91;color: #f78a8a;border-right: none;}div#next{border: 1px solid #8bc34a85;border-radius: 0 5px 5px 0;color: #8bc34a;border-left:none;}div#endEducation:hover{background: #f78a8a;color: #fff;}div#next:hover{background:#8bc34a;color:#fff;}div#modalEducationText{margin: 12px;}</style>').appendTo('body');

$('<div id="modalEducation"><div id="modalEducationText"></div><div id="EducationButtons"><div id="endEducation">Завершить</div><div id="next">Продолжить</div></div></div>').appendTo('body');


const text = 	// тексты для обучения 
{   
	'Старт' : 'Здесь вы сможете увидеть основную информаию касаемо вашего сайта </br> </br> <a href="http://help.horoshop.ua">Больше информации здесь</a>',
	'Заказы':' Здесь вы сможете более детально работать с заказами </br> </br> <a href="http://help.horoshop.ua">Больше информации здесь</a>',
	'Товары' : '',
	'Клиенты' : '',
	'Комментарии' : '',
	'Баннеры' : '',
	'Настройки' : '',
	'Скидки' : '',
	'Утилиты' : '',
	'Маркетинговые системы' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et faucibus ipsum. Curabitur tempor lacinia libero, et fermentum leo consequat at. Cras vulputate lorem ut malesuada blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non gravida turpis. Maecenas convallis, tellus quis aliquet commodo, nulla tellus ornare neque, nec porttitor nibh mi varius mi. Maecenas in purus ut erat blandit vestibulum. Pellentesque posuere interdum lectus et dignissim. Nunc elementum lectus eu eros venenatis fermentum. Praesent in sodales odio. Donec sodales libero eget tellus congue finibus. Donec faucibus in dui quis rhoncus. Aliquam erat volutpat. In et est ac elit molestie dictum. Nulla tempor fermentum nisi ut pulvinar.',
	'Seo' : '',
	'Отчеты' : ''


}

console.log(text['Старт']);
console.log(text['Маркетинговые системы']);



function Education (index){


$(menuButtons[index]).css({
    'position': 'relative',
    'z-index': '1000',
    'background-color': '#6d6d6d'
});
$('#modal-overlay').css('display', 'block');
var modalTop = menuButtons[index].getBoundingClientRect().bottom + window.pageYOffset;
var modalLeft = menuButtons[index].getBoundingClientRect().left + window.pageXOffset;

// изменение текста внутри блока

$('#modalEducationText').html(text[menuButtons[index].innerText]);

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

});



$('#endEducation').click(function(){

window.location.reload();

});