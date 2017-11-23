const MAX_RANDOM_TIME = 2000;
const DAY_CHANGES = 10;

var base_structure = [
    {
        key: {
            segmentNumber: 188, // internal segment id
            dayTimestamp: 1496181600000, // timestamp normalised to midnight
            timestamp: 1496181600000 // actual data-point timestamp
        },
        totalCallsAdded: 31,
        totalCallsRemoved: 28,
        segmentSize: 17
    },
    {
        key: {
            segmentNumber: 189, // internal segment id
            dayTimestamp: 1496268000000, // timestamp normalised to midnight
            timestamp: 1496268000000 // actual data-point timestamp
        },
        totalCallsAdded: 31,
        totalCallsRemoved: 28,
        segmentSize: 17
    }
];


/**
 *
 * @param selections
 */
function setRandomCalls(selections) {
    var lastSelection = selections[(selections.length - 1)];
    lastSelection.totalCallsAdded = lastSelection.totalCallsAdded + randomNumber(-(lastSelection.totalCallsAdded/3), lastSelection.totalCallsAdded/3);
    lastSelection.totalCallsRemoved = lastSelection.totalCallsRemoved + randomNumber(-(lastSelection.totalCallsRemoved/3), lastSelection.totalCallsRemoved/3);
    lastSelection.segmentSize = selections[selections.length - 2].segmentSize + (lastSelection.totalCallsAdded - lastSelection.totalCallsRemoved);
}

/**
 *
 * @param selections
 * @returns {*}
 */
function setNewDay(selections) {

    var newSelection = Object.assign({}, selections[selections.length - 1]);
    newSelection.key.dayTimestamp = addDays(newSelection.key.dayTimestamp, 1).getTime();
    newSelection.key.timestamp = addDays(newSelection.key.timestamp, 1).getTime();
    newSelection.key.segmentNumber++;
    selections.push(newSelection);
}

/**
 * @param date
 * @param days
 * @returns {Date}
 */
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 *
 * @param min
 * @param max
 * @returns {number}
 */
function randomNumber(min, max) {
    if (min === 0 || max === 0) {
        min = max = 10;
    }
    var randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber > 200 || randomNumber < -200 ? randomNumber/3 : randomNumber;
}

/**
 *
 * @param getAll
 * @param callback
 */
module.exports = function (getAll, callback) {
    var count = 1,
        selections = base_structure,
        randomTime = 200, // initial delay. It would be updated in every next response
        timer;

    if (getAll === true) {
        return callback(selections);
    }
    /**
     *
     */
    var timerCallback = function () {
        randomTime = Math.round(Math.random() * MAX_RANDOM_TIME);
        count++;
        // should be configurable
        if (count > DAY_CHANGES) {
            count = 1;
            // set new record (day) to selection
            setNewDay(selections);
        } else {
            // update last record
            setRandomCalls(selections);
        }
        // execute callback
        var select = selections[selections.length - 1];
        console.log(JSON.stringify(select));
        callback(select);

        timer = setTimeout(timerCallback, randomTime);
    };
    /**
     *
     */
    timer = setTimeout(timerCallback, randomTime);
    return timer;
};
