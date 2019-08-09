var menuButtons = $('.menu.fl-l').find('a.fl-l');
var ElIndex = 0;

$('<style>#modalEducation {display:none;position: absolute;z-index: 1000;width: 300px;min-height: 150px;background: #fff;border-radius: 5px;box-shadow: 0 0 10px #d0d6ff; transition: all 0.4s ease 0s;}#EducationButtons{position: absolute;bottom: -35px;width: 100%;height: 30px;display: flex;justify-content: space-between;}div#endEducation, div#next {height: 30px;line-height: 22px;width: 50%;text-align: center;padding: 4px;box-sizing: border-box;color: #fff; cursor: pointer;}div#endEducation{border-radius: 5px 0 0 5px;border: 1px solid #f78a8a91;color: #f78a8a;border-right: none;}div#next{border: 1px solid #8bc34a85;border-radius: 0 5px 5px 0;color: #8bc34a;border-left:none;}div#endEducation:hover{background: #f78a8a;color: #fff;}div#next:hover{background:#8bc34a;color:#fff;}div#modalEducationText{margin: 12px;}</style>').appendTo('body');

$('<div id="modalEducation"><div id="modalEducationText"></div><div id="EducationButtons"><div id="endEducation">Завершить</div><div id="next">Продолжить</div></div></div>').appendTo('body');

// Вся инфа переганяеться из google таблицы в моем google disk  EDUCATION_SCRIPT

const text = (function () {
   var app = "https://script.google.com/macros/s/AKfycbzudkuxqqQoKn2Pp9ybnkcm_5IasX5AOichiAeWYi90J-8hJEQ/exec",
      output = {},
      xhr = new XMLHttpRequest();
   xhr.open('GET', app);
   xhr.onreadystatechange = function() {
     if (xhr.readyState !== 4) return;

     if (xhr.status == 200) {
        try {
            var r = JSON.parse(xhr.responseText),
               result = r["result"];
            for (var i = 0; i < result.length; i++){
                  var obj = r["result"][i];
				console.log(obj);
                  output[obj[0]] = obj[1];
            }
        } catch(e) {}
     } 
     
   console.log(output)

   }
   xhr.send()
	return output;
})();



console.log(text['Старт']);
console.log(text['Маркетинговые системы']);



function Education (){


$(menuButtons[ElIndex]).css({
    'position': 'relative',
    'z-index': '1000',
    'background-color': '#6d6d6d',
	'display':'block'
});
$('#modal-overlay').css('display', 'block');
var modalTop = menuButtons[ElIndex].getBoundingClientRect().bottom + window.pageYOffset;
var modalLeft = menuButtons[ElIndex].getBoundingClientRect().left + window.pageXOffset;

// изменение текста внутри блока

$('#modalEducationText').html(text[menuButtons[ElIndex].innerText]);

$('#modalEducation').css({

    'top': modalTop + 10 + 'px',
    'left': modalLeft + 10 + 'px',

});


};



setTimeout(function(){
	
$('#modalEducation').css('display','block');
Education();

}, 1500);

$('#next').click(function(){

$(menuButtons[ElIndex]).removeAttr( 'style' );
ElIndex++;
Education(ElIndex);

});



$('#endEducation').click(function(){

window.location.reload();

});