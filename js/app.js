// canvas pre requisite
var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');

var canvas_bg = document.getElementById('clock-background');
var ctx_bg = canvas_bg.getContext('2d');


// pad leading zeroes
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// add bit to screen
function bit(x, y, context, on, color1, color2, rad){
    var centerX = x * 65 + 60;
    var centerY = y * 100 + 50;
    var radius = rad;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    if (on) 
    {
        context.fillStyle = color1;
    }
    else
    {
        context.fillStyle = color2;
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
function place_bits(bitmap, context, color1, color2,rad)
{
    for (var i = 0; i < 6; i++){
        for (var j = 0; j < 4; j++){
            // console.log(bitmap[i][j]);
            bit(i, j, context, bitmap[i][j] == '1', color1, color2, rad);
        }
    }
}


// init
function init()
{
    
    var bg_bits = ["0011","1111","0111","1111","0111","1111"]
    place_bits(bg_bits, ctx_bg, '#AAA', 'transparent', 12);
    place_bits(get_bits(), ctx, '#0091EA', '#222', 10);
    // console.log(get_bits())
}

// init init
init();

// repeat init() indefinitely each second
setInterval(init, 1000)


// THIS IS LINE 97 IF YOU DID NOT EDIT ANYTHING
