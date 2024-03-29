/*
  Easing Equations v1.5
  May 1, 2003
  (c) 2003 Robert Penner, all rights reserved. 
  This work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.  
  
  These tweening functions provide different flavors of 
  math-based motion under a consistent API. 
  
  Types of easing:
  
	  Linear
	  Quadratic
	  Cubic
	  Quartic
	  Quintic
	  Sinusoidal
	  Exponential
	  Circular
	  Elastic
	  Back
	  Bounce

  Changes:
  1.5 - added bounce easing
  1.4 - added elastic and back easing
  1.3 - tweaked the exponential easing functions to make endpoints exact
  1.2 - inline optimizations (changing t and multiplying in one step)--thanks to Tatsuo Kato for the idea
  
  Discussed in Chapter 7 of 
  Robert Penner's Programming Macromedia Flash MX
  (including graphs of the easing equations)
  
  http://www.robertpenner.com/profmx
  http://www.amazon.com/exec/obidos/ASIN/0072223561/robertpennerc-20
*/

const Easing = {};

// simple linear tweening - no easing
// t: current time, b: beginning value, c: change in value, d: duration
Math.linearTween = function (t, b, c, d) {
	return c*t/d + b;
};


 ///////////// QUADRATIC EASING: t^2 ///////////////////

// quadratic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds
Easing.easeInQuad = function (t, b, c, d) {
	return c*(t/=d)*t + b;
};

// quadratic easing out - decelerating to zero velocity
Easing.easeOutQuad = function (t, b, c, d) {
	return -c *(t/=d)*(t-2) + b;
};

// quadratic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutQuad = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
};


 ///////////// CUBIC EASING: t^3 ///////////////////////

// cubic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
Easing.easeInCubic = function (t, b, c, d) {
	return c*(t/=d)*t*t + b;
};

// cubic easing out - decelerating to zero velocity
Easing.easeOutCubic = function (t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

// cubic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutCubic = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
};


 ///////////// QUARTIC EASING: t^4 /////////////////////

// quartic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
Easing.easeInQuart = function (t, b, c, d) {
	return c*(t/=d)*t*t*t + b;
};

// quartic easing out - decelerating to zero velocity
Easing.easeOutQuart = function (t, b, c, d) {
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
};

// quartic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutQuart = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
};


 ///////////// QUINTIC EASING: t^5  ////////////////////

// quintic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
Easing.easeInQuint = function (t, b, c, d) {
	return c*(t/=d)*t*t*t*t + b;
};

// quintic easing out - decelerating to zero velocity
Easing.easeOutQuint = function (t, b, c, d) {
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
};

// quintic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutQuint = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
};



 ///////////// SINUSOIDAL EASING: sin(t) ///////////////

// sinusoidal easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in position, d: duration
Easing.easeInSine = function (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

// sinusoidal easing out - decelerating to zero velocity
Easing.easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};

// sinusoidal easing in/out - accelerating until halfway, then decelerating
Easing.easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};


 ///////////// EXPONENTIAL EASING: 2^t /////////////////

// exponential easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in position, d: duration
Easing.easeInExpo = function (t, b, c, d) {
	return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};

// exponential easing out - decelerating to zero velocity
Easing.easeOutExpo = function (t, b, c, d) {
	return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};

// exponential easing in/out - accelerating until halfway, then decelerating
Easing.easeInOutExpo = function (t, b, c, d) {
	if (t===0) return b;
	if (t===d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};


 /////////// CIRCULAR EASING: sqrt(1-t^2) //////////////

// circular easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in position, d: duration
Easing.easeInCirc = function (t, b, c, d) {
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};

// circular easing out - decelerating to zero velocity
Easing.easeOutCirc = function (t, b, c, d) {
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};

// circular easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutCirc = function (t, b, c, d) {
	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};


 /////////// ELASTIC EASING: exponentially decaying sine wave  //////////////

// t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
// t and d can be in frames or seconds/milliseconds

Easing.easeInElastic = function (t, b, c, d, a, p) {
	if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; let s=p/4; }
	else { let s = p/(2*Math.PI) * Math.asin (c/a); }
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
};

Easing.easeOutElastic = function (t, b, c, d, a, p) {
	if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; let s=p/4; }
	else { let s = p/(2*Math.PI) * Math.asin (c/a); }
	return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};

Easing.easeInOutElastic = function (t, b, c, d, a, p) {
	if (t===0) return b;  if ((t/=d/2)===2) return b+c;  if (!p) p=d*(.3*1.5);
	if (a < Math.abs(c)) { a=c; let s=p/4; }
	else { let s = p/(2*Math.PI) * Math.asin (c/a); }
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
};


 /////////// BACK EASING: overshooting cubic easing: (s+1)*t^3 - s*t^2  //////////////

// back easing in - backtracking slightly, then reversing direction and moving to target
// t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
// t and d can be in frames or seconds/milliseconds
// s controls the amount of overshoot: higher s means greater overshoot
// s has a default value of 1.70158, which produces an overshoot of 10 percent
// s==0 produces cubic easing with no overshoot
Easing.easeInBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
};

// back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
Easing.easeOutBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};

// back easing in/out - backtracking slightly, then reversing direction and moving to target,
// then overshooting target, reversing, and finally coming back to target
Easing.easeInOutBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};


 /////////// BOUNCE EASING: exponentially decaying parabolic bounce  //////////////

// bounce easing in
// t: current time, b: beginning value, c: change in position, d: duration
Easing.easeInBounce = function (t, b, c, d) {
	return c - Easing.easeOutBounce (d-t, 0, c, d) + b;
};

// bounce easing out
Easing.easeOutBounce = function (t, b, c, d) {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
};

// bounce easing in/out
Easing.easeInOutBounce = function (t, b, c, d) {
	if (t < d/2) return Easing.easeInBounce (t*2, 0, c, d) * .5 + b;
	return Easing.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
};

export { Easing };
