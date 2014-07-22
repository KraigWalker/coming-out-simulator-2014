/*global window, Q, publish, requirejs, requestAnimationFrame, queue( */
/*
/*strict false */
////////////

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

var queueArray = [];
var timer = 0;
var ticker = 0;

function step(timestamp) {

    // Tick!
    publish('tick', []);

    // Do the next thing in the queue
    if (queueArray.length > 0) {
       ticker += 1000/60; // HARD CODED. So it pauses when you're away.
        while (queueArray.length > 0 && ticker > queueArray[0].time) { // For instantaneous events, like Show.
            var item = queueArray.shift();
            item.callback();
        }
    }
    requestAnimationFrame(step);
}
requestAnimationFrame(step);

////////////

function skipStep() {
    if (queueArray.length > 0) {
        var item = queueArray.shift();
        item.callback();
        ticker = item.time;
    }
}

function resetTimer() {
    timer = 0;
    ticker = 0;
}

var TIMER_GAP = 100;
function getDuration(message) {
    // Approx 6 words per second, or 160ms per word. Plus 800ms just in case.
    return 800 + message.split(' ').length * 160;
}

function queue(callback, duration, instantaneous) {
    duration = duration || 0;
    if (!instantaneous)
        timer += TIMER_GAP;

    queueArray.push({
        callback: callback,
        time: timer
    });
    timer += duration;
}

/**
 * Creates a new Character that can speak dialogue in the game
 * @param {Object} options [description]
 */
function Character(tempcharacter) {
    return function(message) {
        if(!message) return;
        queue(function() {
            publish('say', [tempcharacter, message]);
        },getDuration(message));
    };
}

function choose(choices) {
    queue(function() {
        publish('choose', [choices]);
        resetTimer();
    });
}

function show() {
    var args = arguments;
    queue(function() {
        publish('show', args);
    },0,true);
}
function playSound() {
    var args = arguments;
    queue(function() {
        publish('play', args);
    }, 0, true);
}
function stopSound() {
    var args = arguments;
    queue(function() {
        publish('stop', args);
    }, 0, true);
}

function wait(duration) {
    queue(function() {},duration);
}
function clear(duration) {
    wait(1000);
    queue(function() {
        publish('clear',[]);
    },duration);
    wait(1000);
}

var _resourcesLoaded = 0;
var _resourcePromises = [];
var _stills = {};
var _sprites = {};
var _sounds = {};

function _promiseLoadImage(src) {
    var deferred = Q.defer();
    var img = new Image();
    img.onload = function() {
        _resourcesLoaded++;
        publish('resourceLoaded',[]);
        deferred.resolve();
    };
    img.src = src;
    _resourcePromises.push(deferred.promise);
}

function still(label,src) {
    var img = new Image();
    img.src = src;
    _promiseLoadImage(src);
    _stills[label] = img;
}
function Background(label,src) {
    still(label,src);
}
function Sprite(label,options) {
    _promiseLoadImage(options.src);
    _sprites[label] = options;
}

createjs.Sound.alternateExtensions = ['mp3'];
function Sound(label,src) {

    var deferred = Q.defer();

    createjs.Sound.registerSound({
        id: label,
        src: src
    });

    (function(label) {
        createjs.Sound.addEventListener('fileload', function(event) {
            if (event.id === label){
                _resourcesLoaded++;
                publish('resourceLoaded',[]);
                deferred.resolve();
            }
        });
    })(label);

    _resourcePromises.push(deferred.promise);

}
