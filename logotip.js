const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Narisemo glavno diagonalo (od zgoraj levo do spodaj desno)
ctx.beginPath();
ctx.fillStyle = '#ffffff';

// Začetna točka zgoraj levo
ctx.moveTo(70, 70);
ctx.lineTo(130, 70);
ctx.lineTo(330, 330);
ctx.lineTo(300, 330);
ctx.closePath();
ctx.fill();

// Začetek druge diagonale (zgoraj desno do spodaj levo)
ctx.beginPath();
ctx.moveTo(330, 70);
ctx.lineTo(70, 330);
ctx.lineTo(100, 330);
ctx.lineTo(300, 70);
ctx.closePath();
ctx.fill();
