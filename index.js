/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (overall) {
    return {
        firstName: overall[0],
        familyName: overall[1],
        title: overall[2],
        payPerHour: overall[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (everything) {
    return everything.map(function (overall) {
        return createEmployeeRecord(overall)
        })
}

let createTimeInEvent = function (dateStamp) {
    let hour = dateStamp.split(" ")[1]
    let event = {
        type: "TimeIn",
        date: dateStamp.split(" ")[0],
        hour: parseInt(hour),
    }
    this.timeInEvents.push(event)
    return this
}

let createTimeOutEvent = function (dateStamp) {
    let hour = dateStamp.split(" ")[1]
    let event = {
        type: "TimeOut",
        date: dateStamp.split(" ")[0],
        hour: parseInt(hour),
    }
    this.timeOutEvents.push(event)
    return this
}

let hoursWorkedOnDate = function (date) {
    let hourIn = this.timeInEvents.find((event) => event.date === date).hour
    let hourOut = this.timeOutEvents.find((event) => event.date === date).hour
    let hoursWorked = (hourOut - hourIn) / 100
    return hoursWorked
}

let wagesEarnedOnDate = function (date) {
    let hours = hoursWorkedOnDate.call(this, date)
    let money = this.payPerHour
    return hours * money
}

let findEmployeeByFirstName = function (arr, firstName) {
    return arr.find(function (rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function (records) {
    let total = records.reduce(function (memo, record) {
        return memo + allWagesFor.call(record)
    }, 0)
    return total
}