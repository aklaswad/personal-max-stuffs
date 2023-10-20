
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
var walkerTick = 0
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
    moveto(1, 0, 0)
    plane(2, 1, 2, 1)

    shapeorient(90, 0, 90)
    glcolor(0.2, 0.2, 0.6)
    moveto(0, 1, 0)
    plane(2, 1, 2, 1)

    shapeslice(4, 4)

    shapeorient(0, 0, 0)
    glcolor(0.9, 0.3, 0.3, 0.6)
    moveto(0, 0, 2)
    plane(1, 1, 1, 1)

    gllinewidth(3)

    var originalSamplesX = bufX.peek( 1, 0, Samples )
    var originalSamplesY = bufY.peek( 1, 0, Samples )
    var step = Math.ceil(Samples / 800)
    var samplesX = []
    var samplesY = []
    var j = 0;
    for (var i = 0; i < Samples; i += step) {
      samplesX[j] = originalSamplesX[i]
      samplesY[j] = originalSamplesY[i]
      j++
    }
    var len = j
    //Math.ceil(Samples / step)

    glcolor(.4, .9, .4, 0.6)
    moveto(1, samplesY[0], 0)
    for (var i = 1; i < len; i++) {
      var x = samplesX[i]
      var y = samplesY[i]
      var z = 4 * i / len - 2
      lineto(1, y, z)
    }

    glcolor(.5, .5, .9, 0.6)
    moveto(samplesX[0], 0, 0)
    for (var i = 1; i < len; i++ ) {
      var x = samplesX[i]
      var y = samplesY[i]
      var z = 4 * i / len - 2

      lineto(x, 1, z)
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
      var z = 4 * i / len - 2
      cube(0.01, 0.01, 0.01)
      lineto(x, y, z)
    }

    glmatrixmode("modelview")
    glloadidentity()
    switch (viewMode) {
    case 0:
      glulookat(
        -1.8, -1.8, 3.6,
        0, 0, 1,
        0, -1, 0
      )
      break;
    case 1:
      glulookat(
        5, 0, 0,
        0, 0, 0,
        0, 1, 0
      )
      break;

    case 2:
      glulookat(
        0, 5, 0,
        0, 0, 0,
        1, 0, 0
      )
      break;
    case 3:
      glulookat(
        0, 0, 4.3,
        0, 0, 0,
        0, 1, 0
      )
      break;
    case 4:
      var r = 0.3 + Math.sin(walkerTick / 400) * 4
      glulookat(
        Math.cos(walkerTick / 100) * r, Math.cos(walkerTick / 300) * r, Math.cos(walkerTick / 200) * r,
        Math.cos(walkerTick/121) * 0.5, Math.cos(walkerTick/151) * 0.5, Math.cos(walkerTick / 189),
        Math.cos(walkerTick / 800), Math.cos(walkerTick / 700), Math.cos(walkerTick / 600)
      )
      walkerTick++
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
