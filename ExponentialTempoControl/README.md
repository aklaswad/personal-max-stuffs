# ExponentialTempoControl

A M4L AudioEffect Device to control Ableton Live's master tempo continuous moving in exponential tempo change.

> [!WARNING]
> By current Ableton's limitation, this device is not good to stay in the live set, because running this device will pollute undo buffer heavily.
> Strongly recommend to use this device to record the automation and remove from your set after automation has been recorded.

# parameters

## Base tempo

The tempo at the beginning of the loop

## Loop length

Unit is in bars.

## Tempo change ratio, Tempo change direction

Specify the target tempo changed from base tempo at the end of the loop.
For example, `Base tempo` = `120` and `ratio` = `2` and `direction` = `down`, Song tempo starts from 120, going to become slow, and at the end of loop song tempo will be 60. (After that tempo will get back to 120 for next loop.)

## Pre read

It seems live is not changing song tempo in real time. May be it will be applied for each 16n by my observation. And, changing tempo at just time will be dropped until next update.
To avoid it, setting this _Pre read_ to send tempo change info to live api earlier than just in time. Unit is 0.0~1.0 beat. For me `0.2` works well.
