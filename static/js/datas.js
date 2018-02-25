var $items = $('#datasForTable');

$.ajax({
    dataType: "json",
    url: 'https://swapi.co/api/planets/?page=',
    success: function(datasForTable) {
        $.each(datasForTable.results, function(i, data){
            $items.append('<tr><td>' + data.name + '</td>' +
                          '<td>' + data.diameter + ' km' + '</td>' +
                          '<td>' + data.climate + '</td>' +
                          '<td>' + data.terrain + '</td>' +
                          '<td>' + data.surface_water + ' %' + '</td>' +
                          '<td>' + data.population + '</td>'
            );
            $('#previous').attr('ajax-target', datasForTable.previous);
            $('#next').attr('ajax-target', datasForTable.next);
        })
    }
});

function onPagerClick(){
	var $this = $(this);
	var newURL = $this.attr('ajax-target');
	if (newURL === null || newURL === undefined || newURL === ""){
	    return;
    }
    else {
        $.ajax({
            url: newURL,
            success: function (datasForTable) {
                $('#datasForTable').find('tr').remove();
                $.each(datasForTable.results, function (i, data) {
                    $items.append('<tr><td>' + data.name + '</td>' +
                        '<td>' + data.diameter + ' km' + '</td>' +
                        '<td>' + data.climate + '</td>' +
                        '<td>' + data.terrain + '</td>' +
                        '<td>' + data.surface_water + ' %' + '</td>' +
                        '<td>' + data.population + '</td>'
                    );
                    $('#previous').attr('ajax-target', datasForTable.previous);
                    $('#next').attr('ajax-target', datasForTable.next);
                });
            }
        })
    }
}



$('#previous').off();
$('#next').off();

$('#previous').click(onPagerClick);
$('#next').click(onPagerClick);