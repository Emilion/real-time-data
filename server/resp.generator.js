const MAX_RANDOM_TIME = 2000;
const DAY_CHANGES = 10;

var base_structure = [
    {
        key: {
            segmentNumber: 1, // internal segment id
            dayTimestamp: 1496181600000, // timestamp normalised to midnight
            timestamp: 1496181600000 // actual data-point timestamp
        },
        totalCallsAdded: 31,
        totalCallsRemoved: 28,
        segmentSize: 3
    },
    {
        key: {
            segmentNumber: 2, // internal segment id
            dayTimestamp: 1496268000000, // timestamp normalised to midnight
            timestamp: 1496268000000 // actual data-point timestamp
        },
        totalCallsAdded: 31,
        totalCallsRemoved: 28,
        segmentSize: 6
    }
];


/**
 *
 * @param selections
 */
function setRandomCalls(selections) {
    var lastDay = selections[(selections.length - 1)];
    lastDay.totalCallsAdded = lastDay.totalCallsAdded + randomNumber(1, 10);
    lastDay.totalCallsRemoved = lastDay.totalCallsRemoved + randomNumber(1, 10);
    lastDay.segmentSize = selections[selections.length - 2].segmentSize + (lastDay.totalCallsAdded - lastDay.totalCallsRemoved);
}

/**
 *
 * @param selections
 * @returns {*}
 */
function setNewDay(selections) {
    var newDay = Object.assign({}, selections[selections.length - 1]);
    newDay.totalCallsAdded = 0;
    newDay.totalCallsRemoved = 0;
    newDay.key.dayTimestamp = addDays(newDay.key.dayTimestamp, 1).getTime();
    newDay.key.timestamp = addDays(newDay.key.timestamp, 1).getTime();
    // newDay.key.segmentNumber++;
    selections.push(newDay);
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
        selectionData = base_structure,
        randomTime = 200, // initial delay. It would be updated in every next response
        timer;

    if (getAll === true) {
        return callback(selectionData);
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
            setNewDay(selectionData);
        } else {
            // update last record
            setRandomCalls(selectionData);
        }
        // execute callback
        var select = selectionData[selectionData.length - 1];
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
