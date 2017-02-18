// canvas pre requisite
var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');


// pad leading zeroes
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// add bit to screen
function bit(x, y, context, on){
    var centerX = x * 100 + 50;
    var centerY = y * 100 + 50;
    var radius = 10;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    if (on) 
    {
        context.fillStyle = 'green';
    }
    else
    {
        context.fillStyle = 'red';
    }
    context.fill();
    // context.lineWidth = 5;
}

// convert decimal value to binary
function dec_to_bin(int){
    var msb = parseInt(Math.log2(int));
    var bin = '';

    for (var bit = msb; bit >= 0; bit--)
    {
        var diff = int - Math.pow(2, bit);
        if (diff < 0)
        {
            bin += '0';
        }
        else
        {
            bin += '1';
            int = diff;
        };
    }
    return pad(bin, 4);
}

// get time and convert to bits
function get_bits()
{
    var now = new Date();
    console.log(now);
    var h = pad(now.getHours().toString(), 2);
    var m = pad(now.getMinutes().toString(), 2);
    var s = pad(now.getSeconds().toString(), 2);
    var time = h + m + s;
    var result = [];
    for (var i = 0; i < 6; i++)
    {
        result.push(dec_to_bin(time[i]))
    }
    return result;
}


// place time bits on screen
function place_bits(bitmap)
{
    for (var i = 0; i < 6; i++){
        for (var j = 0; j < 4; j++){
            // console.log(bitmap[i][j]);
            bit(i, j, ctx, bitmap[i][j] == '1');
        }
    }
}


// init
function init()
{
    place_bits(get_bits());
}

// init init
init();

// repeat init() indefinitely each second
setInterval(init, 1000)


// THIS IS LINE 97 IF YOU DID NOT EDIT ANYTHING
