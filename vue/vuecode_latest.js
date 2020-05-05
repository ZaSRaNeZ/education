// Компонент в котором я собрал все стили для всего приложения 

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


    //===================================== Preloader

    div#cube-loader {
        align-items: center;
        display: flex;
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 1000;
    }
    #cube-loader .caption {
        margin: 0 auto;
    }
    #cube-loader .cube-loader {
        width: 73px;
        height: 73px;
        margin: 0 auto;
        margin-top: 20%;
        position: relative;
        transform: rotateZ(45deg);
        z-index: 1000;
    }
    #cube-loader .cube-loader .cube {
        position: relative;
        transform: rotateZ(45deg);
        width: 50%;
        height: 50%;
        float: left;
        transform: scale(1.1);
    }
    #cube-loader .cube-loader .cube:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #6ec4ff;
        animation: cube-loader 2.76s infinite linear both;
        transform-origin: 100% 100%;
    }
    #cube-loader .cube-loader .loader-2 {
        transform: scale(1.1) rotateZ(90deg);
    }
    #cube-loader .cube-loader .loader-3 {
        transform: scale(1.1) rotateZ(180deg);
    }
    #cube-loader .cube-loader .loader-4 {
        transform: scale(1.1) rotateZ(270deg);
    }
    #cube-loader .cube-loader .loader-2:before {
        animation-delay: 0.35s;
    }
    #cube-loader .cube-loader .loader-3:before {
        animation-delay: 0.69s;
    }
    #cube-loader .cube-loader .loader-4:before {
        animation-delay: 1.04s;
    }
    @keyframes cube-loader {
        0%, 10% {
        transform: perspective(136px) rotateX(-180deg);
        opacity: 0;
        }
        25%, 75% {
        transform: perspective(136px) rotateX(0deg);
        opacity: 1;
        }
        90%, 100% {
        transform: perspective(136px) rotateY(180deg);
        opacity: 0;
        }
    }
    </style>
    `
})

//Само окно с текстом и описательной частью по каждой менюшке

Vue.component('modal-education', {
    props: {
        text: '',
    },
    data() {
        //todo: Сейчас перерасчет позиции проходит в методах. Нужно уюедится что это праваильное решения и нет ли более правильного спосооба (возможно через наблюдателя)
        return {
            x: Math.round(educationApp.AllElementsToShow[educationApp.currentElemetnToShow].getBoundingClientRect().bottom + window.pageYOffset),
            y: Math.round(educationApp.AllElementsToShow[educationApp.currentElemetnToShow].getBoundingClientRect().left + window.pageXOffset)
        };
    },
    template: `
    <div id="modalEducation" class="modal-education" v-bind:style="{top:x + 'px',left:y+'px'}">
        <div id="modalEducationText" class="modal-education__text" v-html="text"></div>
        <div id="EducationButtons" class="modal-education__buttons">
            <div id="endEducation" @click="endEducation()">Завершить</div>
            <div id="next" @click="next()">Продолжить</div>
        </div>
    </div>
    `,
    computed: {},
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

// Приветсвие 

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
            educationApp.getData();
        },
        //todo: нужно дописать функцию продолжения для этого в Local storage записивать currentElemetnToShow и потом его считивать
        continue: function() {},
    }
})

// Так как загрузка инфы происходит после нажатия на "Начать заново" в компоненте greetings нужен проелоадер который дождется загрузки инфы и только после откроет окно обучения

Vue.component('preloader', {
    template: `
        <div id="cube-loader">
            <div class="caption">
            <div class="cube-loader">
                <div class="cube loader-1"></div>
                <div class="cube loader-2"></div>
                <div class="cube loader-4"></div>
                <div class="cube loader-3"></div>
            </div>
            </div>
        </div>
        `
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
        educationText: '',
        preloaderShow: true,
        eduTextObj: {} // заготовка для всей инфы для обучения. Отдается obj где key = название пункта меню 
    },
    computed: {},
    watch: {},
    methods: {
        getData: // Загрузка инфы (инфа забирается с Excel файла с Google Disk)  Отдается obj где key = название пункта меню
            function() {
            var app = "https://script.google.com/macros/s/AKfycbzudkuxqqQoKn2Pp9ybnkcm_5IasX5AOichiAeWYi90J-8hJEQ/exec",
                output = {},
                LoadCheck = false,
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
                            if (i == result.length - 1) LoadCheck = true;
                        }
                    } catch (e) {}

                }
                educationApp.eduTextObj = output; // обновление объекта с инфой
                educationApp.educationText = educationApp.eduTextObj[educationApp.AllElementsToShow[educationApp.currentElemetnToShow].textContent]; // добавление текста для компонента modal-education
                educationApp.preloaderShow = !(LoadCheck); // отключаем прелоадер
            }
            xhr.send()
        }
    }
})