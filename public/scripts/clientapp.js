$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#sql-form').find('input[type = text]').val('');

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendDom(data);
        }
    });
}

function appendDom(person){
    console.log(person);
    for(var i = 0; i < person.length; i++){

    $('.people').append('<div class="person"></div>');
    var $el = $('.people').children().last();

    $el.append('<p>' + person[i].name + '</p>');
    $el.append('<p>' + person[i].address + ' ' + person[i].city + ', ' + person[i].state + ' ' + person[i].zip_code + '</p>');
    }
}
