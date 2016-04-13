$(document).ready(function() {
    populateTable();

});
function populateTable() {
    var tableContent = '';
    $.getJSON( '/users/userlist', function( data ) {
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.surname + '</td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);
    });
};

function postUser(name, surname){
    var person = {"name": name, "surname": surname};
    $.ajax({
        type: 'PUT',
        data: person,
        url: '/users/userlist',
        dataType: 'JSON'
    }).done(function(res){
        console.log('done');
    }).fail(function(res){
        console.log('fail');
    });
}

$('#btnAddUser').on('click', null, function(){
    var name = document.getElementById('inputUserName').value;
    var surname = document.getElementById('inputUserSurname').value;
    console.log(name + " " + surname);
    if (name === '' || surname === ''){
        document.getElementById('helloUser').innerHTML = 'You must provide name and surname!';
    } else {
        document.getElementById('helloUser').innerHTML = 'Hello ' + name + ' ' + surname + '!';
        postUser(name, surname);
    }
    populateTable();
});