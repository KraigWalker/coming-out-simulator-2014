function startDinner1() {
    /////// SET UP SCENE ////////

    show('background', 'dinner');
    show('clock', 'clock_ticking', {x: 155, y: 294});
    show('clock_time', 'clock_1855', {x: 155 + 5, y: 294 + 37});
    show('nicky', 'dinner_nicky_sit', {x: 0, y: 300});
    show('dad', null, {x: 0, y: 300});
    show('mom', null, {x: 0, y: 300});
    show('table', 'dinner_table', {x: 0, y: 420 });

    playSound('clock', 'dinner_ticking', {loop: -1});

    ////////////////////////////


    function waiting1(message) {

        $.what_you_called_out = message;
        n(message);

        n(". . .");

        choose({
            '[start eating]': function(message) {
                $.waiting_action = 'eat';
                waiting2(message);
            },
            '[wait some more]': function(message) {
                $.waiting_action = 'wait';
                waiting2(message);
            },
            '[play with food]': function(message) {
                $.waiting_action = 'play';
                waiting2(message);
            }
        });

    }

    wait(2500);
    n("Where is everyone?...");
    n(". . .");

    choose({
        'Moooom?': waiting1,
        'Daaaaad?': waiting1,
        'Hello, anybody?': waiting1
    });

}

function waiting2(message) {

    n(message);
    n('. . .');

    playSound('clock','dinner_meowing',{loop:-1});

    show('clock','clock_meowing');
    show('clock_time','clock_1900');
    wait(1000);

    show('nicky','dinner_nicky_defiant');

    choose({
        'Cut the crying, cacophonous cat clock!': function(message) {
            n(message);

            show('mom','mom_stand');
            show('clock','clock_ticking');
            playSound('clock','dinner_ticking',{loop:-1});

            if($.im_a_poet)
                m('Did you learn poetry from a friend?');
            else
                m('Poetic.');

            show('nicky','dinner_nicky_sit');
            n('Oh, hey mom.');

            startDinner2();
        },
        'Ugh, why did we get that thing?': function(message) {
            n(message);

            show('mom','mom_stand');
            show('clock','clock_ticking');
            playSound('clock','dinner_ticking',{loop:-1});

            m('Your grandfather gave it to us.');

            show('nicky','dinner_nicky_sit');
            n('Oh! Hey mom.');

            startDinner2();
        },
        'Meow! Meow! Meow! Meow!': function(message) {

            n('Meow.');
            n('Meow!');

            show('nicky','dinner_nicky_outrage');
            n('MEOW!');

            show('mom','mom_stand');

            m('Nick, what are you doing?...');

            show('clock','clock_ticking');
            playSound('clock','dinner_ticking',{loop:-1});
            show('nicky','dinner_nicky_sit');

            n('MEOOOhhhh didn\'t see you. Ahem. Hey mom.');

            startDinner2();
        }
    });

}
