let $ = require('jquery')
let fs = require('fs')
let file = 'data'

$('.errormessage').toggle(0);
//display error message
function check_errs(s) {
    let d = s.split(' ');
    $('.errormessage').toggle(d.length < 2);
    return d.length < 2;
}

//submit entry function
$('#submit1').on('click', ()=>{
	let name = $('#name1').val()
    let email = $('#email1').val()
    if (check_errs(name)) return;
    if(name == '' || email == '') return;
    fs.appendFile(file, name + " " + email + "\n");
	$('#name1').val("")
    $('#email1').val("")
})

//table generating functions
$('#get-info').on('click', ()=>{
	$('#mytable tbody>tr').remove()
    if(fs.existsSync(file)) {
        let data = fs.readFileSync(file, 'utf8').split('\n')
        
        data.forEach(function(s){
            let contact = s.split(' ')
            let name = contact[0] + " " + contact[1];
            let email = contact[2]
            if (contact[0] && contact[1])
                addEntry(name, email)
        })
    } 
})

function addEntry(name, email) {
    let s = "<tr><td>" + name + "</td><td>" + email + "</td></tr>"
    $('#info').append(s)
}

//mass tags
if(fs.existsSync(file)) {
    let data = fs.readFileSync(file, 'utf8').split('\n')
    let t = "<p> ";
    data.forEach(function(s){
        if (s == '') return;
    	let contact = s.split(' ');
    	t += contact[0] + " " + contact[1] + " &lt;" + contact[2] + "&gt;, "
    })
    t += "</p>"
	$('#list').append(t);
	$('#list').toggle(0);
}

$('#check1').click(function() {
    $("#list").toggle(this.checked);
});

$('#clear').on('click', ()=>{ 
    fs.writeFile(file, '', function(err){
        if (err)
            console.log(err);
    })
    $('#mytable tbody>tr').remove();
})

//Synchronous create file
function createFile () {
    if (!fs.existsSync(file)) {
        fs.writeFile(file, '', function(err) {
            if (err)
                console.log(err);
        })
    }
}
createFile();