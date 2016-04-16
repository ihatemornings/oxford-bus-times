$(function () {
    'use script';
    var url = 'http://www.buscms.com/api/REST/html/departureboard.aspx',
        data = {
            clientid: 'Nimbus',
            stopcode: getParameterByName('stopcode') || '69323498',
            sourcetype: 'siri',
            requestor: 'Netescape'
        };

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function Departure(el) {
        var departureTimeString;
        this.serviceName = $('.colServiceName', el).text();
        this.departureTime = $('.colDepartureTime', el).text();
        this.html = '<tr><th>' + this.serviceName + '</th><td>' + this.departureTime + '</td></tr>';
    }

    $.get(url, data, null, 'jsonp')
        .success(function (data) {
            var htmlResponse,
                stopName,
                departures = [],
                htmlTimes = '',
                d;

            stopName = data.match(/<tr class="rowStopName"><th colspan="3" title="([^"]*)">([^<]*)</)[2];

            data = data.replace('  <tr class="rowStopName"><th colspan="3" title="oxfadjda">Cumnor Hill Bottom</th><tr>  <tr class="textHeader"><th colspan="3">text 69323532 to 84637 for live times</th><tr>  <tr class="rowHeaders"><th>service</th><th>destination</th><th>time</th><tr>  ', '');
            htmlResponse = $(data)[0];

            $('.rowServiceDeparture', htmlResponse).each(function () {
                departures.push(new Departure(this));
            });

            for (d in departures) {
                htmlTimes += departures[d].html;
            }

            $("h1").text(stopName);
            $(".bus-times table").html(htmlTimes);
        });
});
