var inlets = 1
var outlets = 1

var Taps = 0 // default
var InitialDelay = 500.0 // default
var DelayFactor = 1.0 // default
var LastPosition = 0
var ApplyFactorForFirstEcho = 0

var Buffer = {}

function tap (maxGen) {
  Taps = maxGen
}

function delay (ticksToDelay) {
  InitialDelay = ticksToDelay
}

function factor (f) {
  DelayFactor = f
}

// read from delay
function msg_int (position) {
  //post('pos' + position + '\n')
  if ( position < LastPosition ) {
    clear()
    LastPosition = position
    return
  }
  for ( var pos = LastPosition + 1; pos <= position; pos++ ) {
    if ( Buffer[pos] ) {
      var events = Buffer[pos]
      delete Buffer[pos]
      for ( var i=0; i<events.length; i++ ) {
        var gen = events[i][0]
        var delay = events[i][1]
        var loopHead = events[i][2]
        var offset = events[i][3]
        var list = events[i][4]
        outlet.apply(this, list)
        if ( !Taps || gen + 1 < Taps ) {
          _pushToBuffer(gen+1, delay, loopHead, offset, list)
        }
      }
    }
  }
  LastPosition = position
}

function _pushToBuffer(generation, delay, loopHead, offset, list) {
  //post(generation, delay, list)
  //post('\n')
  var pos = Math.floor(loopHead + offset * delay)
  //var pos = Math.floor(LastPosition + delay)
  if ( !Buffer[pos] ) {
    Buffer[pos] = []
  }
  //post('pos ' + pos + ' saved')
  Buffer[pos].push([generation, DelayFactor * delay, loopHead + delay, offset, list])
}

function option (k,v) {
  if ( k === 'applyFactorForFirstEcho' ) {
    ApplyFactorForFirstEcho = v
  }
}

function set () {
  var ary = [0] // index of outlet
  for ( var i=0; i<arguments.length; i++) {
    ary.push(arguments[i])
  }
  var loopHead = Math.floor(LastPosition / InitialDelay) * InitialDelay
  var offset = (LastPosition - loopHead) / InitialDelay
  if ( ApplyFactorForFirstEcho ) {
    _pushToBuffer(0, InitialDelay * DelayFactor, loopHead + InitialDelay, offset, ary)
  }
  else {
    _pushToBuffer(0, InitialDelay, loopHead + InitialDelay, offset, ary)
  }
}

function clear () {
  Buffer = {}
}