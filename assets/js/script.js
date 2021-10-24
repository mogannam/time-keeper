// set the interval time to 5 minutes.
//1,000 milliseconds by 60 to convert it to 1 minute. 
//Then we multiply that minute by 5 to get a 5-minute timer.
var intGlb_interval = 1000*60*5; // 5000

// initialize a data structure for a task with some default values.
var moment_todayAdjustHr = moment().hour(9).format("hha")
moment_todayAdjustHr = moment().hour(9)
var obj_aTask = { aMoment: moment_todayAdjustHr, index:-5,hour:9, hourStr:"09am",text : "Nothing to do :("}

// an array of task objects that will be saved to local storage
var arrObj_tasksSaved = []
var date_rightNow = new Date();

// global variables for adjusting css code easily
var str_liCss = " list-group-item ";
var str_liCssHidden = " list-group-item d-none "
var str_textAreaCss = " task-cell col-9 "
var str_divHourCss = " hour-cell col "
var str_btnSaveCss = " button-cell col btn-info "
var str_cssLstGrpItemDanger = " bg-danger "
var str_cssLstGrpItemSuccess = " bg-success "
var str_cssLstGrpItemSecond = " bg-secondary "

var bool_dbg = false;

//  get the dynamic section of the html page we will update
// by injecting code onto it
var ul_taskList = $("#time-block")

// a function that either loads empty tasks, or pulls the tasks
// saved in local storage and injects it onto the page
var func_loadTaskList = ()=>{
    
    // an empty array of objects to hold what we pull from local storage
    var arrObj_temp = []
    var arr_temp = JSON.parse(localStorage.getItem("arrObj_tasksSaved"));
    
    // loop thru all 24 hours in a day
    for (var index = 0; index < 24; index++) {
        
        // if the hour is in a standard work day, add this code
        // this structure allows us to add the rest of the hours later
        // by adjusting the if statement.
        if(index >= 9 && index <= 17){

            // get the time right now to build a data structure for each task
            date_rightNow = new Date();
            var hourRightNow = moment(date_rightNow, "L").format("hha")
            var moment_temp = moment(date_rightNow)

            // get todays date, but adjust the hour to the ith hour
            // starting at 9am, 10am, ..... ith, 4pm, 5pm
            moment_temp.set('hour', index)
            moment_temp.set('seconds',0)
            moment_temp.set('minute',0)
            moment_temp.set('millisecond', 0);
            
            // create the task object data structure with default values
            obj_aTask = {aMoment:moment_temp, index:-1,hour:-1, hourStr:"-1am",text : "Nothing to do :("}
            
            // if there is cached data, load the cached data by overriding the default task.
            if(arr_temp[index]) 
                obj_aTask = arr_temp[index]

            var int_tempHour = index // for the ith hour update its real hour
            obj_aTask.hour = int_tempHour;
            
            // add a string to the task object formatted as hourDigit, hourDigit, AM or PM
            // i.e 09am, 12pm, 06am, 06pm
            obj_aTask.hourStr = moment_temp.format("hha")
            obj_aTask.index = index // update the task object with the correct index in the list
            
            // create a li element to inject onto the page
            var li_hourRow = $("<li>").addClass(str_liCss)
            li_hourRow.attr('id', `hour-${index}-row`)
            
            // create the task not input field
            var textArea_taskCell = $("<textarea>").addClass(str_textAreaCss)
            textArea_taskCell.attr('id', `task-cell-${index}`)
            textArea_taskCell.html(obj_aTask.text) // set the text to what is cached or default text
        
            // create the hour cell to inject on the page
            var Div_hourCell = $("<div>").addClass(str_divHourCss)
            Div_hourCell.attr('id', `hour-cell-${index}`)
            Div_hourCell.html(obj_aTask.hourStr) // set the text value to its correct ith hour

            // create the uique button to save the data when the user edits the task note.
            var btn_save = $("<button>").addClass(str_btnSaveCss)
            btn_save.attr('id', `btn-cell-${index}`)
            btn_save.html('Save')

            // create a empty div, so that we can use bootstrap to format the row
            var div_emptyContainer = $("<div>").addClass("row")
            //add our new elements to the empty div, filling it
            div_emptyContainer.append(Div_hourCell)
            div_emptyContainer.append(textArea_taskCell)
            div_emptyContainer.append(btn_save)
            // add the div to the li
            li_hourRow.append(div_emptyContainer)
            // add the li to the unorderred list that is already on the page
            ul_taskList.append(li_hourRow);
            
            //cache the data, we pulled from local storage into the global variable
            // this really only has a significant effect the first time the page is opened.
            arrObj_tasksSaved[index] = obj_aTask;

            //setting the arrObj_temp to this value is needed for the code to run properly
            // without this line. Sometimes when the page loads bada data is still saved in arrObj_temp
            arrObj_temp[index]= arrObj_tasksSaved[index]
            
            // cache the data in local storage. This only has high significance 
            // when the page is run for the very first time
            localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved)); 
        }
        else{
            // else we are not tracking the ith hour in the day.
            // so create an empty li, and hide it. This is needed, for the code to
            // execute properly. Without it we can't use jquery to grab the closest li
            // by its index on index.html.
            var li_hourRow = $("<li>").addClass(str_liCssHidden)
            li_hourRow.attr('id',`hour-${index}-row`)
            ul_taskList.append(li_hourRow);
        }
           
    }
    
    
    
    
}

var func_TodaysDate = ()=>{
    // load todays date onto the page dynamically
    var date_rightNowTemp = new Date();
    var time = moment(date_rightNowTemp, "L").format("dddd, MMMM, Do");
    
    $("#todays-date").replaceWith(time)
}

var func_auditTime = ()=>{
    // based on the global variable. AUdit the task hour and update the color coding.
    // the default is to check every 5 minutes.

    // get the time right now, and zero out the seconds, minutes, milleseconds
    // we only care about the hour
    date_rightNow = new Date();
    var moment_todayAdjustHr = moment().hour(14).format("hha")
    var hourRightNow = moment(date_rightNow, "L").format("hha")
    var momentRightNow = moment(date_rightNow).set('hour',hourRightNow )
    momentRightNow.set('seconds',0)
    momentRightNow.set('minute',0)
    
    // for evvery ith li item on the page, audit the li.
    arrObj_tasksSaved.forEach(element => {
        // reformat that time saved in our object, as a Moment data structure
        var tempMoment = moment(element.aMoment)

        // test the current time against our saved time stamp to see if
        // before -> gray
        // during -> red
        // after -> green
        var bool_isAfter = tempMoment.isAfter(momentRightNow, 'hour');
        var bool_isBefore = tempMoment.isBefore(momentRightNow, 'hour');
        var bool_isSame = tempMoment.isSame(momentRightNow, 'hour');
        
        var index = element.index
        //delete any old css code
        $(`#task-cell-${index}`).removeClass()
        if(element) // if element is not null
            if(bool_isSame) // if you are in the present, update css code to red
                $(`#task-cell-${index}`).addClass(str_cssLstGrpItemDanger+str_textAreaCss)
            if(bool_isAfter)// if you are in the future, update css code
                $(`#task-cell-${index}`).addClass(str_cssLstGrpItemSuccess+str_textAreaCss)
            if(bool_isBefore)// if you are in the past update css code
                $(`#task-cell-${index}`).addClass(str_cssLstGrpItemSecond+str_textAreaCss)
            
        
    });
}

// call helper functionns to dynamically update page
var func_loadTasks = ()=>{
    func_TodaysDate()
    func_loadTaskList();

};

// code used to save user input to page
var func_saveTask = (index)=>{
    var str_tempText = $(`#task-cell-${index}`).val()
    
    JSON.parse(localStorage.getItem("arrObj_tasksSaved"));
    
    arrObj_tasksSaved[index].text = str_tempText

    if(bool_dbg)console.log(arrObj_tasksSaved[index])
    localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved));


}

// add event listiner to the button, to save user data
$(".list-group").on("click", "button",
    ()=>{
        var index = "Null"
        index = $( event.target ).closest(".list-group-item").index();
        
        if(bool_dbg){
        console.log($(this).closest(".list-group-item"))
        console.log(event.target.id, event.target.className, index,$(this) )
        }
        func_saveTask(index)

    }
)

// set a timer and execute the audit functionby the defined time interval
// the default interval was 5 minutes
var func_startInterval = ()=>{
    
    setInterval(
        ()=>{
            //console.log("counting---------------")
            func_auditTime();
        },
        intGlb_interval);
   
}

func_loadTasks();
func_auditTime();
func_startInterval();

