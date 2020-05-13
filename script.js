var isGeohash2Coordinate = true;
var precision = 1;

$('#txtPrecision').val(precision);

$('#btnConvert').click(function () {
    var inputs = $('#txtInput').val().split('\n');
    var outputs = '';
    for (input of inputs) {
        if (isGeohash2Coordinate)
        {
            outputs += convertToCoordinate(input) + '\n';
        }
        else
        {
            outputs += convertToGeoHash(input) + '\n';
        }
    }
    $('#txtOutput').val(outputs);
});


$('#btnChangeDirection').click(function() {
    isGeohash2Coordinate = !isGeohash2Coordinate;
    $('#frmPrecision').toggle();
    if (isGeohash2Coordinate)
    {
        $('#txtInput').attr('placeholder', 'one geohash input per line');
        $('#lblInput').html("Geohash(es):");
        $('#lblOutput').html("Coordinate(s):");
    }
    else {
        $('#txtInput').attr('placeholder', 'one coordinate input per line: latitude, longitude, precision(optional)');
        $('#lblInput').html("Coordinate(s):");
        $('#lblOutput').html("Geohash(s):");        
    }
});

$('#btnClear').click(function() {
    $('#txtInput').val('');
    $('#txtOutput').val('');
});


function convertToCoordinate(input) {
    var coordinate = decodeGeoHash(input);
    if (!coordinate || !coordinate.latitude[2] || !coordinate.longitude[2]) {
        return '-=error=-';
    }
    return `${coordinate.latitude[2].toFixed(8)},${coordinate.longitude[2].toFixed(8)},${input.length}`;
}

function convertToGeoHash(input) {
    var inputArray = input.split(',');

    if (inputArray.length >= 2) {
        var lat = inputArray[0].trim();
        var lng = inputArray[1].trim();

        var coordinatePrecision = precision;
        if (inputArray.length > 2) {
            var coordinatePrecision = inputArray[2].trim();
        }

        if (/^(\-?\d+(\.\d+)?)$/.test(lat) && /^(\-?\d+(\.\d+)?)$/.test(lng)) {
            return encodeGeoHash(lat, lng, coordinatePrecision);
        }
    }
}


function validatePrecision() {
    var value = $('#txtPrecision').val();
    if (!value) {
        return '';
    }
    else if (!$.isNumeric(value)) {
        return 1;
    }
    else if (value > 12) {
        return 12;
    }
    else if (value < 1) {
        return 1;
    }

    return value;
}

$('#txtPrecision').change(function () {
    $('#txtPrecision').val(validatePrecision());
});

$('#txtPrecision').keyup(function () {
    $('#txtPrecision').val(validatePrecision());
});