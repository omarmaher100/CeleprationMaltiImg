var text_title = "";
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.crossOrigin = "anonymous";

function DrawPlaceholder() {
    img.onload = function() {
        DrawOverlay(img);
    };

}

function DrawOverlay(img) {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function selectDesign(e){
    $(".step1").hide();
    $(".step2").show();
    setTimeout(function(){$("#name").val("").focus();}, 100);
    DrawPlaceholder();
    img.src = $(e).find("img").attr("src");
    document.getElementById('name').addEventListener('input', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawOverlay(img);
        ctx.textBaseline = 'middle';
             ctx.font = "bold 25pt HelveticaNeueLTArabic-Light ";
        ctx.fillStyle = $(e).attr("data-textColor");
        ctx.shadowColor = "rgba(0, 0, 0, 0)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;
        text_title = this.value;
        var startPoint = 800-ctx.measureText(text_title).width;
        console.log(startPoint)
        ctx.fillText(text_title,startPoint/2 , $(e).attr("data-textY") );
        ctx.textAlign = "start";
    });
}


function convertToImage() {
   // var url = document.location.href+"#downloaded=yes";
   // document.location = url;
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    var currentdate = new Date();
    download(image,  $("#name").val()+"-"+currentdate.getDay()+"-"+currentdate.getMonth()+1 +"-"+currentdate.getFullYear()+"-"+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds()+".png", "image/png");
}

function backToHome(){
   // var url = document.location.href.split('#')[0];
   // document.location = url;
    $(".step2").hide();
    $(".step1").show();
    $("#name").val("");
}
function resetDesign() {
    $("#name").val("").focus();
}
