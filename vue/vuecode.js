//=================  VUE components

Vue.component('css', {
    template: `
    <style>
    #modal-overlay{
        display:block;
    }
    .start {
        position: absolute;
        top: calc(50% - 200px);
        left: calc(50% - 300px);
        z-index: 1000;
        min-height: 150px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px #6ec4ff;
        width: 600px;
        height: 400px;
    }

    .start__buttons {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
    }

    .start__button {
        width: 45%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border: 2px solid #1a8ad8;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        font-size: 24px;
        color: #1a8ad8;
        transition: 0.2s all;
    }
    
    .start__text{
        text-align: center;
        padding:40px; 
        font-size: 1.2rem;
    }
    .start__text>p{
        color: #1d1d1d;
    }
    .start__text>h2{
        color: #1a8ad8;
    }
    .start__button:hover {
    color: #fff;
    background: #1a8ad8;
    }
    #modalEducation {
        position: absolute;
        z-index: 1000;
        min-height: 150px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px #d0d6ff;
        transition: all 0.4s ease 0s;
        min-width: 300px;
        max-width: 600px;
    }
    
    #EducationButtons {
        position: absolute;
        bottom: -35px;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
    }
    
    div#endEducation,
    div#next {
        height: 30px;
        line-height: 22px;
        width: 50%;
        text-align: center;
        padding: 4px;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
    }
    
    div#endEducation {
        border-radius: 5px 0 0 5px;
        border: 1px solid #f78a8a91;
        color: #f78a8a;
        border-right: none;
    }
    
    div#next {
        border: 1px solid #8bc34a85;
        border-radius: 0 5px 5px 0;
        color: #8bc34a;
        border-left: none;
    }
    
    div#endEducation:hover {
        background: #f78a8a;
        color: #fff;
    }
    
    div#next:hover {
        background: #8bc34a;
        color: #fff;
    }
    
    div#modalEducationText {
        margin: 12px;
    }
    div#modalEducationText img {
        max-width: 100%;
        margin-top: 40px;
    }
    </style>
    `
})


Vue.component('modal-education', {
    props: {
        text: '',
    },
    data() {
        return {
            x: Math.round(educationApp.AllElementsToShow[educationApp.currentElemetnToShow].getBoundingClientRect().bottom + window.pageYOffset),
            y: Math.round(educationApp.AllElementsToShow[educationApp.currentElemetnToShow].getBoundingClientRect().left + window.pageXOffset)
        };
    },

    //? почему неправильно указывается топ и лево
    template: `
    <div id="modalEducation" class="modal-education" v-bind:style="{top:x + 'px',left:y+'px'}">
        <div id="modalEducationText" class="modal-education__text" v-html="text"></div>
        <div id="EducationButtons" class="modal-education__buttons">
            <div id="endEducation" @click="endEducation()">Завершить</div>
            <div id="next" @click="next()">Продолжить</div>
        </div>
    </div>
    `,
    methods: {
        next: function() {
            educationApp.currentElemetnToShow++;
            this.text = educationApp.eduTextObj[educationApp.AllElementsToShow[educationApp.currentElemetnToShow].textContent];
            this.x = Math.round(educationApp.AllElementsToShow[educationApp.currentElemetnToShow].getBoundingClientRect().bottom + window.pageYOffset);
            this.y = Math.round(educationApp.AllElementsToShow[educationApp.currentElemetnToShow].getBoundingClientRect().left + window.pageXOffset);

        },
        endEducation: function() {
            window.location.reload();
        }
    }
})


Vue.component('greetings', {

    template: `
        <div id="modal-education-start" class="start">
            <div class="start__text">
                <h2>Привет!</h2>
                <p>Давай научимся работать с админкой =) </p>
            </div>
            <div class="start__buttons">
                <div class="start__button" id="continue" > Продолжить </div>
                <div class="start__button" id="new" @click="start()">Начать заново</div>
            </div>
        </div>
        `,
    methods: {
        start: function() {
            educationApp.greetingsShow = false;
            educationApp.educationBlockShow = true;
            educationApp.showedElement = 0;
            educationApp.educationText = educationApp.eduTextObj[educationApp.AllElementsToShow[educationApp.currentElemetnToShow].textContent];
        },
        continue: function() {

        },
    }
})


//=================  VUE app



var educationApp = new Vue({
    el: '#education-app',
    data: {
        greetingsShow: true,
        educationBlockShow: false,
        AllElementsToShow: (function() {
            return document.querySelector('.menu.fl-l').querySelectorAll('.fl-l');
        })(),
        currentElemetnToShow: 0,
        eduTextObj: (function() {
            var app = "https://script.google.com/macros/s/AKfycbzudkuxqqQoKn2Pp9ybnkcm_5IasX5AOichiAeWYi90J-8hJEQ/exec",
                output = {},
                xhr = new XMLHttpRequest();
            xhr.open('GET', app);
            xhr.onerror = function() {
                return 'Не удалсоь загрузить инфу с таблицы';
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
        })(),
        educationText: ''
    },
    methods: {}
})