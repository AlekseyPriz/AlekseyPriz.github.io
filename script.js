
    // версия для разработки
    // Отработка PopUP с описанием правил игры

        $(document).ready( function(){ PopUpHide(); }); //Скрыть PopUp при загрузке страницы
        function PopUpShow(){ $("#popup1").show(); }//Функция отображения PopUp
        function PopUpHide(){ $("#popup1").hide(); }//Функция скрытия PopUp

    // Определение переменных

        var start = new Date;
        var level = 5;
		    var blueColor = 255;
		    var redColor = 0;
		    var cWidth = document.documentElement.clientWidth;
		    var cHeight = document.documentElement.clientHeight;
		    var goal = {
	    		x: Math.round( Math.random() * cWidth ),
	    		y: Math.round( Math.random() * cHeight ),
		    };
        var round = 1;
        var rounds = [];

    // Определить цель

      var getNewGoal = function() {
        goal = {
	    		x: Math.round( Math.random() * cWidth ),
	    		y: Math.round( Math.random() * cHeight ),
		    };
      }

    // Установка уровня сложности

        var up   =  function() {
          level = level + 1;
          document.getElementById('levelIndicator').innerHTML = level ;
        };

        var down =  function() {
          if (level > 1) {
            level = level - 1;
            document.getElementById('levelIndicator').innerHTML =   level ;
        } else {
        alert('Это самый сложный уровень');
          }
        };

    // Возвращаем биссектриссу экрана

        var getClientBisector = function() {
          return Math.round( Math.sqrt( Math.pow(cWidth, 2)  + Math.pow(cHeight, 2)));
        }

    // Возвращаем расстойние до цели в условных единицах. Результат - целое число от 1 до 255

        var getBgColor = function(eclientX, eclientY) {
          var toGoalX = goal.x - eclientX;
			    var toGoalY = goal.y - eclientY;
			    var toGoal = Math.round( Math.sqrt( Math.pow(toGoalX, 2) + Math.pow(toGoalY, 2)));
			    var toGoalUE = Math.round( +toGoal * 255  / +getClientBisector() );

          return toGoalUE;
          }
    // Таймер

        var timer = function() {
          document.getElementById('timer').innerHTML = 'Время: ' + Math.round( ( new Date - start ) / 1000 );
    }

    // Привязываем див к курсору
        var cursorPosition = function(cursorX, cursorY) {
          var cursor = document.getElementById('cursor');
          cursor.style.left  = cursorX - 50 + 'px';
          cursor.style.top = cursorY - 50 + 'px';
          //cursor.style.backgroundColor =  'rgb(' + redColor + ', 000, ' + getBgColor(cursorX, cursorY) + ')' ;
          cursor.style.backgroundColor =  'rgb(' + redColor + ', 000, 000)'

        }

    // Функция игры


      document.onmousemove = function(e) {

          cursorPosition(e.clientX, e.clientY);

        if ( getBgColor(e.clientX, e.clientY) != level ) {
          timer();

          redColor  = 255 - getBgColor(e.clientX, e.clientY);
          //document.body.style.backgroundColor =  'rgb(' + redColor + ', 00, ' + getBgColor(e.clientX, e.clientY) + ')' ;

        } else {
          //document.body.style.backgroundColor =  '#FFF' ;
			    var finish = Math.round( (( new Date - start ) / 1000) * 100 ) / 100;
          rounds.push(finish);
          round++;
            function compareNumeric(a, b) {
              if (a > b) return 1;
              if (a < b) return -1;
            }
            rounds.sort(compareNumeric);

          getNewGoal();
          document.getElementById('round').innerHTML = 'Раунд: ' + round;
			    alert("Победа за " + finish + " сек.");
          start = new Date;
          document.getElementById('bestRoundTime').innerHTML = 'Время лучшего раунда: ' + rounds[0] + ' сек.';

        };
  };
