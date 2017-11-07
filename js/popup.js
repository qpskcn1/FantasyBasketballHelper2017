chrome.storage.local.get(null, function(data) {
    if(typeof data == "undefined") {
        // That's kind of bad
    } else {
        output(data);
        //str = JSON.stringify(data)
        //document.getElementById("result").innerText = str;
    }
});


function output(data) {
    var content = ''
    $.each(data, function(date, value) {
        date = date.replace(/\s+/g, '');
        dateColumn = '<td><a href="' + value[1] + '">' + date +'</a></td>';
        StatusColumn = ""
        rowClass = 'active'
        if (value[0].length != 0) {
            StatusColumn = '<td>Alternate ' + value[0] + '</td>';
            rowClass = "danger"
        } else {
            StatusColumn += '<td>Success!</td>';
            rowClass = "success"
        }
        content += '<tr class=' + rowClass + '>' + dateColumn + StatusColumn + '</tr>';
    });
    $('tbody').append(content);
    var now = new Date();
    $('#time').append($('<p> Last Action: '+ now + '</p>'));
}

// Open link in a new tab
$(document).ready(function(){
    $('tr:gt(0)').on('click', function(){
        chrome.tabs.create({url: $(this).find('a').attr('href')});
        return false;
    }).hover( function() {
        $(this).toggleClass('hover');
    });

    $('a').on('click', function(){
        chrome.tabs.create({url:$(this).attr('href')});
        return false
    });
});
