
sketch.default3d()
sketch.gldisable("lighting")
sketch.gldisable("light0")

post(jsarguments[1])
var bufferNameX
var bufferNameY
var Samples = 200
var bufX
var bufY
var viewMode = 0
draw()

function draw() {
  if ( !bufX || !bufY) {
    if ( !bufferNameX ) return
    if ( !bufferNameY ) return
    bufX = new Buffer(bufferNameX)
    bufY = new Buffer(bufferNameY)
  }

  with (sketch) {

    gldisable("depth_test")
    glenable("line_smooth")

    glpolygonmode("front", "line")
    glpolygonmode("back", "line")

    glclearcolor(0,0,0,1)
    glclear()

    gllinewidth(2)

    shapeslice(8, 4)

    shapeorient(0, 90, 0)
    glcolor(0, 0.5, 0)
    moveto(1, 0.5, 1)
    plane(1, 0.5, 1, 0.5)

    glcolor(0.2, 0.2, 0.6)
    moveto(0.5, 0, 1)
    shapeorient(90, 0, 90)
    plane(1, 0.5, 1, 0.5)

    shapeslice(4, 4)

    glcolor(0.9, 0.3, 0.3, 0.6)
    moveto(0.5, 0.5, 2)
    shapeorient(0, 0, 0)
    plane(0.5, 0.5, 0.5, 0.5)

    gllinewidth(3)

    var originalSamplesX = bufX.peek( 1, 0, Samples )
    var originalSamplesY = bufY.peek( 1, 0, Samples )
    var step = Math.ceil(Samples / 800)
    var samplesX = []
    var samplesY = []
    var j = 0;
    for (var i = 0; i < Samples; i += step) {
      samplesX[j] = -0.5 * originalSamplesX[i] + 0.5
      samplesY[j] =  0.5 * originalSamplesY[i] + 0.5
      j++
    }
    var len = j
    //Math.ceil(Samples / step)

    glcolor(.4, .9, .4, 0.6)
    moveto(1, samplesY[0], 0)
    for (var i = 1; i < len; i++) {
      var x = samplesX[i]
      var y = samplesY[i]
      var z = 2 * i / len
      lineto(1, y, z)
    }

    glcolor(.5, .5, .9, 0.6)
    moveto(samplesX[0], 0, 0)
    for (var i = 1; i < len; i++ ) {
      var x = samplesX[i]
      var y = samplesY[i]
      var z = 2 * i / len

      lineto(x, 0, z)
    }

    glcolor(0.8, 0.4, 0.4, 1)
    moveto(samplesX[0], samplesY[0], 2)
    for (var i = 1; i < len; i++) {
      var x = samplesX[i]
      var y = samplesY[i]

      lineto(x, y, 2)
    }

    shapeslice(2, 2)
    gllinewidth(1)
    glcolor( 1,1,1, 0.6 )
    moveto(samplesX[0], samplesY[0], 0)
    for (var i = 1; i < len; i++ ) {
      var x = samplesX[i]
      var y = samplesY[i]
      var z = 2 * i / len
      cube(0.01, 0.01, 0.01)
      lineto(x, y, z)
    }

    glmatrixmode("modelview")
    glloadidentity()
    switch (viewMode) {
    case 0:
      glulookat(
        -0.55, 0.8, -0.9,
        0.4, 0.4, 0.4,
        0, 1, 0
      )
      break;
    case 1:
      glulookat(
        3, 0.5, 1,
        0, 0.5, 1,
        0, 1, 0
      )
      break;

    case 2:
      glulookat(
        0.5, 3, 1,
        0.5, 0, 1,
        0, 1, 0
      )
      break;
    case 3:
      glulookat(
        0.5, 0.5, 3,
        0.5, 0.5, 0,
        0, 1, 0
      )
      break;

    }
  }
}

function setbuffer (bufX, bufY ) {
  bufferNameX = bufX
  bufferNameY = bufY
}

function setview (mode) {
  post('mode', mode, '\n')
  viewMode = mode
}

function setsamples (n) {
  Samples = n
}

function bang() {
  draw()
  refresh()
}

function onresize(w, h) {
  draw()
  refresh()
}
onresize.local = 1
