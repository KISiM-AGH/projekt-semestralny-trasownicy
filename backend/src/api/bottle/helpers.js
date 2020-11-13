function short_months(dt)
{
    Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Date.shortMonths[dt.getMonth()];
}
function formattedDate(){
    let dt = new Date();
    let day =  dt.getDate();
    if(day<10)
    {
        day = '0' + day.toString();
    }
    return day + '-' + short_months(dt) + '-' + dt.getFullYear()
}

const today = formattedDate()

module.exports = {today}
