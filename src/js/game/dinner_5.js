// Dad's home!
// Calm conversation about going to the movies.
// Mother brings up tutoring and/or school. (if you try to bring anyting up, it'll skip to this.)
// Argue or agree?
// Everything in the past hour comes crashing back.
// You can attempt to blame them, too. (but they justify it all)
// Agree (calm dinner) --- Stressed Dinner, storms off --- Punches you in the damn face.

function startDinner5() {

    playSound('sfx','dinner_door');

    f('Hey Qiying! Hey Nick!');
    f('I\'m home!');

    show('dad','dad_serious');

    m('Hi honey.');
    n('Sup dad, how was your day?');

    f('Stayed overtime. Hopefully the boss will notice it before my Performance Review.');
    f('Really, though, I was just playing web games all day. Haha!');
    n('Ha ha.');

    f('Nick, why aren\'t <i>your</i> web games any fun?');

    choose({
        'I thought my games were fun...': function(message) {
            n(message);
            f('Well then! You have a sick sense of fun, don\'t you. Haha!');
            n('. . .');
            casual();
        },
        'Not all games have to be fun.': function(message) {
            n(message);
            f('Oh yes. You\'re right.');
            f('BAD games aren\'t any fun. Haha!');
            n('. . .');
            casual();
        },
        'ART!': function(message) {
            n(message);
            f('Pfft. What\'s the use of art?');
            f('Next thing you know, you\'re going to be writing bad amateur poetry, or something.');
            n('. . .');
            casual();
        }
    });

}

function casual() {

    f('Hey Qi, what\'s that sauce on your plate?');
    f('Uh...');

    show('clock_time','clock_1950');

    choose({
        'It\'s vomit.': function(message) {

            n(message);

            $.grounded = 2;
            f('Nick! One week grounded!');
            f('Don\'t insult your mother\'s cooking like that.');
            f('Her food insults itself plenty enough. Haha!');

            casual2();

        },
        'Don\'t eat it! It\'s, uh, really not good.': function(message) {

            n(message);

            $.grounded = 1;
            f('Nick! One day grounded!');
            f('show some respect. Have more faith in your mother\'s cooking!');
            f('Because the way she cooks, we could certainly use a miracle! Haha!');

            casual2();

        },
        'Why don\'t you give it a try, dad?': function(message) {

            n(message);

            $.grounded = 0;
            m('Nick...');
            f('Don\'t mind if I do!');
            f('[eats a spoonful]');
            f('. . .');
            n('. . .');
            m('. . .');
            f('Well, you\'ve cooked up worse, hun. Haha!');

            casual2();

        }
    });

}

function casual2() {

    m('Dear...');
    f('So, son! How\'s school?');

    choose({
        'School\'s fine.': function(message) {

            n(message);

            f('Really, fine?');
            if($.studying_subject !== $.studying_subject_2)
                f('What about your poor grades in '+ $.studying_subject+' and '+ $.studying_subject_2+'?');
            else
                f('What about your poor grades in '+ $.studying_subject+'?');

            m('Nick and I were just talking about that.');
            gettingATutor();

        },
        'I\'m studying at a friend\'s place tomorrow.': function(message) {
            n(message);

            $.tried_talking_about_it = true;

            if($.grounded>0) {

                if($.grounded === 1)
                    f('Don\'t you remember? I just grounded you for tomorrow.');
                if($.grounded === 2)
                    f('Don\'t you remember? I just grounded you for a week.');

                f('You must get your stupid from your mother\'s side. Haha!');

                n('Um. I...');

                $.grounded++;
                if($.grounded === 2)
                    f('I\'m bumping it up. You\'re now grounded for a week.');
                if($.grounded === 3)
                    f('I\'m bumping it up. You\'re now grounded for TWO weeks.');
            }

            m('Speaking of studying...');
            gettingATutor();

        },
        'DAD I\'M BISEXUAL AND BANGING JACK.': function(message) {
            $.tried_talking_about_it = true;

            show('nicky','dinner_nicky_outrage');
            n('DAD I\'M BI--');
            show('nicky','dinner_nicky_sit');

            m('BICYCLING to school every day starting next week.');
            f('Oh good!');
            f('You could certainly lose some weight, or else how will you get a girlfriend?');
            f('You must get your chubbiness from your mother. Haha!');
            n('Ha ha.');
            m('Speaking of school...');
            gettingATutor();
        }

    });

}

function gettingATutor() {

    m('We were discussing probably getting a home tutor.');
    f('Oh! Is this the Claire kid?');

    // Oh dang!
    show('nicky','dinner_nicky_defiant');

    switch($.promise_silence) {
        case 'yes':
            n('Mom, we both promised we wouldn\'t talk about this...');
            if($.tried_talking_about_it)
                m('You <i>just</i> tried talking about it.');
            break;
        case 'no':
            n('Mom, you said we wouldn\'t talk about this...');
            m('You\'re the one who didn\'t promise not to talk!');
            break;
        case 'tit for tat':
            n('Mom, you said you wouldn\'t talk about this if I didn\'t...');
            if($.tried_talking_about_it)
                m('You <i>just</i> tried talking about it.');
            break;
    }

    f('Talking about what?...');
    f('I\'m the head of this household. You two better not be hiding secrets from me.');
    m('Oh... Nick just really, really likes Claire.');

    choose({
        'What?! No I don\'t!': function(message) {
            n(message);
            f('Don\'t be so shy about it.');
            gettingATutor2();
        },
        'Fine. You got me. I have a crush on Claire.': function(message) {
            n(message);
            gettingATutor2();
        },
        'I have a boyfriend.': function(message) {
            n(message);
            f('Yes son! You\'re going to be a boyfriend!');
            n('<i>Have</i>. I <i>have</i> a--');
            gettingATutor2();
        }
    });

}

function gettingATutor2() {

    f('You\'re becoming a man, son!');
    f('If I were your age, I ditch your mother and chase Claire, too! Haha!');

    n('That\'s totes weird, dude.');
    f('Talking back? Careful, I\'ll box your ears, boy!');

    if($.changing_schools) {
        m('We were also thinking about changing schools for Nick.');
        m('Maybe to Claire\'s school.');
    }
    if($.studying_subject !== $.studying_subject_2)
        m('Claire will be tutoring Nick every day after school in ' + $.studying_subject + ' and '+ $.studying_subject_2 + '.');
    else
        m('Claire will be tutoring Nick every day after school in ' + $.studying_subject + '.');

    f('Nick, how does all this sound? Yes or no?');
    m('He loves the ide--');
    f('Shut up, Qi. I asked my son.');
    m('. . .');

    show('dad','dad_threat');

    f('Mister Nicklaus Liow.');
    if($.changing_schools)
        f('You want to change schools to chase your hot tutor girlfriend?');
    else
        f('You want to spend all your after-school hours with your hot tutor girlfriend?');

    n('It\'s complicated, I--');
    f('No pansy middle-of-the-road answers.');
    f('Yes. Or. No.');

    n('. . .');

    choose({
        'Yes.': agreeWithDad,
        'No.': argueWithDad
    });

}

function agreeWithDad() {

    n('...Yes.');

    f('Hm.');
    f('You two seem to have made this big life decision very eagerly!');
    f('So eagerly, in fact, you made it in less than an hour, and tried to hide it from me. What a sudden change.');
    m('. . .');
    n('. . .');

    f('Nick, you did something naughty, didn\'t you?');
    f('What did you do.');

    choose({
        'I failed my midterms.': function(message) {

            n(message);

            f('...Oh.');
            f('Yeah, you need to get your grades back up.');

            show('dad','dad_serious');

            f('Or you\'ll be stuck in a teaching job like your mother! Haha!');
            n('. . .');
            agreeableEnding();

        },
        'I had sex with Jack.': function(message) {

            n(message);

            show('mom','mom_cry');
            m('[sob]');
            f('. . .');
            argumentEnding();

        },
        'I had sex with Claire.': function(message) {

            n(message);

            m('...Nick!');
            f('. . .');
            f('   Nnnnnniiiiiiiiice.');
            m('...Dear!');
            f('wait, uh, you didn\'t get her pregnant, did you?');
            n('No. I\'m not stupid.');

            show('dad','dad_serious');

            f('Good. Otherwise you\'d be stuck for the next two decades raising a kid, like me! Haha!');
            n('Ha ha.');
            agreeableEnding();

        }
    });

}

function agreeableEnding() {

    $.father_oblivious = true;

    f('For a moment there, Nick, I thought you\'d been smoking pot with your hippie classmate Jack, or something!');

    show('nicky','dinner_nicky_sit');
    n('. . .');
    f('So!');
    f('Who wants to watch a movie this weekend? I hear Inception is good.');

    choose({
        'Let\'s watch it! I haven\'t seen it yet.': function(message) {
            n(message);
            f('Then it\'s a plan!');
            f('Hey Nick, you know who\'s acting in the movie?');
            n('Um. Leonardo DiCaprio?');
            f('No no, Ellen Page.');
            f('Doesn\'t Claire look a little bit like her?');
            n('I guess.');
            dinnerEnding();
        },
        'Uh... let\'s do a different movie...': function(message) {
            n(message);
            f('What, Inception too complicated for you?');
            n('Hey...');
            if($.studying_subject !== $.studying_subject_2)
                f('Sure, I understand if you failed '+ $.studying_subject+' and '+ $.studying_subject_2 + '...');
            else
                f('Sure, I understand if you failed '+ $.studying_subject+'...');
            f('But come on, this is a <i>movie</i>!');
            f('You can\'t have inherited that much stupid from your mother\'s side! Haha!');
            n('Ha ha.');
            dinnerEnding();
        },
        'Oh, I already saw Inception.': function(message) {
            n(message);
            f('Oh ho, I see...');
            f('You went on a little movie date with your special friend Claire, didn\'t you?');
            n('Yeah.');
            n('A date with my special friend.');
            dinnerEnding();
        }
    });

}

function argueWithDad() {

    n('...No.');

    f('Excuse me?');
    n('No. Mom\'s doing this so I can\'t see Jack anymore.');
    f('Jack.');
    n('My friend.');

    choose({
        'My boyfriend.': function(message) {

            n(message);

            show('mom','mom_cry');
            m('[sob]');

            m('Jack did this to our son!');
            f('That kid chose his lifestyle, but I will not have it be yours, Nick.');
            argumentEnding();
        },
        'Mom hates him, coz he happens to be gay.': function(message) {

            n(message);

            show('mom','mom_cry');
            m('[sob]');

            f('You made your mother cry.');
            if($.hippies)
                m('And his parents are drug addicts!');
            f('Jack chose that lifestyle, but I will not have it be yours, Nick.');
            argumentEnding();
        },
        'Mom hates him, coz she THINKS he\'s gay.': function(message) {

            n(message);

            show('mom','mom_cry');
            m('[sob]');

            m('Jack IS gay!');
            if($.hippies)
                m('And his parents are drug addicts!');
            f('Jack chose that lifestyle, but I will not have it be yours, Nick.');
            argumentEnding();
        }
    });

}

function argumentEnding() {

    $.father_oblivious = false;

    n('. . .');

    if($.top_or_bottom === 'top')
        m('Jack acts like the woman, not him...');
    switch($.what_are_you) {
        case 'bisexual':
            m('Nick\'s not fully gay, he told me himself he\'s still attracted to girls!');
            n('. . .');
            break;
        case 'confused':
            m('Earlier Nick told me he was just confused!');
            f('Oh, clearly he is.');
            n('. . .');
            break;
        case 'son':
            n('Look, like I told Mom just now, I\'m your SON, isn\'t that enou--');
            break;
    }

    f('Nick, you\'re changing schools.');
    n('. . .');
    m('huuu... huuu... huuu...');

    f('Your mother and I will do random checks on your texts and emails.');
    n('. . .');
    m('owww... owww...');

    f('I swear, if I have to pay Claire extra to make you realize you\'re straight, I will.');
    n('. . .');

    show('mom','mom_sit');
    if($.crying === 'anger') {
        m('When I was crying earlier, he accused it of being fake!');
        f('Qi, shut up. We\'re not talking about you.');
    }
    if($.crying === 'mocking') {
        m('When I was crying earlier, he was mocking it!');
        f('Qi, shut up. We\'re not talking about you.');
    }

    f('So Nick.');
    f('Would you like to say anything, anything at all, about all that?');

    choose({
        'Yes. Fuck this, and fuck you.': function(message) {

            n('Yes.');
            n('FUCK this.');
            n('And FUCK you.');

            show('nicky','dinner_nicky_outrage');
            n('Fuck BOTH of you, you narcissistic slimy pieces of SHI--');

            dinnerEndingPunch();

        },
        'No. I accept my punishment.': function(message) {

            n(message);
            f('Good. At least you\'re taking this like a man.');
            n('. . .');

            show('dad','dad_serious');

            m('sniff...');
            f('I\'m going out to the bar, and getting something actually edible to eat.');

            show('dad',null);

            f('Honey sweetie dear? Your cooking is shit.');
            playSound('sfx','dinner_door');

            m('. . .');

            show('mom','mom_cry');

            m('BAWWWWW');

            dinnerEnding();

        },
        'You can\'t hurt me.': function(message) {

            n(message);
            f('. . .');
            m('Dear, no...');
            f('Mighty strong words, son.');
            m('Honey, please don\'t!');
            f('At least you\'re standing up to me. Like a man.');
            m('Please! It\'s my fault! Don\'t--');
            f('Ice keeps the swelling down.');
            m('DEAR!');

            dinnerEndingPunch();

        }
    });

}

function dinnerEndingPunch() {

    wait(500);

    queue(clearDialogue,0);

    stopSound('clock');
    playSound('sfx','dinner_punch');

    show('dad',null);
    show('mom','mom_cry');
    show('nicky','dinner_nicky_punched');
    show('dinner_punch_arm','dinner_punch_arm',{x:0,y:300});

    $.punched = true;
    dinnerEnding();

}

function dinnerEnding() {

    wait(500);

    queue(clearDialogue,0);

    wait(500);

    playSound('clock','dinner_meowing',{loop:-1});
    show('clock','clock_meowing');
    show('clock_time','clock_2000');

    wait(1000);

    clear();
    startJack2();
}
