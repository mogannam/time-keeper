
//var EmptyBtn = $("<button>")
var obj_aTask = {index:-1,hour:9, hourStr:"09am",text : "Nothing to do :("}
var arrObj_tasksSaved = []
var bool_dbg = true;

var div_taskList = $("<div>")
div_taskList.addClass("container")

var func_loadTasks = ()=>{
    // .ready waits until the page is ready for manipulation
    // then this function can execute
    // uses a Java sccript 6 short hand arrow function to save on writing code
    for (let index = 9; index < 18; index++) {
        // for a  9 to 5 job, make one task for every hour
        obj_aTask.hour = index;
        // the hour starts at 9am, but after 12
        // like a clock the hour starts at 1pm
        obj_aTask.hourStr = `${index}am`
        if(index === 9) obj_aTask.hourStr = `0${index}am`
        if(index > 12){
            obj_aTask.hour = index - 12;
            obj_aTask.hourStr = `0${obj_aTask.hour}pm`
        }
        obj_aTask.index = index
        arrObj_tasksSaved[index] = obj_aTask;
        if(bool_dbg)console.log(`${obj_aTask.hour} : ${obj_aTask.text}`)

        var div_hourRow = $("<div>").addClass("hour row")
        div_hourRow.attr('id',`hour-${index}-row`)
        
        var textArea_taskCell = $("<textarea>").addClass("task-cell col")
        textArea_taskCell.attr('id', `task-cell-${index}`)
        textArea_taskCell.html(obj_aTask.text)
       
        
        var Div_hourCell = $("<div>").addClass("hour-cell")
        Div_hourCell.attr('id', `hour-cell-${index}`)
        Div_hourCell.html(obj_aTask.hourStr)

        var btn_save = $("<button>").addClass("button-cell")
        btn_save.attr('id', `btn-cell-${index}`)
        btn_save.html('Save')
       


        div_hourRow.append(Div_hourCell)
        div_hourRow.append(textArea_taskCell)
        div_hourRow.append(btn_save)
        div_taskList.append(div_hourRow);
    }
    $("#time-block").append(div_taskList)

    

};

$(".time-block").click(
    ()=>{
        console.log(event.target.id, event.target.className)
    }
)


func_loadTasks();
