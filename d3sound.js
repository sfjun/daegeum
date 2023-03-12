var ac = new (window.AudioContext || window.webkitAudioContext);
  // C4, E4, G4
  //var freqs = [261.63, 329.63, 392.00];
  //var freqs = [261, 440, 880];

  var freqs = [32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27,
               61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110,
               116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196,
               207.65, 220,	233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 
               369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.26,
               698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.5, 1108.73, 1174.66, 1244.51,
               1318.51,	1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32,
               2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07];
  
  var oscs = [];

  const gainNode = ac.createGain();
  gainNode.gain.value = 0.2;

  //gainNode.gain.setValueAtTime(0, ac.currentTime);
  //gainNode.gain.setValueAtTime(1, ac.currentTime);
      
  const smoothingInterval = 0.02;
  const beepLengthInSeconds = 0.5;

function playFreq(freq, dur = 1) {
  var o = ac.createOscillator();
  //o.frequency.value = freq;
  console.log("freq,dur", freq, dur);
  o.connect(gainNode).connect(ac.destination);  
  o.frequency.value = freq;  
  const now = ac.currentTime;
  o.start(now);
  o.stop(now + dur);
  //clearTimeout(setTimeid);
  
};


function playNote() {
  for(var i = 0; i < freqs.length; i++) {
    console.log("시작", freqs[i])
    // 지연시간을 단계적으로 부여하여, 실행함수 ()없이해야 호출만, 주파수, 지속시간 
    const setTimeid = setTimeout(playFreq, i * 1000, freqs[i], 2);
    console.log("id", setTimeid)
    //clearTimeout(setTimeid);
    //requestAnimationFrame(step)
  }
}