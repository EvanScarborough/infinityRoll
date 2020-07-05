function randomizeColors(){
  var html = document.getElementsByTagName('html')[0];
  var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);
  function tcs(n){var s = n.toString(16);return (s.length==1)?('0'+s):s;}
  function dark(c){return Math.floor(c*0.3);}
  function limit(n,min,max){return Math.min(Math.max(n,min),max);}
  html.style.setProperty('--maincolor', 'rgba('+r+','+g+','+b+','+'1)');
  html.style.setProperty('--transmain', 'rgba('+r+','+g+','+b+','+'0)');
  html.style.setProperty('--translmain', 'rgba('+r+','+g+','+b+','+'0.1)');
  html.style.setProperty('--darkcolor', 'rgba('+dark(r)+','+dark(g)+','+dark(b)+','+'1)');
  var d = 30;
  r = r + Math.floor(Math.random()*d-d/2); r = limit(r,0,255);
  g = g + Math.floor(Math.random()*d-d/2); r = limit(g,0,255);
  b = b + Math.floor(Math.random()*d-d/2); r = limit(b,0,255);
  html.style.setProperty('--maincolor2', 'rgba('+r+','+g+','+b+','+'1)');
}


export default {randomizeColors};
