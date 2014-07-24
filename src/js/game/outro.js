// Then we broke up soon/X...
// Three stories (Lie / Truth / Half-truth) ... one interaction with each.
// Did you skip or not? Tie that into the sections.
// Your final choice, a whaaaaaat.

function startOutro() {

    // Just clear dialogue & stuff.
    queue(clearScene, 0);

    /////// SET UP SCENE ////////

    show('background', 'coffeehouse_2');
    show('cup', 'cup_steam', {x: 44, y: 359});
    show('nicky', 'coffee_nicky_still');

    playSound('bg', 'coffeehouse', {loop: -1, volume: 0.7});

    ///////////////////////////////

    if ($.breaking_up_soon)
        N('And then we broke up three days later.');
    else
        N('And then we broke up three weeks later.');

    // Weave - intro
    if ($.main_menu_convo_1 === 1) {
        p('. . .');
        N('Told you this didn\'t end in gay unicorns.');
    }else if ($.main_menu_convo_1 === 3) {
        p('. . .');
        N('Told you. Not blood, but tears.');
    }else if ($.main_menu_convo_2 === 1) {
        p('. . .');
        N('You were right. I\'m a bit of a downer.');
    }

    choose({
        'MY FEELS.':function(message) {
            p(message);
            N('Let the feels flow, my friend.');
            closure();
        },
        'Aw, come on, that\'s cold dude.':function(message) {
            p(message);
            N('I don\'t deny that.');
            closure();
        },
        'Can\'t say I didn\'t see that coming...':function(message) {
            p(message);
            N('Yeah... Jack and I saw it coming, too.');
            closure();
        }
    });

}

function closure() {

    playSound('sfx','coffee_sip');
    show('nicky','coffee_nicky_drink');
    show('cup',null);

    p('Ugh.');
    p('I feel gross just using the same-coloured dialogue balloons as the Father character.');

    show('nicky','coffee_nicky_still');
    show('cup','cup_steam');

    N('Which reminds me. Many of the characters have been swapped around.');
    N('All names have been changed, except mine.');
    N('I left my little brother out entirely, because he\'s innocent.');
    N('And I put my Father back in, even though he\'d left the family long before 2010.');

    if ($.main_menu_convo_2 === 3)
        N('Like you said, this \'true\' game is full of lies.');

    p('You could have at least given me a different colour.');
    N('It\'s been four years since that night...');
    N('What do you think happened afterwards?');

    if ($.main_menu_convo_2 === 2)
        N('Don\'t worry. Like we said in the Main Menu, there are no right answers.');

    $.coming_out_stories_left = 3;
    $.order_of_stories = [];

    choose({
        'Dude, I dunno, just freaking tell me.': function(message) {
            p(message);
            N('Alright, I will tell you what happened.');
            N('...and what happened, and what happened.');
            p('What.');
            closureStory();
        },
        'Let me guess, It Gets Better&trade;?': function(message) {
            p(message);
            N('Yes, actually! In all three versions of what happened.');
            p('What.');
            closureStory();
        },
        'Flowers and rainbows and gay unicorns?': function(message) {
            p(message);
            N('Yes, actually! At least, in one of my three versions of what happened.');
            p('Of course.');
            closureStory();
        }
    });

}

function closureStory() {

    if ($.coming_out_stories_left === 3) {
        N('Which post-coming-out story do you want to hear first?');
        N('Don\'t worry, you\'ll get to hear all three of them.');
    }else if ($.coming_out_stories_left === 2)
        N('Now, which version do you want to hear next?');
    else if ($.coming_out_stories_left === 1)
        N('Finally, let\'s hear the last story...');
    else {
        Finale_1();
        return;
    }

    $.coming_out_stories_left -= 1;

    var options = [];
    if (!$.told_story_lie) options['The Lie.']= tellMeALie;
    if (!$.told_story_truth) options['The Truth.'] = tellMeATruth;
    if (!$.told_story_half_truth) options['The Half-Truth.'] = tellMeAHalfTruth;
    choose(options);
}

function isLastStory() {
    if ($.coming_out_stories_left === 0)
        if ($.asked_about && $.asked_credits)
            p('Again, with the making the only option a clickable option...');
        else {
            p('Why did you make that a clickable option, when it was the only option left.');
            N('No idea. Moving on.');
        }
}

function tellMeALie(message) {

    $.told_story_lie = true;
    $.order_of_stories.push('lie');

    playSound('sfx','coffee_sip');
    show('nicky','coffee_nicky_drink');
    show('cup',null);
    p(message);
    show('nicky','coffee_nicky_still');
    show('cup','cup_steam');

    N('Very well.');
    isLastStory();

    N('I ran away from home, with nothing more than a luggage bag full of edible underwear.');
    if ($.im_a_poet)
        N('I roamed the Great White North. Supporting myself by writing amateur poetry for strangers.');
    else
        N('I roamed the Great White North. Supporting myself by making not-fun web games.');

    N('I ate flowers. Followed the rainbows. And befriended a homosexual unicorn.');
    p('. . .');
    N('Eventually I made it to Alaska, where I met an adult bisexual couple named Bonnie & Clyde.');
    N('Bonnie was a mid-30s cougar, and Clyde was an early-40s manther.');

    // FAMILY WITH BENEFITS
    // Weave in -- top or bottom

    choose({
        'I guess edible undies are both food & clothing.': function(message) {
            $.outro_convo_lie = 1;
            p(message);
            N('And thanks to my flexibility, the luggage bag doubles as housing!');
            tellMeALie2();
        },
        'This story is a fractal of fracked up.': function(message) {
            $.outro_convo_lie = 2;
            p(message);
            N('MY STORY. MY RULES.');
            tellMeALie2();
        },
        '...\'manther\'.': function(message) {
            $.outro_convo_lie = 3;
            p(message);
            N('Also known as a faguar.');
            tellMeALie2();
        }
    });
}
function tellMeALie2() {

    N('They took me in as their foster child, and I was their full-time boytoy.');

    if ($.outro_convo_lie==1)
        p('...Thanks again to your, uh, flexibility.');

    switch ($.top_or_bottom) {
        case 'top': N('As we know, I like having my partners be \'the woman\' of a relationship.'); break;
        case 'bottom': N('As we know, I\'m usually \'the woman\' of a relationship.'); break;
        case 'versatile': N('As we know, I like taking turns at being \'the woman\' of a relationship.'); break;
    }

    N('They raised me, showed me love, and I grew up to be a productive member of society.');

    switch ($.outro_convo_lie) {
        case 2: p('And when you zoom in on this fractal, there\'s MORE fracked-up-ness.'); break;
        case 3: p('...\'MANTHER\'.'); break;
    }

    N('They were my new family.');
    N('Family... with benefits.');

    p('. . .');

    closureStory();

}

function tellMeATruth(message) {

    $.told_story_truth = true;
    $.order_of_stories.push('truth');

    playSound('sfx','coffee_sip');
    show('nicky','coffee_nicky_drink');
    show('cup',null);
    p(message);
    show('nicky','coffee_nicky_still');
    show('cup','cup_steam');

    N('Here it goes.');
    Is_Last_Story();

    N('I took Jack\'s advice and parodied Inception in my \'odd web game\', Reimagine :The Game:.');
    switch($.inception_answer) {
        case 'awake': N('Didn\'t say that Cobbs was awake in the ending, though.'); break;
        case 'dream': N('Didn\'t say that the movie was all just a dream, though.'); break;
        case 'neither': N('Still think it doesn\'t matter if Cobbs was still dreaming.'); break;
    }
    N('Reimagine :The Game: got internet-famous-ish! A good portfolio piece.');
    N('A few months later, I landed an internship at Electronic Arts in the Bay Area. Far away from my family in Canada.');

    choose({
        'Eww, Electronic Arts...?': function(message) {
            $.outro_convo_truth = 3;
            p(message);

            N('Yeah, I know, I know.');
            N('I\'m now repenting for my sins by making artsy-fartsy indie games like this one.');
            p('Repent harder, dammit.');
            tellMeATruth2();
        },
        'And the Bay Area is very LGBT friendly.': function(message) {
            $.outro_convo_truth = 2;
            p(message);

            N('That\'s why they call it the Gay Area!');
            p('Uh.. nobody calls it that.');
            tellMeATruth2();
        },
        'Oh, I love EA! They make The Sims, right?': function(message) {
            $.outro_convo_truth = 1;
            p(message);

            N('Yup! I didn\'t work on those, though. Our team was making a web game version of--');
            N('[LITERALLY CANNOT DISCLOSE]');
            p('Oh.');
            tellMeATruth2();
        }
    });

}
function tellMeATruth2() {

    N('After EA, I went on to go indie.');
    N('But I stayed in touch with friends at EA, and stayed in the Bay Area.');

    N('My technical skills grew.');
    N('My social skills grew.');
    N('And here... I\'m finally starting to figure out my identity.');

    switch($.outro_convo_truth) {
        case 1: p('Well, I\'m looking forward to Literally Cannot Disclose: The Game.'); break;
        case 2: p('But seriously, no one calls it the Gay Area.'); break;
        case 3: p('But seriously, ew. Electronic Arts.'); break;
    }

    closureStory();

}

function tellMeAHalfTruth(message) {
    $.told_story_half_truth = true;
    $.order_of_stories.push('half-truth');

    playSound('sfx','coffee_sip');
    show('nicky','coffee_nicky_drink');
    show('cup',null);
    p(message);
    show('nicky','coffee_nicky_still');
    show('cup','cup_steam');

    N('As you wish.');
    Is_Last_Story();

    N('Claire, in an ironic twist of fate, was also bisexual.');
    N('We told each other about it during a '+$.studying_subject+' study session.');

    p('What a twist!');

    N('Claire was insecure about her sexual orientation, like me.');
    N('We were both somewhat inexperienced. Claire\'s only been with women, and I\'ve only been with Jack.');

    // CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
    // Weave in -- studying what

    choose({
        'A mirror version of you, but reversed...': function(message) {
            $.outro_convo_half_truth = 1;
            p(message);
            N('Well, uh, all mirror images are reversed.');
            p('You know what I mean.');
            N('But yeah, Claire and I shared our experiences with one another.');
            tellMeAHalfTruth2();
        },
        'So, you taught each other the other side?': function(message) {
            $.outro_convo_half_truth = 3;
            p(message);
            tellMeAHalfTruth2();
        },
        'Did you end up having sexytimes together?': function(message) {
            $.outro_convo_half_truth = 2;
            p(message);
            N('No. She\'s like a sister to me. A sister I would not have sex with.');
            p('You... did not need to clarify that.');
            N('But yeah, Claire and I shared our experiences with one another.');
            tellMeAHalfTruth2();
        }
    });

}
function tellMeAHalfTruth2() {

    N('And exchanged tips!');
    N('Like... do a \'come hither\' motion with your fingers, or, rub the head against the roof of your mouth.');
    p('T.M.I, dude...');

    if ($.changing_schools || !$.father_oblivious)
        N('I did move to her school, in the end.');

    N('We were best friends. We still are! We\'ve now both moved to the US, far away from our hateful families.');
    N('Together, we helped each other overcome our insecurities, and discover who we were...');
    N('Proud bisexual sluts.');

    p('What a touching story. I think.');

    N('And of course, we wingman/wingwoman for each other.');

    p('. . .');

    closureStory();

}

function finale1() {

    N('And that\'s the last of the post-coming-out stories!');

    // HACK - Just clear dialogue & stuff.
    wait(1000);
    queue(clearDialogue,0);

    show('cup',null);
    show('nicky','coffee_nicky_throw');
    playSound('sfx','coffee_throw');

    wait(1000);
    show('nicky','coffee_nicky_still_2');

    //////////////////////////

    N('Dear player, I couldn\'t help but notice...');
    if($.order_of_stories[0]=='truth')
        N('You went straight for the Truth first.');
    else if ($.order_of_stories[2]=='truth')
        N('You saved the Truth for last.');
    else if ($.order_of_stories[0]=='lie')
        N('You wanted to hear the Lie first.');
    else
        N('You saved the Lie for last.');
    N('What does that say about you?...');
    p('. . .');

    p('You know... usually when a game gives you multiple endings, they don\'t do them ALL AT ONCE.');
    N('Hah! You thought these were ENDINGS?');

    choose({
        'Let me guess... This Is Just The Beginning?': function(message) {
            p(message);
            N('This is just the begi-- oh. Okay, yeah.');
            finale2();
        },
        'Well yeah. This game\'s over, right?': function(message) {
            p(message);
            N('True... but the story, which is my story, my life, continues.');
            finale2();
        },
        'oh god how long IS this damn game.': function(message) {
            p(message);
            N('Don\'t worry. Your next choice is the very last one, I swear.');
            finale2();
        }
    });

}

function finale2() {

    show('nicky','coffee_nicky_packup_1');

    N('. . .');
    N('You know, if I could go back and relive all my other possible choices...');
    N('... which in a sense, I did, by writing this game...');
    N('... I wouldn\'t change a thing.');

    show('nicky','coffee_nicky_packup_2');

    // SERIOUSNESS.
    playSound('sfx','laptop_shut');
    playSound('bg','bedroom_1',{loop:-1, volume:0.4});

    p('? ? ?');

    if ($.punched)
        N('My texts getting read. Being forced to change schools. Getting punched in the face.');
    else if ($.father_oblivious === false)
        N('My texts getting read. Being forced to change schools. All the verbal abuse.');
    else if ($.changing_schools)
        N('My texts getting read. Being forced to change schools. The attempted \'gay rehab\' with Claire.');
    else
        N('My texts getting read. No more after-school hours to myself. The attempted \'gay rehab\' with Claire.');

    N('In a Stockholm Syndrome sort of sense... I\'m grateful for it all.');

    choose({
        'what.': finale3,
        'whaaat.': finale3,
        'whaaaaaaaaaaaaaaat.': finale3
    });

}

function finale3(message) {

    p(message);

    playSound('sfx','laptop_pack');
    show('nicky','coffee_nicky_packup_3');

    N('Yes, really!');
    N('I wouldn\'t have been so motivated to forge my own life... if my previous life wasn\'t total utter shit.');

    playSound('sfx','laptop_pack_2');
    show('nicky','coffee_nicky_packup_4');

    N('Later in 2010, Dan Savage launched the It Gets Better&trade; campaign.');
    N('My three stories... Lie, Truth, Half-Truth... they\'re all at least true about one thing.');
    N('It does get better.');

    p('. . .');

    N('And...');
    N('At the end...');
    N('Of this long, stupid, painful game...');
    N('Where I played against people who should have been on my side...');

    p('. . .');

    N('I won.');
    N('. . .');
    N('I won.');

    // HACK - Just clear dialogue & stuff.
    wait(1000);
    queue(clearDialogue,0);

    // CUTSCENE -- MY NEW BOYFRIEND
    wait(1000);

    playSound('sfx2','laptop_pack');
    show('nicky','coffee_nicky_date_1');
    wait(1000);

    playSound('sfx','step_2');
    show('nicky','coffee_nicky_date_2');
    wait(1000);

    playSound('sfx','step_1');
    show('nicky','coffee_nicky_date_3');
    wait(1000);

    playSound('sfx','step_2',{volume:0.75});
    show('nicky','coffee_nicky_date_4');
    wait(1000);

    playSound('sfx','step_1',{volume:0.5});
    show('nicky',null);
    wait(1000);

    playSound('sfx','step_2',{volume:0.25});
    choose({
        'REPLAY?': finale4
    });

}
function finale4(message) {

    p(message);
    N('Real life has no replays.');

    wait(800);
    queue(function() {
        document.getElementById('game').setAttribute('screen','blank');
    },1000);
    //queue(clearScene,0); // coz the sound's cool!
    queue(function() {
        document.getElementById('game').setAttribute('screen','credits');
    },0);
}
