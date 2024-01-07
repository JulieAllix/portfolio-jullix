const { Interval } = require("luxon");

// adjust this for your exact needs
function* days(interval) {
    let cursor = interval.start.startOf("day");
    while (cursor <= interval.end) {
        yield cursor.toJSDate();
        cursor = cursor.plus({ days: 1 });
    }
}

export function daysInRange(start: Date, end: Date) {
    let interval = Interval.fromDateTimes(start, end);
    return Array.from(days(interval));
}

