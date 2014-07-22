// Plot points:
// Trying to stay overnight.
// Reveal - hippie parents, reading poetry, ...(?)
// Threats -- date your tutor, changing school(?)
// He's distracting you. Movie & Hippies.
// Oh my god, you've been reading my texts!...

function startDinner3() {

    n('Mom.');

    choose({
        'That\'s why I\'m studying more with Jack.': Tutor,
        'Look, I\'m trying. I really am.': Tutor,
        'My grades are fine.': Tutor
    });
}

function Tutor(message) {

    n(message);
    m('I\'m worried for you. Jack\'s not a good influence.');

    if($.hippies) {
        m('I think his parents might even be drug addicts...');
        n('What makes you say th--');
    }else if($.im_a_poet) {
        m('All he does is do poetry.');
        n('What makes you say th--');
    }

    m('I\'m getting you a home tutor.');
    n('...what?');

    if($.studying_subject !== $.studying_subject_2)
        m('She\'ll be tutoring you in ' + $.studying_subject + ' and ' + $.studying_subject_2 + '.');
    else
        m('She\'ll be tutoring you in ' + $.studying_subject + '.');

    m('Her name is Claire. She\'s smart, pretty, and Caucasian. She\'s your age, too.');

    choose({
        'Are you trying to stop me from seeing Jack?': tutorSeeing,
        'Are you trying to matchmake me with her?': tutorMatchmake,
        'Can we talk about tutors another time?': tutorForget
    });

}

function tutorSeeing(message) {
    n(message);
    m('I\'m sorry, <i>seeing</i> Jack?');
    m('Be careful how you say that. You make it sound like...');

    choose({
        'Like we\'re dating? Yeah. We are.': function(message) {
            n(message);
            m('. . .');
            n('. . .');
            n('...Hello?');
            m('. . .');
            n('Anyone there?');
            m('. . .');
            threatSchool();
        },
        'I just meant meeting Jack.': function(message) {
            n(message);
            m('Okay. Just being clear about some things.');
            n('Yeah.');
            m('. . .');
            m('Claire\'s really cute.');
            n('Sure.');
            m('She has perky breasts.');
            threatTutor();
        },
        'We\'re. Not. Boyfriends.': function(message) {
            n(message);
            m('. . .');
            m('Okay.');
            m('I never said you were, but... okay.');
            n('We\'re friends.');

            if($.relationship=='friend') {
                m('\'Good pals\'...');
            }
            if($.relationship=='best friend') {
                m('\'BEST friends\'...');
            }

            threatTutor();
        }
    });
}

function tutorMatchmake(message) {
    n(message);
    m('Well, if that\'s what you want, I could!');
    n('nooooo.');
    m('Don\'t be shy! You\'re growing up to be a man.');
    m('And you\'re going to give me lots of grandkids.');

    choose({
        'Stop it! I haven\'t even met Claire yet!': function(message) {
            n(message);
            m('Yet!');
            m('She\'s coming over tomorrow!');
            n('What? But I promised Jack--');
            m('I ironed your best clothes. You\'ll make a good first impression.');
            threatTutor();
        },
        'The odds of that are 50-50, coz I\'m bi.': function(message) {

            $.admit_bisexuality = true;

            n(message);
            m('Um. Bi?...');

            show('nicky','dinner_nicky_defiant');

            n('Yes. As in BISEXUAL.');
            n('As in I AM SEXUALLY ATTRACTED TO BOTH MEN AND WOMEN.');
            m('. . .');
            n('. . .');
            threatSchool();
        },
        'No. I don\'t ever want to have kids.': function(message) {
            n(message);
            m('You\'ll change your mind when you grow up.');
            m('Raising a child is wonderful. Your children will look up to you!');
            n('...of course, you narcissist.');
            m('Excuse me?');
            n('Nothing.');
            m('. . .');
            threatTutor();
        }
    });
}

function tutorForget(message) {
    n(message);
    m('No, because I\'ve already scheduled Claire to come over tomorrow.');
    n('What?!');
    n('No. I promised to study with Jack tomorrow.');
    m('. . .');
    m('How long did you want to stay over at his place?');

    choose({
        'Overnight.': function(message) {
            n(message);
            m('. . .');
            n('. . .');
            n('...Hello?');
            n('It\'s not weird. Friends have sleepovers all the time.');
            m('. . .');
            threatTutor();
        },
        'Just the afternoon.': function(message) {
            n(message);
            if($.lying_about_hanging_out) {
                m('I knew it. I caught your lie earlier.');
                n('Huh?');
            }else
                m('...I knew it.');
            m('You\'re just hanging out with him.');
            threatTutor();
        },
        'Maybe an hour or so.': function(message) {
            n(message);
            m('That\'s not enough to really get studying done.');
            if($.lying_about_hanging_out) {
                m('I knew it. I caught your lie earlier.');
                n('Huh?');
            }
            m('You\'re just hanging out with him.');
            threatTutor();
        }
    });
}

function threatTutor() {

    show('nicky','dinner_nicky_defiant');

    n('. . .');
    m('Claire will be tutoring you every day after school, starting tomorrow.');

    choose({
        'Every day?! What about my friends?!':function(message) {
            n(message);
            m('Sweetie, I\'m your friend!');
            n('. . .');
            m('Also Claire can be your friend. Maybe more than friends.');
            n('. . .');
            n('Are we done?');
            m('Just... one more thing.');
            plotTwist();
        },
        'Okay, but my weekends are free, right?': function(message) {
            n(message);
            m('Yes.');
            n('Okay. Good that this is all settled now.');
            m('...Yes.');
            n('. . .');
            m('Just... one more thing.');
            plotTwist();
        },
        'What if just DON\'T study with Claire?': function(message) {
            n(message);
            m('Well, if you also want to hang out with her, that\'s good too.');
            m('Anything to make you more manly.');
            n('ugh.');
            m('Oh.');
            m('One more thing.');
            plotTwist();
        }
    });

}

function threatSchool() {

    $.changing_schools = true;

    m('You\'re changing schools.');

    show('nicky','dinner_nicky_outrage');

    n('WHAT?!');
    m('I think it\'s not just Jack, it\'s the entire school that\'s a bad influence on you.');
    n('ARE YOU SERIOUS.');
    m('The whole Canadian culture is making you confused about who you are.');

    show('nicky','dinner_nicky_defiant');

    choose({
        'No, it\'s YOUR Asian culture that\'s backwards!': function(message) {
            n(message);
            m('Don\'t be so rude!');
            m('It\'s YOUR culture, too!');
            n('. . .');
            plotTwist();
        },
        'You can\'t do this to your CHILD!': function(message) {
            n(message);
            m('Don\'t be so rude!');
            m('I\'m your MOTHER, it\'s my right to do whatever I want with you!');
            n('. . .');
            plotTwist();
        },
        'Whatever, ALL schools have queer people.': function(message) {
            n(message);
            m('Don\'t be so rude!');
            m('And watch it, I could change my mind and start homeschooling you.');
            n('. . .');
            plotTwist();
        }
    });
}

function plotTwist() {

    m('Yesterday, when you were supposedly studying with Jack?');
    m('I know you secretly went off to watch a movie.');

    show('nicky','dinner_nicky_sit');
    n('. . .');

    show('clock_time','clock_1920');

    choose({
        'Oh my god. You read my texts.': function(message) {
            n(message);
            m('Yes. See how smart you can be when you\'re not with Jack?');
            plotTwist2();
        },
        'No, we didn\'t. We studied.': function(message) {
            n(message);
            m('You are a very stubborn boy.');
            m('I read your text messages.');
            plotTwist2();
        },
        'What makes you think that?': function(message) {
            n(message);
            m('Because I read your text messages.');
            plotTwist2();
        }
    });

}

function plotTwist2() {

    n('. . .');
    m('Before dinner. I was in your room.');

    // Dinner_1
    m('You yelled out \'' + $.what_you_called_out + '\' from downstairs, while I unlocked your phone...');
    m('And read what you and Jack have been sending to each other.');
    m('I\'m your mother. I have the right.');

    n('. . .');

    if($.im_a_poet)
        m('Weird poetry?');
    if($.hippies)
        m('Talking about smoking marijuana?');
    if($.im_a_poet || $.hippies) {
        m('Helping you lie to your own mother?');
        m('What else have you been doing behind my back?');
    }

    choose({
        'This has to be a bad dream.': function(message) {
            n(message);
            m('Like that \'Deception\' movie?');
            n('It\'s... it\'s \'Inception\'.');
            m('Don\'t talk back to me.');
            startDinner4();
        },
        'I\'m sorry. I\'m so sorry.': function(message) {
            n(message);
            m('I forgive you.');
            m('You\'re my child, of course I forgive you.');
            startDinner4();
        },
        'I hate you.': function(message) {
            n(message);
            m('That\'s okay.');
            m('I still love you, Nick.');
            startDinner4();
        }
    });
}
