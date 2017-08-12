//canvasアニメーション
var w = $('.contents01').width();
var h = $('.contents01').height();
$('canvas').attr('width', w);
$('canvas').attr('height', h);

var canvas = document.getElementById("cvs");
var canvas2 = document.getElementById("cvs2");
var canvas3 = document.getElementById("cvs3");

var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");
var imgCnt = 10;          // 画像１の描画する画像の数
var imgCnt2 = 2;          // 画像2の描画する画像の数
var imgCnt3 = 1;          // 画像3の描画する画像の数
var aryImg = [];          // 画像１の情報を格納
var aryImg2 = [];          // 画像2の情報を格納
var aryImg3 = [];          // 画像3の情報を格納
var cvsw = w;           // canvasタグに指定したwidth
var cvsh = h;           // canvasタグに指定したheight
var imgBaseSizeW = 15;    // 画像の基本サイズ横幅
var imgBaseSizeH = 15;  // 画像の基本サイズ立幅
var aspectMax = 2;      // 画像１のアスペクト比計算時の最大値
var aspectMax2 = 1.5;      // 画像2のアスペクト比計算時の最大値
var aspectMax3 = 2.5;      // 画像3のアスペクト比計算時の最大値
var aspectMin = 1;      // アスペクト比計算時の最小値
var speedMax = 0.5;         // 落下速度の最大値
var speedMin = 0.1;       // 落下速度の最小値
var angleAdd = 1;         // 画像角度への加算値

canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "1";

canvas2.style.position = "absolute";
canvas2.style.top = "0";
canvas2.style.left = "0";
canvas2.style.zIndex = "2";

canvas3.style.position = "absolute";
canvas3.style.top = "0";
canvas3.style.left = "0";
canvas3.style.zIndex = "3";

// 画像1の読み込み
var img = new Image();
img.src = "img/leaf01.png";
img.onload = flow_start;

// 画像2の読み込み
var img2 = new Image();
img2.src = "img/leaf02.png";
img2.onload = flow2_start;

// 画像3の読み込み
var img3 = new Image();
img3.src = "img/leaf03.png";
img3.onload = flow3_start;

// 画像1のパラメーターを設定
function setImagas(){
  var aspect = 0;
  for(var i = 0;i < imgCnt;i++){
    // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    aspect = Math.random()*(aspectMax-aspectMin)+aspectMin;
    aryImg.push({
      "posx": Math.random()*cvsw,   // 初期表示位置x
      "posy": Math.random()*cvsh,   // 初期表示位置y
      "sizew": imgBaseSizeW*aspect, // 画像の横幅
      "sizeh": imgBaseSizeH*aspect, // 画像の縦幅
      "speedy": Math.random()*(speedMax-speedMin)+speedMin,　// 画像が落ちていく速度
      "angle": Math.random()*360,   // 角度
    });
  }
}

// 画像2のパラメーターを設定
function setImagas2(){
  var aspect = 0;
  for(var i = 0;i < imgCnt2;i++){
    // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    aspect = Math.random()*(aspectMax2-aspectMin)+aspectMin;
    aryImg2.push({
      "posx": Math.random()*cvsw,   // 初期表示位置x
      "posy": Math.random()*cvsh,   // 初期表示位置y
      "sizew": imgBaseSizeW*aspect, // 画像の横幅
      "sizeh": imgBaseSizeH*aspect, // 画像の縦幅
      "speedy": Math.random()*(speedMax-speedMin)+speedMin,　// 画像が落ちていく速度
      "angle": Math.random()*360,   // 角度
    });
  }
}
// 画像3のパラメーターを設定
function setImagas3(){
  var aspect = 0;
  for(var i = 0;i < imgCnt3;i++){
    // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    aspect = Math.random()*(aspectMax3-aspectMin)+aspectMin;
    aryImg3.push({
      "posx": Math.random()*cvsw,   // 初期表示位置x
      "posy": Math.random()*cvsh,   // 初期表示位置y
      "sizew": imgBaseSizeW*aspect, // 画像の横幅
      "sizeh": imgBaseSizeH*aspect, // 画像の縦幅
      "speedy": Math.random()*(speedMax-speedMin)+speedMin,　// 画像が落ちていく速度
      "angle": Math.random()*360,   // 角度
    });
  }
}


// 描画、パラメーターの更新
var idx = 0;
var cos = 0;
var sin = 0;
var rad = Math.PI / 180;
function flow(){
  ctx.clearRect(0,0,cvsw,cvsh);
  for(idx = 0;idx < imgCnt;idx++){
    aryImg[idx].posy += aryImg[idx].speedy;
    aryImg[idx].angle += Math.random()*angleAdd;
    cos = Math.cos(aryImg[idx].angle * rad);
    sin = Math.sin(aryImg[idx].angle * rad);
    ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
    ctx.drawImage(img, 0, 0 , aryImg[idx].sizew , aryImg[idx].sizeh);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // 範囲外に描画された画像を上に戻す
    if(aryImg[idx].posy >= cvsh){
      aryImg[idx].posy = -aryImg[idx].sizeh;
    }
  }
}

function flow_start(){
  setImagas();
  setInterval(flow,10);
}

function flow2(){
  ctx2.clearRect(0,0,cvsw,cvsh);
  for(idx2 = 0;idx2 < imgCnt2;idx2++){
    aryImg2[idx2].posy += aryImg2[idx2].speedy;
    aryImg2[idx2].angle += Math.random()*angleAdd;
    cos = Math.cos(aryImg2[idx2].angle * rad);
    sin = Math.sin(aryImg2[idx2].angle * rad);
    ctx2.setTransform(cos, sin, sin, cos, aryImg2[idx2].posx, aryImg2[idx2].posy);
    ctx2.drawImage(img2, 0, 0 , aryImg2[idx2].sizew , aryImg2[idx2].sizeh);
    ctx2.setTransform(1, 0, 0, 1, 0, 0);
    // 範囲外に描画された画像を上に戻す
    if(aryImg2[idx2].posy >= cvsh){
      aryImg2[idx2].posy = -aryImg2[idx2].sizeh;
    }
  }
}

function flow2_start(){
  setImagas2();
  setInterval(flow2,10);
}

function flow3(){
  ctx3.clearRect(0,0,cvsw,cvsh);
  for(idx3 = 0;idx3 < imgCnt3;idx3++){
    aryImg3[idx3].posy += aryImg3[idx3].speedy;
    aryImg3[idx3].angle += Math.random()*angleAdd;
    cos = Math.cos(aryImg3[idx3].angle * rad);
    sin = Math.sin(aryImg3[idx3].angle * rad);
    ctx3.setTransform(cos, sin, sin, cos, aryImg3[idx3].posx, aryImg3[idx3].posy);
    ctx3.drawImage(img2, 0, 0 , aryImg3[idx3].sizew , aryImg3[idx3].sizeh);
    ctx3.setTransform(1, 0, 0, 1, 0, 0);
    // 範囲外に描画された画像を上に戻す
    if(aryImg3[idx3].posy >= cvsh){
      aryImg3[idx3].posy = -aryImg3[idx3].sizeh;
    }
  }
}

function flow3_start(){
  setImagas3();
  setInterval(flow3,10);
}

