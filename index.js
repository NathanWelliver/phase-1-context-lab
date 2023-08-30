/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    });
    return this;
}

function createTimeOutEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;

    return (timeOutHour - timeInHour) / 100; // Convert to hours
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;

    return hoursWorked * payRate;
}


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce(function (totalPayroll, employee) {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Export the functions
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
