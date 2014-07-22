// Denounement
// j("That mode of communication?"); j("It's imprecise, impersonal, impossible to truly connect.");

// Recap what happened.
// Who's to blame.
// All coming towards --> Break up now, or try to stay together?

// Love you, X. Love you, Y.
// IMMEDIATELY CUT TO NOW - WE BROKE UP.

function startJack2() {

    /////// SET UP SCENE ////////

    show('background', 'bedroom_2');
    show('us', 'bedroom_us_2');
    show('light', 'bedroom_light_2', {x: 0, y: 159});

    playSound('bg', 'bedroom_2', {loop: -1, volume: 0.5});

    if ($.punched)
        show('punch', 'bedroom_punch', {x: 256, y: 404});

    /////////////////////////////

    n('Hey Jack.');
    if($.sadsack)
        j('Hello, Nicky darling. Still a sad sack of sadness?');
    else
        j('Hello, Nicky darling.');

    j('How was coming out to your parents? Did I tell you so, or did I tell you so?');

    choose({
        'Jack... we messed up big time, Jack.': function(message) {
            n(message);
            j('No... no, no.');
            j('You\'re kidding me, right? What happened?');
            whatHappened();
        },
        'Things could have been worse.': function(message) {
            n(message);
            j('Oh. Oh no.');
            j('I didn\'t expect that they\'d... what... what happened?');
            whatHappened();
        },
        'Shut up, Jack.': function(message) {
            n(message);
            j('Ha, yes, I knew I was right!');
            n('No. Jack, we can\'t see each other ever again.');
            j('wait.');
            j('No, no, no. You\'re kidding me, right? What happened?');
            whatHappened();
        }
    });

}

function whatHappened() {

    if($.punched)
        choose({
            'My dad punched me in the face.': whatHappenedAbuse,
            'They\'re making me change schools.': whatHappenedSchool,
            'They read all our texts.': whatHappenedTexts
        });
    else if($.father_oblivious === false)
        choose({
            'My parents got verbally violent with each other.': whatHappenedAbuse,
            'They\'re making me change schools.': whatHappenedSchool,
            'They read all our texts.': whatHappenedTexts
        });
    else{
        n('Well, my dad\'s oblivious. For now. But my mom...');
        if($.changing_schools)
            choose({
                'She\'s making me change schools.': whatHappenedSchool,
                'She\'s setting me up with a girl I\'ve never met.': whatHappenedGirl,
                'She read all our texts.': whatHappenedTexts
            });
        else
            choose({
                'She got a tutor to kill all my after-school hours.': whatHappenedSchool,
                'She\'s setting me up with a girl I\'ve never met.': whatHappenedGirl,
                'She read all our texts.': whatHappenedTexts
            });
    }

}

function whatHappenedAbuse(message) {
    $.told_jack = 'abuse';

    n(message);
    j('Oh my god!');
    j('Nicky, you need to call Child Protective Services.');
    n('What?! No. That\'s way too much.');
    j('Just... okay, but at least promise me you\'ll visit the school counselor tomorrow?');
    n('Fine.');
    j('. . .');
    whatHappened2();
}
function whatHappenedSchool(message) {
    $.told_jack = 'school';

    n(message);
    j('No!');
    j('Why?! Why are they doing that?');
    n('Because \'Jack and the school is a bad influence on me\', or something. They just want to break us up.');
    j('That\'s horrible...');
    whatHappened2();
}
function whatHappenedGirl(message) {
    $.told_jack = 'girl';

    n(message);
    j('Ew, seriously?');
    n('Her name\'s Claire Something. She\'ll also be tutoring me.');
    j('Ew squared, they\'re also hooking you up with your own tutor?');
    n('Yup.');
    whatHappened2();
}
function whatHappenedTexts(message) {
    $.told_jack = 'texts';

    n(message);
    j('That is just plain rude!');
    j('wait, what will you do with these texts right now, then?');
    n('I can hide them better. My parents aren\'t exactly a tech-savvy bunch.');
    j('...just plain rude.');
    whatHappened2();
}

function whatHappened2() {

    n('And that\'s just one out of three crappy things that happened.');
    j('Nicky...');
    j('I am truly, truly apologetic.');
    j('This is my fault. I urged you to come out to your parents. Stupid me.');

    choose({
        'Yeah, stupid you.': function(message) {
            $.blame = 'jack';

            n(message);
            n('If you hadn\'t been all so \'ohhhh Nicky coming out is good for the soul\' and shit, this never would have...');
            j('. . .');
            n('I\'m sorry. You\'re the only person I can lash out on.');
            n('Isn\'t that just fucked up?');
            whatNow();
        },
        'No, it\'s THEIR fault.': function(message) {
            $.blame = 'parents';

            n(message);
            n('They already read our texts. Anything I would have said after that couldn\'t change what happened.');
            if($.told_jack!== 'texts')
                j('What! You didn\'t tell me they also read your texts!');
            else{
                j('And they\'re stuck in their old-fashioned moralities, the poor things.');
                n('I wouldn\'t go so far as to pity them.');
            }
            whatNow();
        },
        'No, this is all my fault.': function(message) {
            $.blame = 'nicky';

            n(message);
            n('I should have passcode-locked my phone, or use encrypted text, or hid it better...');
            if($.told_jack !== 'texts')
                j('They read your texts, too?...');
            j('Nicky, you had every right to trust them, they\'re your parents. They abused that trust. It\'s not your fault.');
            n('Yeah...');
            whatNow();
        }
    });
}

function whatNow() {

    j('. . .');

    n('You know... talking with my parents, it\'s like...');
    n('That mode of communication?');
    n('It\'s imprecise, impersonal, impossible to truly connect.');

    j('. . .');
    j('What now?');

    choose({
        'I\'m going to sabotage my parents\' plans.': function(message) {
            n(message);

            if($.told_jack === 'texts') {
                n('I\'ll set up a new email and virtual phone number to talk with you.');
                n('This way they can\'t spy on our communications anymore.');
            }else if($.told_jack === 'girl')
                n('I\'ll tell Claire everything. With any luck, she\'ll help me fight back.');
            else
                n("I'll figure out a way, somehow...");

            whatNow2();
        },
        'I\'ll visit the school counselor tomorrow.': function(message) {
            n(message);

            if($.told_jack === 'abuse')
                n('Like I promised. Like you made me promise.');
            else if($.told_jack === 'school')
                n('My current school, that is. I don\'t know how soon they\'ll be transferring me.');
            else
                n('At least they\'ll be someone else I can lash out on.');

            whatNow2();
        },
        'I\'m getting out of this house.': function(message) {
            n(message);

            n('Not running away, I mean. Although if I did I could crash at your place.');
            n('But anyway. I\'m going to try to get an internship or scholarship in the US.');
            n('And get far, far away from these people.');
            whatNow2();
        }
    });

}

function whatNow2() {

    j('No, I mean... what now, between us?');
    n('Jack...');
    j('What do we do? What... What happens?');
    n('. . .');

    choose({
        'We have to break up.': function(message) {
            $.breaking_up_soon = true;

            n(message);

            j('No, no no...');
            n('I can\'t do this to you, Jack. I can\'t pull you down with me.');
            j('At least, don\'t type \'we can still be friends\'.');
            n('we can still be frie');
            n('. . .');
            j('Because, of course we\'re friends. Of course we are.');
            n('. . .');
            whatNow3();
        },
        'We stick together as long as we can.': function(message) {
            n(message);

            j('. . .');
            j('As long as we can.');
            n('. . .');
            whatNow3();
        },
        'I don\'t know.': function(message) {
            $.breaking_up_soon = true;

            n(message);

            j('. . .');
            whatNow3();
        }
    });

}

function whatNow3() {

    n('It\'s late.');
    n('There\'s a lot I need to sleep on, now.');
    j('Okay.');
    j('. . .');
    j('I love you, Nicky.');
    n('I love you too, Jack.');

    var insult = '';
    if($.hippies) insult += ' new-age hippie';
    if($.im_a_poet) insult += ' amateur poet';
    if(insult !== '')
        n('You'+insult+'.');
    else
        n('You goof.');

    gameEnds();
}

function gameEnds() {
    wait(500);
    startOutro();
}
