var loadData = function(text) {
    $.get('data', {
        text: text,
    }, function(response) {
        console.log('Received data', response);
        var result = response[0] ? response[0].document['0'] : {
            creator: '',
            timestamp: '',
            text: '',
        };
        $('#creator').html(result.creator);
        $('#timestamp').html(result.timestamp);
        $('#text').html(result.text);
    });
}

var postData = function(text) {
    $.post('data', {
        text: text,
        timestamp: new Date(),
        creator: 'ValeryI'
    }, function(response) {
        console.log('Sent data', response);
        $('#result').html(JSON.stringify(response));
    }, 'json');
}

var handleEnter = function() {
    var action = $('input[name=option]:checked').val();
    var value = $('#value').val();
    if (action === 'find') {
        console.log('Finding value');
        loadData(value);
    } else if (action === 'add') {
        console.log('Adding value');
        postData(value);
    }
}

$('#value').keyup(function(e) {
    if (e.which === 13) {
        $(this).attr("disabled", "disabled");
        handleEnter();
        $(this).removeAttr("disabled");
    }
});