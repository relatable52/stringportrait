var input;
var img1, img2;
var w=100;
var p, t, r;
var sliderp, slidert, sliderr, sliderz;
var sliderx, slidery
var bup, bdown, bleft, bright;
var mode=0, bmode;
var m;
var px=[350];
var cur=0; next=0;
var n;
var breset;
var bins, bimage;
var ins=[3000];
function setup() {
  createCanvas(1040, 480);
  background(255);
  pixelDensity(1);
  //imageMode(CENTER);
  rectMode(CENTER);
  //strokeWeight(1);
  slider();
  arrow();
  input= createFileInput(handleFile);
  bmode=createButton("Bắt đầu vẽ");
  bmode.position(0,505);
  breset=createButton('Đặt lại');
  breset.position(85,505);
  img2=createImage(400,400);
  bins=createButton('Tải về hướng dẫn');
  bins.position(144,505);
  bimage=createButton('Tải về ảnh');
  bimage.position(272,505);
  ins[0]=0;
}
function draw() {
  //disparrow();
  var a, b, c, d;
  var e, f, g, h;
  if(mode==0){
    background(255);
    dispslider();
    if (img1) {
    w=200*sliderz.value();
    //movepic();
    up();
    down();
    left();
    right();
    if(cx-w<=0){
      a=0;
    }else{
      a=cx-w;
    }
    if(cy-w<=0){
      b=0;
    }else{
      b=cy-w;
    }
    if(cx+w>=img1.width){
      c=img1.width-a;
    }else{
      c=cx+w-a;
    }
    if(cy+w>=img1.height){
      d=img1.height-b;
    }else{
      d=cy+w-b;
    }
    m=img1.get(a,b,c,d);
    e=(a-cx+w)*200/w+20;
    f=(b-cy+w)*200/w+20;
    g=c*200/w;
    h=d*200/w;
    image(m,e,f,g,h);
  bmode.mousePressed(startdraw);
      
  }  
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(220,220,402,402);
  rect(650,220,402,402);
  drawcircle();
  }
  if(mode==1){
    let min=255;
    for(let i=0;i<p;i++){
      if(i!=cur){
        let o=getLineValue(px[cur].x+200,px[cur].y+200,px[i].x+200,px[i].y+200);
        if(o<min){
          min=o;
          next=i;
        }
      }
    }
    stroke(0);
    strokeWeight(0.5);
    line(650+px[cur].x,220+px[cur].y,650+px[next].x,220+px[next].y);
    subtractLine(200+px[cur].x,200+px[cur].y,200+px[next].x,200+px[next].y);
    cur=next;
    if(n>t-2){
      mode=2;
    }
    n++;
    ins[n]=next;
    //print(n);
    //noLoop();
  }
  if(mode==2){
    bins.mousePressed(instruction);
    bimage.mousePressed(saveportrait);
  }
  breset.mousePressed(reset);
  
  noStroke();
  fill(0);
}   

function handleFile(file){
  //print(file);
  if(file.type === 'image'){
     loadImage(file.data,function(loadedImage){
       img1=loadedImage;
       cx=img1.width/2;
       cy=img1.height/2;
     });
  }else{
    img1 = null;
    window.alert("File tải lên phải là file hình ảnh (png, jpg,...).");
  }
}
function slider(){
  sliderp=createSlider(100,350,150,1);
  sliderp.position(860,90);
  sliderp.size(150,5);
  slidert=createSlider(200,3000,300,10);
  slidert.position(860,180);
  slidert.size(150,5);
  sliderr=createSlider(50,195,150,1);
  sliderr.position(860,270);
  sliderr.size(150,5);
  sliderz=createSlider(0.5,10,1,0.1);
  sliderz.size(300,5);
  sliderz.position(85,457);
}
function dispslider(){
  textSize(15);
  p=sliderp.value();
  t=slidert.value();
  r=sliderr.value();
  text('Số điểm: '+p,860,80);
  text('Số nét: '+t,860,170);
  text('Bán kính đường tròn: '+r,860,260);
  text('Zoom ',20,465);
}
function arrow(){
  bup=createImg('up.png','');
  bup.size(30,10);
  bup.position(205,4);
  bdown=createImg('down.png','');
  bdown.size(30,10);
  bdown.position(205,425);
  bleft=createImg('left.png','');
  bleft.size(10,30);
  bleft.position(4,205);
  bright=createImg('right.png','');
  bright.size(10,30);
  bright.position(425,205);
}
function up(){
  if(mouseX>205 && mouseX<235 && mouseY>4 && mouseY<19){
    if(mouseIsPressed){
      if(cy>0){
        cy-=5;
      }
    }
  }
}
function down(){
  if(mouseX>205 && mouseX<235 && mouseY>425 && mouseY<440){
    if(mouseIsPressed){
      if(cy<img1.height){
        cy+=5;
      }
    }
  }
}
function right(){
  if(mouseX>4 && mouseX<19 && mouseY>205 && mouseY<235){
    if(mouseIsPressed){
      if(cx>0){
        cx-=5;
      }
    }
  }
}
function left(){
  if(mouseX>425 && mouseX<440 && mouseY>205 && mouseY<235){
    if(mouseIsPressed){
      if(cx<img1.width){
        cx+=5;
      }
    }
  }
}
function drawcircle(){
  for(let i=0;i<p;i++){
    px[i]=createVector(r*cos(2*i*PI/p),r*sin(2*i*PI/p));
    point(px[i].x+650,px[i].y+220);
  }
  stroke(80,255,80);
  circle(220,220,2*r+10);
}
function startdraw(){
  if(mode==0){
    mode=1;
    //img2=createImage(400,400);
    img2.loadPixels();
    loadPixels();
    for(let i=20;i<420;i++){
      for(let j=20;j<420;j++){
        let index1=(i+j*width)*4;
        let index2=((i-20)+(j-20)*img2.width)*4;
        img2.pixels[index2]=pixels[index1];
        img2.pixels[index2+1]=pixels[index1+1];
        img2.pixels[index2+2]=pixels[index1+2];
        img2.pixels[index2+3]=pixels[index1+3];
      }
    }
    img2.updatePixels();
    //image(img2,0,0,20,20);
    n=0;
    //bmode.html('Đặt lại');
  } 
  //print(img2.pixels[1]);
}
function getLineValue(x1,y1,x2,y2){
  let d=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  let sum=0;
  for(let i=0;i<d;i++){
    let x=floor(x1+(x2-x1)/d*i);
    let y=floor(y1+(y2-y1)/d*i);
    let index=(x+y*img2.width)*4;
    sum+=(img2.pixels[index]+img2.pixels[index+1]+img2.pixels[index+2])/3;
  }
  sum=sum/floor(d);
  return sum;
}
function subtractLine(x1,y1,x2,y2){
  let d=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  for(let i=0;i<d;i++){
    let x=floor(x1+(x2-x1)/d*i);
    let y=floor(y1+(y2-y1)/d*i);
    let index=(x+y*img2.width)*4;
    img2.pixels[index]=255;
    img2.pixels[index+1]=255;
    img2.pixels[index+2]=255;
  }
}
function reset(){
  mode=0;
}
function instruction(){
  let instruct;
  instruct='Các điểm được đánh thứ tự từ 0 tới '+(p-1)+'. Hãy nối các điểm theo thứ tự sau để tạo ra bức tranh của bạn: \n';
  for(let i=0; i<n;i++){
    instruct+=ins[i]+'-';
  }
  instruct1=[instruct,' '];
  save(instruct1,'huongdan.txt');
}
function saveportrait(){
  let portrait=createGraphics(800,800);
  portrait.background(255);
  portrait.stroke(0);
  portrait.strokeWeight(2);
  for(let i=0;i<p;i++){
    portrait.point(400+2*r*cos(2*i*PI/p),400+2*r*sin(2*i*PI/p));
  }
  portrait.strokeWeight(1);
  for(i=1;i<=t;i++){
    portrait.line(400+2*r*cos(2*ins[i]*PI/p),400+2*r*sin(2*ins[i]*PI/p),400+2*r*cos(2*ins[i-1]*PI/p),400+2*r*sin(2*ins[i-1]*PI/p));
  }
  save(portrait,'anhcuaban.png');
}
