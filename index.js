// Your code here
const createEmployeeRecord = (recArray) => {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (employee, arr) {
    const [date, hour] = arr.split(" ")
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    employee.timeInEvents.push(inEvent)
    
    return employee
}

const createTimeOutEvent = function (employee, arr) {
    const [date, hour] = arr.split(" ")
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    employee.timeOutEvents.push(outEvent)
    
    return employee
}

function hoursWorkedOnDate(obj, date) {
    const timeIn = obj.timeInEvents.find((e) => e.date === date).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(obj, date) {
    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, date)
    return wage * hoursWorked
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}
