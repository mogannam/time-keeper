
//var EmptyBtn = $("<button>")
var obj_aTask = {bool_empty:true, index:-5,hour:9, hourStr:"09am",text : "Nothing to do :("}

var arrObj_tasksSaved = []



var bool_dbg = true;

var ul_taskList = $("#time-block")

var func_freshTaskList = ()=>{
    var arrObj_temp = []
    for (var index = 0; index < 9; index++) {
        obj_aTask = {bool_empty:true, index:-1,hour:-1, hourStr:"-1am",text : "Nothing to do :("}
        // for a  9 to 5 job, make one task for every hour
        var int_tempHour = index+9
        obj_aTask.hour = int_tempHour;
        // the hour starts at 9am, but after 12
        // like a clock the hour starts at 1pm
        obj_aTask.hourStr = `${obj_aTask.hour}am`
        if(index === 0) obj_aTask.hourStr = `0${obj_aTask.hour}am`
        if(index > 3){
            int_tempHour -= 12
            obj_aTask.hour = int_tempHour;
            obj_aTask.hourStr = `0${obj_aTask.hour}pm`
        }
        obj_aTask.index = index
        

        
        
       

        var li_hourRow = $("<li>").addClass("list-group-item")
        li_hourRow.attr('id',`hour-${index}-row`)
        
        var textArea_taskCell = $("<textarea>").addClass("task-cell")
        textArea_taskCell.attr('id', `task-cell-${index}`)
        textArea_taskCell.html(obj_aTask.text)
       
        
        var Div_hourCell = $("<div>").addClass("hour-cell")
        Div_hourCell.attr('id', `hour-cell-${index}`)
        Div_hourCell.html(obj_aTask.hourStr)

        var btn_save = $("<button>").addClass("button-cell")
        btn_save.attr('id', `btn-cell-${index}`)
        btn_save.html('Save')

        
       


        li_hourRow.append(Div_hourCell)
        li_hourRow.append(textArea_taskCell)
        li_hourRow.append(btn_save)
        ul_taskList.append(li_hourRow);
        //arrObj_temp.push(obj_aTask)

        // console.log(index)
        // console.log(obj_aTask)
        
        arrObj_tasksSaved[index] = obj_aTask;
        arrObj_temp[index]= arrObj_tasksSaved[index]
        
          
    }
    localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved));
    
}

var func_loadCachTask= ()=>{

     //get cached task
     var arr_temp = JSON.parse(localStorage.getItem("arrObj_tasksSaved"));
     arr_temp.forEach(element => {
        // beg foreach loop
        var li_hourRow = $("<li>").addClass("list-group-item")
        li_hourRow.attr('id',`hour-${element.index}-row`)
        
        var textArea_taskCell = $("<textarea>").addClass("task-cell")
        textArea_taskCell.attr('id', `task-cell-${element.index}`)
        textArea_taskCell.html(element.text)
       
        var Div_hourCell = $("<div>").addClass("hour-cell")
        Div_hourCell.attr('id', `hour-cell-${element.index}`)
        Div_hourCell.html(element.hourStr)

        var btn_save = $("<button>").addClass("button-cell")
        btn_save.attr('id', `btn-cell-${element.index}`)
        btn_save.html('Save')

        li_hourRow.append(Div_hourCell)
        li_hourRow.append(textArea_taskCell)
        li_hourRow.append(btn_save)
        ul_taskList.append(li_hourRow);
        arrObj_tasksSaved[element.index] = arr_temp[element.index]
        
        
     }); // end for each loop
     localStorage.setItem("arrObj_tasksSaved", JSON.stringify(arrObj_tasksSaved));

    
}


var func_loadTasks = ()=>{
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
    
    console.log(`saving ${index} ${str_tempText}`)
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


func_loadTasks();
