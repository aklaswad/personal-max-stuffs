# RandomNoteDrop

Probability based note on gating.
All other MIDI events includes note off will bypass this device.

# Parameters

## Timeline

Define probability change timeline in the loop.

## Loop

Length (bars) go through the timeline.

## Base Probability

Additional chance for any note on events.

Finally, each note on event will pass through this device on probability of;

  (`Base probability` + ( `100% - Base probability` * `timeline value at that time`))

For example, when timeline is set like `/` from 0.5 ~ 1.0, and base probability is 0.3, Probability will change from 65% (0.3 + (0.7 * 0.5)) to 100% through each loop.