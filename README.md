# Noise generator

## Some background

I've been reading through "Designing Audio Effect Plugins in C++" by Will Pirkle and I wanted to try and implement some of the difference equations to help better understand what's going on.

The equations that make up the various coefficients found in js/resonator-processor.js are lifted straight out of that book and I was surprised to hear them actually work!

## Programming approach

It seemed to make the most sense to do a client side implementation rather than relying on a nodeJS port of the WebAudio API. 
I do like to try and take the simplest approach so I've stuck to vanilla JS for now, this has made for some unavoidable global variables that I'm not a huge fan of. 



