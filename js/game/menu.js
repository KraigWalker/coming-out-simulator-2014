var $ = {};
function start() {
    /////// SET UP SCENE ////////

    show('background', 'coffeehouse');
    show('cup', 'cup_steam', {x: 44, y: 359});
    show('nicky', 'coffee_nicky_still');

    playSound('bg', 'coffeehouse', {loop: -1, volume: 0.7});

    //////////////////////////////

    N('<b>COMING OUT SIMULATOR 2014</b>');
    N('A half-true game about half-truths.');
    N('Hey there, player. Welcome to this game, I guess.');
    N('What would you like to do now?');

    choose({
        'Let\'s play this thing!': Play,
        'Who are you? (Credits)': function () {
            credits('Who are you?');
        },
        'Hm, tell me more. (About This Game)': function () {
            about('Hm, tell me more.');
        }
    });

}

function sipCoffee(message) {
    show('nicky', 'coffee_nicky_drink');
    show('cup', null);
    playSound('sfx', 'coffee_sip');
    p(message);
    show('nicky', 'coffee_nicky_still');
    show('cup', 'cup_steam');
}

function Play(message) {

    sipCoffee(message);

    // Asked neither
    if (!$.asked_about && !$.asked_credits) {
        N('Jumping right into it! Great!');
        N('No messing around with reading the Credits or the About This Game sections or--');
        p('Shush.');
        N('Fine, fine.');
    }
    // Asked both
    if($.asked_about && $.asked_credits) {
        p('. . .');
        p('Why did you make that a clickable option, when it was the only option left.');
        N('NO IDEA');
    // Asked either
    }else if($.asked_about || $.asked_credits)
        N('Yes, let\'s!');

    N('Let\'s travel back four years ago, to 2010...');
    p('That was FOUR years ago?!');
    N('...to the evening that changed my life forever.');

    N('Tell me, dear player, how do you think this all ends?');

    choose({
        'With flowers and rainbows and gay unicorns?': function(message) {
            $.main_menu_convo_1 = 1;

            p(message);
            N('Yes. That is exactly how this game ends.');
            p('Really?');
            N('No.');
            play2();
        },
        'Apparently, with you redditing at Starbucks.': function(message) {
            $.main_menu_convo_1 = 2;

            p(message);
            N('Hey, I\'m coding on this laptop. Turning my coming-of-age story into the game you\'re playing right now.');
            p('Naw, you\'re probably procrastinating.');
            N('Look who\'s talking.');
            p('Touché, douché.');
            N('Anyway...');
            play2();
        },
        'IT ALL ENDS IN BLOOD': function(message) {
            $.main_menu_convo_1 = 3;

            p(message);
            N('Uh, compared to that, I guess my story isn\'t that tragic.');
            N('Although that\'s kind of a glass one-hundredths-full interpretation.');
            p('blooooood.');
            N('Anyway...');
            play2();
        }
    });

}

function play2() {

    if(!$.asked_about) {
        N('If you didn\'t skip the About This Game section, you\'d know this is a very personal story.');
        p('Shush.');
    }

    N('This game includes dialogue that I, my parents, and my ex-boyfriend actually said.');
    N('As well as all the things we could have, should have, and never would have said.');
    N('It doesn\'t matter which is which.');
    N('Not anymore.');

    choose({
        'How can I win a game with no right answers?': function(message) {
            $.main_menu_convo_2 = 2;

            p(message);
            N('Exactly.');
            p('. . .');
            play3();
        },
        'You\'re a bit of a downer, aren\'t you?': function(message) {
            $.main_menu_convo_2 = 1;

            p(message);
            N('LIFE is a bit of a downer.');
            p('So that\'s a yes.');
            play3();
        },
        'This \'true\' game is full of lies?': function(message) {
            $.main_menu_convo_2 = 3;

            p(message);
            N('Even if the dialogue was 100% accurate, it\'d still be 100% lies.');
            p('. . .');
            play3();
        }
    });

}

function play3() {

    N('You\'ll be playing as me, circa 2010.');
    if(!$.asked_credits) {
        N('Because you skipped the Credits, my (not-yet-legal) name is Nicky Case. Just so you know.');
        p('Shush.');
    }

    var whatISay;
    switch($.main_menu_convo_1) {
        case 1: whatISay = 'This game doesn\'t end with gay unicorns. '; break;
        case 2: whatISay = 'This game is a coming-out, a coming-of-age, a coming-to-terms. '; break;
        case 3: whatISay = 'This game ends not in blood, but in tears. '; break;
    }
    switch($.main_menu_convo_2) {
        case 1: whatISay += 'Sorry for being a bit of a downer.'; break;
        case 2: whatISay += 'And there are no right answers.'; break;
        case 3: whatISay += 'And it\'s full of lies.'; break;
    }
    N(whatISay);

    playSound('sfx', 'coffee_sip');
    show('nicky', 'coffee_nicky_drink');
    show('cup',null);

    p('Hey, I just said that!');

    // HACK - Just clear dialogue & stuff.
    wait(1000);
    queue(clearDialogue, 0);

    wait(500);
    show('nicky', 'coffee_nicky_throw');
    playSound('sfx', 'coffee_throw');

    wait(1000);
    show('nicky', 'coffee_nicky_still_2');
    wait(500);

    N('When you play...');
    N('choose your words wisely.');
    N('Every character will remember everything you say. Or don\'t say.');
    p('Yeah. You even brought up my choices in this MAIN MENU.');
    N('Exactly.');

    N('. . .');
    N('Some things are hard not to remember.');

    clear();
    startJack1();

}

function credits(message) {

    $.asked_credits = true;

    if($.asked_about)
        sipCoffee(message);
    else
        sipCoffee('Who are you?');


    N('Ah, how rude of me! Let me introduce myself.');
    N('Hi, I\'m Nicky Case.');
    N('That\'s not my legal name, it\'s just my REAL name.');

    p('That\'s totes weird, dude.');
    if($.asked_about)
        p('And like you just told me, this is your personal story?');
    else
        p('And you made this game?');


    N('Yep, I am the sole writer / programmer / artist of Coming Out Simulator 2014.');

    if($.asked_about) {
        p('All of this yourself?');
        p('I said it before and I\'ll say it again...');
        p('Of course. You narcissist.');
        N('Well it\'s not ALL me.');
        N('The sounds & audio are from various public domain sources.');
    }else
        N('The sounds & audio, though, are from various public domain sources.');

    N('But although it\'s mostly just me behind this game...');
    N('...there\'s a lot of people behind this game\'s story.');

    if($.asked_about)
        choose({
            'Speaking of which, let\'s play that! Now!': Play
        });
    else
        choose({
            'Speaking of that, can we play it now?': Play,
            'Why\'d you make this? (About This Game)': function() {
                about('Why\'d you make this?');
            }
        });
}

function about(message) {

    $.asked_about = true;

    sipCoffee(message);

    if($.asked_credits)
        N('I wanted to tell my story.');
    else{
        N('This game...');
        N('...more like a conversation simulator, really...');
        N('...is a very personal story.');
    }

    p('Of course. You narcissist.');
    N('Ha, of course.');

    if($.asked_credits) {
        p('Actually no, a narcissist would use their real name.');
        N('I told you, it IS my real na--');
        p('Aight, aight. Weirdo.');
    }

    N('I made this game for the #Nar8 Game Jam. Gave me an excuse. And a deadline!');
    p('You procrastinated until the last day to enter, didn\'t you.');
    N('Yes.');
    N('Also! This game is uncopyrighted. Dedicated to the public domain.');
    N('I\'m as open with my source code as I am with my sexuality.');

    p('Ugh, that\'s a terrible pun.');
    N('Howzabout a \'Fork Me\' programming pun?');
    p('noooooo.');

    if($.asked_credits)
        choose({
            'Let\'s just play this game already.': Play
        });
    else
        choose({
            'Bad puns aside, can we play now?': Play,
            'So who ARE you? (Credits)': function() {
                credits('So who ARE you?');
            }
        });
}
