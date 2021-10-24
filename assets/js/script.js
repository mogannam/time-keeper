
//var EmptyBtn = $("<button>")
var moment_todayAdjustHr = moment().hour(9).format("hha")
moment_todayAdjustHr = moment().hour(9)
var obj_aTask = { aMoment: moment_todayAdjustHr, index:-5,hour:9, hourStr:"09am",text : "Nothing to do :("}

var arrObj_tasksSaved = []
var date_rightNow = new Date();



var bool_dbg = false;

var ul_taskList = $("#time-block")

var func_freshTaskList = ()=>{
    if(bool_dbg)console.log("in func_freshTaskList ")
    var arrObj_temp = []
    
    
    for (var index = 0; index < 24; index++) {
        
        if(index >= 9 && index <= 17){

            date_rightNow = new Date();
            var hourRightNow = moment(date_rightNow, "L").format("hha")
            var moment_temp = moment(date_rightNow)
            moment_temp.set('hour', index)
            moment_temp.set('seconds',0)
            moment_temp.set('minute',0)
             moment_temp.set('millisecond', 0);
            
            obj_aTask = {aMoment:moment_temp, index:-1,hour:-1, hourStr:"-1am",text : "Nothing to do :("}
            // for a  9 to 5 job, make one task for every hour
            var int_tempHour = index
            obj_aTask.hour = int_tempHour;
            // the hour starts at 9am, but after 12
            // like a clock the hour starts at 1pm
            obj_aTask.hourStr = moment_temp.format("hha")
            obj_aTask.index = index
             
            var li_hourRow = $("<li>").addClass("list-group-item")
            li_hourRow.attr('id', `hour-${index}-row`)
            
            
            var textArea_taskCell = $("<textarea>").addClass("task-cell col")
            textArea_taskCell.attr('id', `task-cell-${index}`)
            textArea_taskCell.html(obj_aTask.text)
        
            
            var Div_hourCell = $("<div>").addClass("hour-cell col")
            Div_hourCell.attr('id', `hour-cell-${index}`)
            Div_hourCell.html(obj_aTask.hourStr)

            var btn_save = $("<button>").addClass("button-cell col")
            btn_save.attr('id', `btn-cell-${index}`)
            btn_save.html('Save')

            var div_emptyContainer = $("<div>").addClass("row")
            div_emptyContainer.append(Div_hourCell)
            div_emptyContainer.append(textArea_taskCell)
            div_emptyContainer.append(btn_save)
            li_hourRow.append(div_emptyContainer)
            ul_taskList.append(li_hourRow);
            //arrObj_temp.push(obj_aTask)

            // console.log(index)
            // console.log(obj_aTask)
            
            arrObj_tasksSaved[index] = obj_aTask;
            arrObj_temp[index]= arrObj_tasksSaved[index]
        
            localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved)); 
        }
        else{
            
            var li_hourRow = $("<li>").addClass(" list-group-item d-none")
            li_hourRow.attr('id',`hour-${index}-row`)
            ul_taskList.append(li_hourRow);
        }
           
    }
    var moment_todayAdjustHr = moment().hour(14)
    console.log(moment_todayAdjustHr)
    
    
    
}

var func_loadCachTask= ()=>{
    if(bool_dbg)console.log('in func_loadCachTask')
    //get cached task
    var arr_temp = JSON.parse(localStorage.getItem("arrObj_tasksSaved"));
    for(var index = 0; index < arr_temp.length; index++) {
    // beg foreach loop
    var element = arr_temp[index]
    if(element){ 
        // The calendar only runs from 9am to 5pm, if other hours are null do nothing
        // if the hours are not null, i.e the element is full execute code
        var li_hourRow = $("<li>").addClass(" list-group-item")
        li_hourRow.attr('id',`hour-${element.index}-row`)
            
        var textArea_taskCell = $("<textarea>").addClass("task-cell col")
            textArea_taskCell.attr('id', `task-cell-${index}`)
           
            textArea_taskCell.html(element.text)
        
            
            var Div_hourCell = $("<div>").addClass("hour-cell col")
            Div_hourCell.attr('id', `hour-cell-${index}`)
            Div_hourCell.html(element.hourStr)

            var btn_save = $("<button>").addClass("button-cell col")
            btn_save.attr('id', `btn-cell-${index}`)
            btn_save.html('Save')

            var div_emptyContainer = $("<div>").addClass("row")
            div_emptyContainer.append(Div_hourCell)
            div_emptyContainer.append(textArea_taskCell)
            div_emptyContainer.append(btn_save)
            li_hourRow.append(div_emptyContainer)
            ul_taskList.append(li_hourRow);
            arrObj_tasksSaved[element.index] = arr_temp[element.index]
        }
        else{
            
            
            var li_hourRow = $("<li>").addClass("list-group-item d-none")
            li_hourRow.attr('id',`hour-${index}-row`)
            ul_taskList.append(li_hourRow);
            
        }
    
    } // end for each loop
    localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved));

    
}

var func_TodaysDate = ()=>{
    var date_rightNowTemp = new Date();
    var time = moment(date_rightNowTemp, "L").format("dddd, MMMM, Do");
    
    $("#todays-date").replaceWith(time)
}

var func_auditTime = ()=>{
    date_rightNow = new Date();
    var moment_todayAdjustHr = moment().hour(14).format("hha")
    var hourRightNow = moment(date_rightNow, "L").format("hha")
    var momentRightNow = moment(date_rightNow).set('hour',hourRightNow )
    momentRightNow.set('seconds',0)
    momentRightNow.set('minute',0)
    
    //if(bool_dbg)console.log(arrObj_tasksSaved)
    arrObj_tasksSaved.forEach(element => {
        var tempMoment = moment(element.aMoment)
        var bool_isAfter = tempMoment.isAfter(momentRightNow, 'hour');
        var bool_isBefore = tempMoment.isBefore(momentRightNow, 'hour');
        var bool_isSame = tempMoment.isSame(momentRightNow, 'hour');
        
        var index = element.index
        
        if(element) // if element is not null
            if(bool_isSame)
                $(`#hour-${index}-row`).addClass("list-group-item-danger")
            if(bool_isAfter)
                $(`#hour-${index}-row`).addClass("list-group-item-success")
            if(bool_isBefore)
                $(`#hour-${index}-row`).addClass("list-group-item-secondary")
            
        
    });
}

var func_loadTasks = ()=>{
    func_TodaysDate()

    if(bool_dbg)console.log("in func_loadTasks")
    // .ready waits until the page is ready for manipulation
    // then this function can execute
    // uses a Java sccript 6 short hand arrow function to save on writing code
    var arr_temp = JSON.parse(localStorage.getItem("arrObj_tasksSaved"));
    
    if(!arr_temp)func_freshTaskList();
    else{
        func_loadCachTask()
    }
    
    


    

};

var func_saveTask = (index)=>{
    var str_tempText = $(`#task-cell-${index}`).val()
    
    if(bool_dbg)console.log(`saving ${index} ${str_tempText}`)
    JSON.parse(localStorage.getItem("arrObj_tasksSaved"));
    
    arrObj_tasksSaved[index].text = str_tempText
    if(bool_dbg)console.log(arrObj_tasksSaved[index])
    localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved));


}

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

var func_startInterval = ()=>{
    
    setInterval(
        ()=>{
            console.log("counting---------------")
            func_auditTime();
        },
        5000);
   
}




func_loadTasks();
func_auditTime();
//func_startInterval();

