
sketch.default3d()
sketch.gldisable("lighting")
sketch.gldisable("light0")

post(jsarguments[1])
var bufferNameX
var bufferNameY
var Samples = 200
draw()

function draw() {
  if ( !bufferNameX ) return
  if ( !bufferNameY ) return

  with (sketch) {
    var bufX = new Buffer(bufferNameX)
    var bufY = new Buffer(bufferNameY)
    gldisable("depth_test")
    glenable("line_smooth")

    glpolygonmode("front", "line")
    glpolygonmode("back", "line")

    glclearcolor(0,0,0,1)
    glclear()

    gllinewidth(1)

    var lastX = 0
    var lastY = 1
    var lastZ = 0
    shapeslice(4, 4)

    shapeorient(0, 90, 0)
    glcolor(0, 0, 0.6)
    moveto(1, 0.5, 1)
    plane(1, 0.5, 1, 0.5)

    glcolor(0, 0.5, 0)
    moveto(0.5, 0, 1)
    shapeorient(90, 0, 90)
    plane(1, 0.5, 1, 0.5)

    glcolor(0.3, 0.3, 0.7, 0.6)
    moveto(0.5, 0.5, 0)
    shapeorient(0, 0, 0)
    plane(0.5, 0.5, 0.5, 0.5)

    gllinewidth(3)

    glcolor(0, 0, 0.7)
    var samplesX = bufX.peek( 1, 0, Samples )
    var samplesY = bufY.peek( 1, 0, Samples )

    moveto(1, samplesY[0] / 2 + 0.5, 0)
    for (var i = 1; i < Samples; i++) {
      var x = samplesX[i] / 2 + 0.5
      var y = samplesY[i] / 2 + 0.5
      var z = 2 * i / Samples
      lineto(1, y, z)
      lastX = x
      lastY = y
      lastZ = z
    }

    glcolor(0, 0.7, 0)
    moveto(samplesX[0] / 2 + 0.5, 0, 0)
    for (var i = 1; i < Samples; i++) {
      var x = samplesX[i] / 2 + 0.5
      var y = samplesY[i] / 2 + 0.5
      var z = 2 * i / Samples

      lineto(x, 0, z)

      lastX = x
      lastY = y
      lastZ = z
    }

    glcolor(0.8,0.8,1,1)
    moveto(samplesX[0] / 2 + 0.5, samplesY[0] / 2 + 0.5, 0)
    for (var i = 1; i < Samples; i++) {
      var x = samplesX[i] / 2 + 0.5
      var y = samplesY[i] / 2 + 0.5
      var z = 2 * i / Samples

      lineto(x, y, 0)
      lastX = x
      lastY = y
      lastZ = z
    }

    shapeslice(2, 2)
    gllinewidth(0.5)
    glcolor( 1,1,1, 0.3 )
    for (var i = 1; i < Samples; i++) {
      var x = samplesX[i] / 2 + 0.5
      var y = samplesY[i] / 2 + 0.5
      var z = 2 * i / Samples

      moveto(x, y, z)
      cube(0.01, 0.01, 0.01)
    }

    glmatrixmode("modelview")
    glloadidentity()
    glulookat(
      -0.55, 0.6, -0.9,
      0.4, 0.4, 0.4,
      0, 1, 0
    )
  }
}

function setbuffer (bufX, bufY ) {
  bufferNameX = bufX
  bufferNameY = bufY
  post('set', bufferNameX, '\n')
  post(bufferNameY, '\n')
}
//buffer.local = 1

function bang() {
  draw()
  refresh()
}

function onresize(w, h) {
  draw()
  refresh()
}
onresize.local = 1
