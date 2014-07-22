// PLOT POINTS:
// 1) Studying at Jack's
// 2) Suspecting Jack is gay
// 3) Trying to get you a private tutor (threatening your relationship)

function startDinner2() {

    m('Hi sweetie.');
    show('mom','mom_sit');

    switch($.waiting_action) {
        case 'eat':
            m('Oh, you started eating without me. You\'re very impatient.');
            n('...right.');
            break;
        case 'wait':
            m('You could have started without me. No need to let your food get cold.');
            n('...sure.');
            break;
        case 'play':
            m('It\'s immature to play with your food, you know.');
            n('Yeah, yeah.');
            break;
    }

    m('Your father\'s running late. He\'ll be joining us for dinner in an hour\'s time.');

    choose({
        'Cool. Let\'s eat.': function(message) {
            n(message);
            n('*nom nom nom*');
            m('. . .');
            m('What\'s your plans for tomorrow?');
            startDinner2A();
        },
        'I have something to tell both of you.': function(message) {
            n(message);
            m('Alright. Tell us both later when he comes back.');
            n('Oh. Okay.');
            m('. . .');
            n('*nom nom nom*');
            m('So, what\'s your plans for tomorrow?');
            startDinner2A();
        },
        'There\'s something I need to tell just you first.': function(message) {
            n(message);
            m('Hold on Nick, I haven\'t asked about your day yet!');
            n('Today was fine.');
            m('Okay. And what\'s your plans for tomorrow?');
            startDinner2A();
        }
    });

}

function startDinner2A() {

    n('Oh. Uh... studying.');
    n('Yeah. Tomorrow I\'m studying.');
    m('What subject?');
    n('Er...');

    choose({
        'Chemistry.': function(message) {
            $.studying_subject = 'Chemistry';
            startDinner2B(message);
        },
        'Calculus.': function(message) {
            $.studying_subject = 'Calculus';
            startDinner2B(message);
        },
        'Compsci.': function(message) {
            $.studying_subject = 'Computer Science';
            startDinner2B(message);
        }
    });

}

function startDinner2B(message) {

    n(message);
    m('Good.');
    m('You really, really could improve your grades in your '+$.studying_subject+' class.');
    n('. . .');
    m('So, I\'ll be at the library tomorrow.');
    m('Will I see you studying there?');
    n('Actually, I\'m gonna study at Jack\'s place.');
    m('Again?');
    m('You spend a lot of time with him.');

    choose({
        'We just study together, that\'s all.': function(message) {
            $.relationship = 'study';
            buddy1(message);
        },
        'Mom, Jack is... more than a friend.': function(message) {

            $.relationship = 'best friend';
            n(message);

            $.lying_about_hanging_out = true;
            m('Oh, like best friends?');
            n('Um. Well--');
            m('So you\'re just hanging out, not studying.');
            n('We ARE studying!');
            m('. . .');
            m('Alright, just don\'t lie to me.');
            n('I\'m not.');
            buddy1A();
        },
        'Well yeah, that\'s what good pals do.': function(message) {
            $.relationship = 'friend';
            buddy1(message);
        }
    });

}


///////////////////////////////////////
////// 2) SUSPECTING Jack IS GAY ///////
///////////////////////////////////////


function buddy1(message) {
    n(message);

    if($.relationship !== 'study') {
        $.lying_about_hanging_out = true;
        m('Oh. So you\'re just hanging out, not studying.');
        n('We ARE studying!');
        m('. . .');
        m('Alright, just don\'t lie to me.');
        n('I\'m not.');
    }else{
        m('Okay. I\'m just making sure.');
        n('Of... what?');
    }
    buddy1A();
}

function buddyCaughtLying1(message,callback) {
    n(message);
    m('wait...');
    m('I thought you said you \'just study together\'.');
    m('You didn\'t tell me you were friends.');
    $.lying_about_relationship = true;
    choose({
        'Oops, I meant he\'s just a studymate.': callback,
        'Well, he can also be my friend...': callback,
        'No, I always said we were friends.': callback
    });
}

function buddy1A() {

    m('Just... don\'t hang around him too much.');
    m('People might get the wrong idea.');

    choose({
        'Oh. No, yeah, we\'re just friends.': function(message) {
            if($.relationship ==='study' && !$.lying_about_relationship)
                buddyCaughtLying1(message, buddy2);
            else
                buddy2(message);
        },
        'The wrong idea might be the right idea.': buddy4,
        'What do you mean by... wrong idea?': buddy3
    });

}

function buddy2(message) {
    n(message);
    m('Okay.');
    if($.lying_about_relationship) {
        m('Just don\'t lie to me.');
        n('I won\'t.');
        m('. . .');
        m('But... about you hanging out with Jack.');
    }
    m('It\'s just that some people might assume things, since...');
    m('You know... he looks like...');
    m('A gay?');
    buddyChoice();
}

function buddy3(message) {
    n(message);
    m('Just between mother and son, I think he might be... you know...');
    n('No, what?');
    m('A gay!');
    m('He looks and talks like a gay.');
    buddyChoice();
}

function buddy4(message) {
    n(message);
    m('Oh, that\'s like a zen thing, right?');
    n('Um.');
    m('Zen is also about nature, and your classmate Jack, he...');
    m('...you know, doesn\'t seem natural?');
    choose({
        'You think he\'s gay.': function(message) {
            n(message);
            m('Yes!');
            m('You suspect it, too!');
            buddyChoice();
        },
        'Don\'t say that about my friend!': function(message) {

            if($.relationship === 'study' && !$.lying_about_relationship)
                buddyCaughtLying1(message,function(message) {

                    n(message);
                    m('Okay.');
                    m('Just don\'t lie to me.');
                    n('I won\'t.');
                    m('. . .');

                    m('But yes, even you agree that it\'s bad to be seen as \'not natural\'.');
                    n('I never said--');
                    m('And I\'m just looking out for you! Because he acts like, you know...');
                    m('A gay!');
                    buddyChoice();

                });
            else{

                n(message);
                m('I\'m just being honest.');
                m('But yes, even you agree that it\'s bad to be seen as \'not natural\'.');
                n('I never said--');
                m('And I\'m just looking out for you! Because he acts like, you know...');
                m('A gay!');
                buddyChoice();

            }

        },
        'What do you mean, he\'s not natural?': buddy3
    });
}

function buddyChoice() {
    if($.relationship ==='friend') {
        m('And since you say he\'s a \'good pal\'...');
        m('People might think you\'re a gay like him, too.');
    }
    if($.relationship ==='best friend') {
        m('And since you say he\'s your BEST friend...');
        m('People might think you\'re a gay like him, too.');
    }
    choose({
        'Ha, he sure acts gay. Luckily, he\'s not.': function(message) {
            n(message);
            m('See? You also think there\'s something not right about it.');
            n('...sure.');
            buddyAftermath();
        },
        'What\'s wrong with being gay?!': function(message) {
            n(message);
            m('Nothing! Nothing.');
            buddyAftermath();
        },
        'Maybe... my friend might be gay.': function(message) {

            if($.relationship === 'study' && !$.lying_about_relationship)
                buddyCaughtLying1(message,function(message) {
                    n(message);
                    m('Okay.');
                    m('Just don\'t lie to me.');
                    n('I won\'t.');
                    m('. . .');
                    buddyAftermath();
                });
            else{
                n(message);
                buddyAftermath();
            }

        }
    });
}


function buddyAftermath() {

    m('Don\'t get me wrong.');
    m('I\'m not saying those kind of people are bad!');
    m('I just think... you should be careful around one of them.');
    m('Jack might, you know, try to recruit you.');

    show('clock_time','clock_1910');
    show('nicky','dinner_nicky_defiant');

    choose({
        'what.': buddyAftermath2,
        'whaaat.': buddyAftermath2,
        'whaaaaaaaaaaaaaaat.': buddyAftermath2
    });
}

function buddyAftermath2(message) {

    n(message);

    n('How do you even...');
    n('Ugh, nevermind.');
    m('Nick, I\'m sorry you find me annoying.');
    n('No, mom, stop doing th--');
    m('Let\'s go back to talking about your grades.');
    m('Now, what did you say you were studying tomorrow?');

    show('nicky','dinner_nicky_sit');
    n('. . .');
    n('Errrmmmmm...');

    choose({
        'Compsci?': function(message) {
            $.studying_subject_2 = 'Computer Science';
            gradesStart(message);
        },
        'Chemistry?': function(message) {
            $.studying_subject_2 = 'Chemistry';
            gradesStart(message);
        },
        'Calculus?': function(message) {
            $.studying_subject_2 = 'Calculus';
            gradesStart(message);
        }
    });

}


//////////////////////////////////////////
////// 3) A POSSIBLE PRIVATE TUTOR ///////
//////////////////////////////////////////

function gradesStart(message) {
    n(message);
    m('. . .');
    if($.studying_subject !== $.studying_subject_2)
        gradesStart1();
    else
        gradesStart2();
}

function gradesStart1() {
    m('You first told me it was ' + $.studying_subject+'.');
    m('Now you tell me it\'s '+ $.studying_subject_2 + '?');
    $.lying_about_studying = true;
    n('Mom, I was just confus--');
    if($.lying_about_hanging_out || $.lying_about_relationship) {
        m('This is TWICE you\'ve lied to me during this dinner.');
        n('I didn\'t lie about--');
    }
    m('Either way, your grades in both subjects are terrible.');
    n('. . .');
    startDinner3();
}

function gradesStart2() {
    m('You hesitated for a moment there.');
    n('I was eating.');
    m('Okay.');
    if($.lying_about_hanging_out) {
        m('I wonder if you\'re studying with Jack at all, or just always hanging out.');
        n('We study.');
    }
    m('. . .');
    m('Still, your grades in your '+ $.studying_subject_2 + ' class are terrible.');
    n('. . .');
    startDinner3();
}
