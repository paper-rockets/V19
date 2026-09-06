// Real-time Stroke Smoother & Predictive Mesh Contact Optimizer

(function(window) {
  'use strict';

  function OneEuroFilter1D(minCutoff, beta, dCutoff) {
    this.minCutoff = minCutoff !== undefined ? minCutoff : 1.2;
    this.beta = beta !== undefined ? beta : 0.05;
    this.dCutoff = dCutoff !== undefined ? dCutoff : 1.0;
    this.xPrev = null;
    this.dxPrev = 0;
    this.tPrev = null;
  }

  OneEuroFilter1D.prototype.setParams = function(minCutoff, beta) {
    this.minCutoff = minCutoff;
    this.beta = beta;
  };

  OneEuroFilter1D.prototype.alpha = function(cutoff, dt) {
    var tau = 1.0 / (2.0 * Math.PI * cutoff);
    return 1.0 / (1.0 + tau / dt);
  };

  OneEuroFilter1D.prototype.filter = function(x, t) {
    if (this.tPrev === null || this.xPrev === null) {
      this.xPrev = x;
      this.tPrev = t;
      this.dxPrev = 0;
      return x;
    }

    var dt = Math.max(0.001, (t - this.tPrev) * 0.001);
    this.tPrev = t;

    var dx = (x - this.xPrev) / dt;
    var aD = this.alpha(this.dCutoff, dt);
    var dxHat = aD * dx + (1.0 - aD) * this.dxPrev;
    this.dxPrev = dxHat;

    var cutoff = this.minCutoff + this.beta * Math.abs(dxHat);
    var a = this.alpha(cutoff, dt);
    var xHat = a * x + (1.0 - a) * this.xPrev;
    this.xPrev = xHat;

    return xHat;
  };

  OneEuroFilter1D.prototype.reset = function() {
    this.xPrev = null;
    this.dxPrev = 0;
    this.tPrev = null;
  };

  function KalmanPredictive2D() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.p = 1.0;
    this.q = 0.08;
    this.r = 0.2;
    this.initialized = false;
    this.lastT = 0;
  }

  KalmanPredictive2D.prototype.reset = function() {
    this.initialized = false;
    this.vx = 0;
    this.vy = 0;
  };

  KalmanPredictive2D.prototype.update = function(measX, measY, t, predictionLead) {
    predictionLead = predictionLead || 0.0;
    if (!this.initialized) {
      this.x = measX;
      this.y = measY;
      this.vx = 0;
      this.vy = 0;
      this.p = 1.0;
      this.initialized = true;
      this.lastT = t;
      return { x: measX, y: measY };
    }

    var dt = Math.min(0.1, Math.max(0.001, (t - this.lastT) * 0.001));
    this.lastT = t;

    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.p += this.q;

    var k = this.p / (this.p + this.r);
    var residualX = measX - this.x;
    var residualY = measY - this.y;

    this.x += k * residualX;
    this.y += k * residualY;
    this.vx = (residualX / dt) * 0.7 + this.vx * 0.3;
    this.vy = (residualY / dt) * 0.7 + this.vy * 0.3;
    this.p = (1 - k) * this.p;

    var predX = this.x + this.vx * dt * (predictionLead * 3.0);
    var predY = this.y + this.vy * dt * (predictionLead * 3.0);

    return { x: predX, y: predY };
  };

  function StrokeSmoother() {
    this.euroX = new OneEuroFilter1D();
    this.euroY = new OneEuroFilter1D();
    this.euroPressure = new OneEuroFilter1D(2.0, 0.1);
    this.kalman = new KalmanPredictive2D();
    this.historyWindow = [];
    this.lastSmoothed = null;
  }

  StrokeSmoother.prototype.reset = function() {
    this.euroX.reset();
    this.euroY.reset();
    this.euroPressure.reset();
    this.kalman.reset();
    this.historyWindow = [];
    this.lastSmoothed = null;
  };

  StrokeSmoother.prototype.processPoint = function(rawX, rawY, pressure, algorithm, strength, predictive, predictionFactor, timestamp) {
    algorithm = algorithm || 'one_euro';
    strength = strength !== undefined ? strength : 0.55;
    predictive = predictive !== undefined ? predictive : true;
    predictionFactor = predictionFactor !== undefined ? predictionFactor : 0.4;
    timestamp = timestamp !== undefined ? timestamp : performance.now();

    if (algorithm === 'none' && !predictive) {
      this.lastSmoothed = { x: rawX, y: rawY };
      return { x: rawX, y: rawY, pressure: pressure };
    }

    var outX = rawX;
    var outY = rawY;
    var outP = pressure;

    switch (algorithm) {
      case 'one_euro': {
        var minCutoff = Math.max(0.1, 3.5 * (1.0 - strength * 0.85));
        var beta = 0.02 + (1.0 - strength) * 0.25;
        this.euroX.setParams(minCutoff, beta);
        this.euroY.setParams(minCutoff, beta);

        outX = this.euroX.filter(rawX, timestamp);
        outY = this.euroY.filter(rawY, timestamp);
        outP = this.euroPressure.filter(pressure, timestamp);

        if (predictive && this.lastSmoothed) {
          var vx = (outX - this.lastSmoothed.x);
          var vy = (outY - this.lastSmoothed.y);
          outX += vx * (predictionFactor * 1.5);
          outY += vy * (predictionFactor * 1.5);
        }
        break;
      }

      case 'kalman': {
        var lead = predictive ? (predictionFactor * 0.8 + 0.2) : 0.0;
        var res = this.kalman.update(rawX, rawY, timestamp, lead);
        var blend = 0.2 + strength * 0.8;
        outX = rawX * (1 - blend) + res.x * blend;
        outY = rawY * (1 - blend) + res.y * blend;
        outP = pressure;
        break;
      }

      case 'streamline': {
        this.historyWindow.push({ x: rawX, y: rawY, time: timestamp });
        if (this.historyWindow.length > 8) this.historyWindow.shift();

        var weightSum = 0;
        var sumX = 0;
        var sumY = 0;
        var count = this.historyWindow.length;
        var alpha = 0.3 + (1.0 - strength) * 0.6;

        for (var i = 0; i < count; i++) {
          var w = Math.pow(alpha, count - 1 - i);
          sumX += this.historyWindow[i].x * w;
          sumY += this.historyWindow[i].y * w;
          weightSum += w;
        }

        outX = sumX / weightSum;
        outY = sumY / weightSum;

        if (predictive && count >= 2) {
          var prev = this.historyWindow[count - 2];
          var last = this.historyWindow[count - 1];
          var dvx = last.x - prev.x;
          var dvy = last.y - prev.y;
          outX += dvx * (predictionFactor * 1.2);
          outY += dvy * (predictionFactor * 1.2);
        }
        break;
      }

      case 'exponential': {
        if (!this.lastSmoothed) {
          outX = rawX;
          outY = rawY;
        } else {
          var dist = Math.hypot(rawX - this.lastSmoothed.x, rawY - this.lastSmoothed.y);
          var dynamicAlpha = Math.min(0.95, Math.max(0.1, (1.0 - strength * 0.75) + dist * 5.0));
          outX = this.lastSmoothed.x + (rawX - this.lastSmoothed.x) * dynamicAlpha;
          outY = this.lastSmoothed.y + (rawY - this.lastSmoothed.y) * dynamicAlpha;

          if (predictive) {
            outX += (rawX - this.lastSmoothed.x) * (predictionFactor * 1.2);
            outY += (rawY - this.lastSmoothed.y) * (predictionFactor * 1.2);
          }
        }
        break;
      }

      default: {
        outX = rawX;
        outY = rawY;
        break;
      }
    }

    this.lastSmoothed = { x: outX, y: outY };
    return { x: outX, y: outY, pressure: Math.max(0.05, Math.min(1.0, outP)) };
  };

  window.StrokeSmoother = StrokeSmoother;
})(window);
