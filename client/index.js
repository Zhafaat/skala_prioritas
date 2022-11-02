var deadlineList;
var doneList;
var PMList;
var PtMList;
var tPMList;
var tPtMList;
$(document).ready(async () => {
    getDatabase()
    refresh()
    
    $("#deadline-list-container").hide()
    $("#done-list-container").show()
    $("#prioritas-list-container").show()
    $("#deadline-button").click(() => {
        $("#deadline-list-container").show()
        $("#done-list-container").show()
        $("#prioritas-list-container").hide()
    })

    $("#prioritas-button").click(() => {
        $("#deadline-list-container").hide()
        $("#done-list-container").show()
        $("#prioritas-list-container").show()
    })

    $("#submit-button").click(async () => {
        var dataInput = {}
        if($("#judul").val() != ""){
            dataInput.title = $("#judul").val()
        }
        if($("#deadline").val() != ""){
            dataInput.deadlines = $("#deadline").val()
        }
        if($("#skala-prioritas").val() != ""){
            dataInput.priorityScale = $("#skala-prioritas").val()
        }
        if($("#catatan").val() != ""){
            dataInput.notes = $("#catatan").val()
        }
        // console.log(dataInput)
        // buat Object dataInput
        await submitNewData(dataInput)
        await refresh()
        $("#judul").val("")
        $("#deadline").val("")
        $("#catatan").val("")
    })

})

async function myFunction (){
    // console.log(event.target.value)
    // console.log(event.target.checked)
    await checked(event.target.value, event.target.checked)
    await refresh ()
}

async function getLost(ID){
    // console.log(ID)
    await deleteData(ID)
    await refresh ()
}

async function refresh (){
    await getDeadlineList()
    // console.log(deadlineList)
    $("#deadline-list").empty()
    $("#deadline-list").append(`<table id="deadline-table"></table>`)
    deadlineList.forEach(el => {
        $("#deadline-table").append(`<tr>
        <td><input type="checkbox" id="${el.ID}" onclick="myFunction()" name="${el.ID}" value="${el.ID}"></td>
        <td class="tooltip">${el.title}<span class="tooltiptext">${el.notes}</span></td>
        <td>${new Date(el.deadlines).toDateString()}</td>
        <td>(${el.priorityScale})</td>
        </tr>`)
    })
    // console.log("====== butuh id dan checked ======")
    await getDoneList()
    $("#done-list").empty()
    $("#done-list").append(`<table id="done-table"></table>`)
    doneList.forEach(el => {
        $("#done-table").append(`<tr>
        <td><input type="checkbox" id="${el.ID}" onclick="myFunction()" name="${el.ID}" value="${el.ID}" checked></td>
        <td class="tooltip">${el.title}<span class="tooltiptext">${el.notes}</span></td>
        <td>${new Date(el.deadlines).toDateString()}</td>
        <td>(${el.priorityScale})</td>
        <td><img src="https://freesvg.org/img/trash.png" alt="Buang" style="width:18px; margin-left: 20px;" onclick="getLost('${el.ID}')"></td>
      </tr>`)
    })

    await getPMList()
    $("#PM-list").empty()
    $("#PM-list").append(`<table id="PM-table"></table>`)
    PMList.forEach(el => {
        $("#PM-table").append(`<tr>
        <td><input type="checkbox" id="${el.ID}" onclick="myFunction()" name="${el.ID}" value="${el.ID}"></td>
        <td class="tooltip">${el.title}<span class="tooltiptext">${el.notes}</span></td>
        <td>${new Date(el.deadlines).toDateString()}</td>
      </tr>`)
    })

    await getPtMList()
    $("#PtM-list").empty()
    $("#PtM-list").append(`<table id="PtM-table"></table>`)
    PtMList.forEach(el => {
        $("#PtM-table").append(`<tr>
        <td><input type="checkbox" id="${el.ID}" onclick="myFunction()" name="${el.ID}" value="${el.ID}"></td>
        <td class="tooltip">${el.title}<span class="tooltiptext">${el.notes}</span></td>
        <td>${new Date(el.deadlines).toDateString()}</td>
      </tr>`)
    })

    await gettPMList()
    $("#tPM-list").empty()
    $("#tPM-list").append(`<table id="tPM-table"></table>`)
    tPMList.forEach(el => {
        $("#tPM-table").append(`<tr>
        <td><input type="checkbox" id="${el.ID}" onclick="myFunction()" name="${el.ID}" value="${el.ID}"></td>
        <td class="tooltip">${el.title}<span class="tooltiptext">${el.notes}</span></td>
        <td>${new Date(el.deadlines).toDateString()}</td>
      </tr>`)
    })

    await gettPtMList()
    $("#tPtM-list").empty()
    $("#tPtM-list").append(`<table id="tPtM-table"></table>`)
    tPtMList.forEach(el => {
        $("#tPtM-table").append(`<tr>
        <td><input type="checkbox" id="${el.ID}" onclick="myFunction()" name="${el.ID}" value="${el.ID}"></td>
        <td class="tooltip">${el.title}<span class="tooltiptext">${el.notes}</span></td>
        <td>${new Date(el.deadlines).toDateString()}</td>
      </tr>`)
    })
}

// function prioritas{}

function getDatabase(){
    $.get('http://localhost:4000/activity')
    .done(res => {
        console.log(res)
    })
    .fail(err => {
        console.log(err)
    })
}

function getDeadlineList(){
    return $.get('http://localhost:4000/deadline')
    .done(res => {
        // console.log(res)
        deadlineList = res
    })
    .fail(err => {
        console.log(res)
    })
}

function getDoneList(){
    return $.get('http://localhost:4000/done')
    .done(res => {
        // console.log(res)
        doneList = res
    })
    .fail(err => {
        console.log(err)
    })
}

function getPMList(){
    return $.get('http://localhost:4000/PM')
    .done(res => {
        // console.log(res)
        PMList = res
    })
    .fail(err => {
        console.log(err)
    })
}

function getPtMList(){
    return $.get('http://localhost:4000/PtM')
    .done(res => {
        // console.log(res)
        PtMList = res
    })
    .fail(err => {
        console.log(err)
    })
}
function gettPMList(){
    return $.get('http://localhost:4000/tPM')
    .done(res => {
        // console.log(res)
        tPMList = res
    })
    .fail(err => {
        console.log(err)
    })
}

function gettPtMList(){
    return $.get('http://localhost:4000/tPtM')
    .done(res => {
        // console.log(res)
        tPtMList = res
    })
    .fail(err => {
        console.log(err)
    })
}

function checked(ID, status){
    return $.ajax({
        method: 'PUT',
        url: `http://localhost:4000/list/${ID}`,
        crossDomain: true,
        data: {
            status: status
        },
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }).done(res => {
        // A = res
        console.log(res)
        // const obj = {
        //     Count : count,Name: name ,Kind: kind
        // }
        // data.push(obj)
    }).fail(err => {
        console.log(err)
    })
}
// title, deadline, priorityScale, notes = dataInput object
function submitNewData(dataInput){
    return $.post('http://localhost:4000/activity', dataInput)
    .done(res => {
        console.log(res)
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteData(ID){
    return $.ajax({
        url: `http://localhost:4000/delete/${ID}`,
        type: 'DELETE'
    }).done(res => {
        // A = res
        console.log(res)
        // const obj = {
        //     Count : count,Name: name ,Kind: kind
        // }
        // data.push(obj)
    }).fail(err => {
        console.log(err)
    })
}