// var sidebar = document.getElementById('sidebar');
// var sidebarStartX;
// var sidebarEndX;
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// context.lineWidth = 5;
// var down = false;
// var startX;
// var startY;
// var mode = 'pencil';
// var background = 'white';
// canvas.addEventListener('touchmove', draw);
// canvas.addEventListener('touchstart', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (mode === 'pencil') {
//         down = true;
//         context.beginPath();
//         xPos = e.touches[0].clientX - canvas.offsetLeft;
//         yPos =e.touches[0].clientY - canvas.offsetTop;
//         context.moveTo(xPos, yPos);
//         canvas.addEventListener("touchmove", draw);
//     } else if (mode === 'eraser') {
//         down = true;
//         context.beginPath();
//         xPos = e.touches[0].clientX - canvas.offsetLeft;
//         yPos =e.touches[0].clientY - canvas.offsetTop;
//         context.moveTo(xPos, yPos);
//         canvas.addEventListener("touchmove", draw);
//     } else if (mode === 'crop') {
//         startX = e.touches[0].clientX - canvas.offsetLeft;
//         startY = e.touches[0].clientY - canvas.offsetTop;
//         context.moveTo(xPos, yPos);
//         canvas.addEventListener("touchmove", draw);
//     }
//
// });
// canvas.addEventListener('touchend', function() {
//     down = false;
// });
// function draw(e){
//     e.preventDefault();
//     e.stopPropagation();
//     //console.log('mode: ' + mode)
//     if (mode === 'eraser') {
//         context.strokeStyle = background;
//         context.fillStyle = background;
//         xPos = e.touches[0].clientX - canvas.offsetLeft;
//         yPos =e.touches[0].clientY - canvas.offsetTop;
//         if (down == true) {
//             context.lineTo(xPos, yPos);
//             context.stroke();
//         }
//     } else if (mode === 'pencil') {
//         xPos = e.touches[0].clientX - canvas.offsetLeft;
//         yPos =e.touches[0].clientY - canvas.offsetTop;
//         if (down == true) {
//             context.lineTo(xPos, yPos);
//             context.stroke();
//         }
//     } else if (mode === 'crop') {
//         xPos = e.touches[0].clientX - canvas.offsetLeft;
//         yPos =e.touches[0].clientY - canvas.offsetTop;
//         if (down == true) {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             var width = mouseX - startX;
//             var height = mouseY - startY;
//             context.strokeRect(startX, startY, width, height);
//         }
//     }
//
// }
// function changeColor(color){
//     context.strokeStyle = color;
//     context.fillStyle = color;
// }
// function clearCanvas() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
// }
// function changeBrushSize(size) {
//     context.lineWidth = size;
// }
// function fillCanvas() {
//     background = context.fillStyle;
//     //console.log(background);
//     context.fillRect(0, 0, canvas.width, canvas.height);
// }
// function changeBrushStyle(brushStyle) {context.lineCap = brushStyle;}
// function triggerClick() {document.getElementById('file').click();}
// document.getElementById('file').addEventListener('change', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     clearCanvas();
//     URL = URL || webkitURL;
//     var temp = URL.createObjectURL(e.target.files[0]);
//     var image = new Image();
//     image.src = temp;
//     image.addEventListener('load', function() {
//         imageWidth = image.naturalWidth;
//         imageHeight = image.naturalHeight;
//         newImageWidth = imageWidth;
//         newImageHeight = imageHeight;
//         originalImageRatio = imageWidth / imageHeight;
//         if (newImageWidth > newImageHeight && newImageWidth > canvas.width) {
//             newImageWidth = canvas.width;
//             newImageHeight = canvas.width / originalImageRatio;
//         }
//         if (newImageHeight > newImageWidth && newImageHeight > canvas.height) {
//             newImageHeight = canvas.height;
//             newImageWidth = canvas.height * originalImageRatio;
//         }
//         if (newImageWidth == newImageHeight && newImageHeight > canvas.height) {
//             newImageHeight = canvas.height;
//             newImageWidth = canvas.height * originalImageRatio;
//         }
//         context.drawImage(image, 0, 0, newImageWidth, newImageHeight);//last two argument is x y original location where you want to put your img
//         URL.revokeObjectURL(temp);// release the reference to this img
//     });
// });
// function sideBarTouchStart(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     sidebarStartX = e.touches[0].clientX;
// }
// function sideBarTouchEnd(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     //console.log(e.changedTouches[0].clientX);
//     var changes = e.changedTouches[0].clientX;
//     if (changes < 0) {
//         //console.log('hi');
//         sidebar.style.left = '-300px';
//     } else {
//         sidebar.style.left = '0px';
//     }
// }
// function changeMode(curMode) {
//     console.log('hihi');
//     mode = curMode;
// }

var sidebar = document.getElementById('sidebar');
var sidebarStartX;
var sidebarEndX;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.lineWidth = 5;
var down = false;
var mode = 'pencil';
var background = 'white';
var startX, startY;
var pencilSize = 5;
var isShowBrushSlider = false;
//long press
timer = null;
var longPressDuration = 3000;
canvas.addEventListener('touchmove', function(e) {
    clearTimeout(timer);
    draw(e);
});
canvas.addEventListener('touchstart', function(e) {
    if (isShowBrushSlider == true) {
        var sliderContainer = document.getElementById('penSizeSliderContainer');
        sliderContainer.style.visibility = 'hidden';
        var slider = document.getElementById("penSizeSlider");
        changeBrushSize(slider.value);
        isShowBrushSlider = false;
    } else {
        timer = setTimeout(showRangeInput(e), longPressDuration);
    }
    if (mode === 'pencil') {
        //console.log(e.touches[0]);
        down = true;
        context.beginPath();
        xPos = e.touches[0].clientX - canvas.offsetLeft;
        yPos =e.touches[0].clientY - canvas.offsetTop;
        context.moveTo(xPos, yPos);
        canvas.addEventListener("touchmove", draw);
    } else if (mode === 'eraser') {
        down = true;
        context.beginPath();
        xPos = e.touches[0].clientX - canvas.offsetLeft;
        yPos =e.touches[0].clientY - canvas.offsetTop;
        context.moveTo(xPos, yPos);
        canvas.addEventListener("touchmove", draw);
    } else if (mode === 'crop') {
        down = true;
        startX = e.touches[0].pageX - canvas.offsetLeft;
        startY =e.touches[0].pageY - canvas.offsetTop;
        context.moveTo(startX, startY);
        canvas.addEventListener("touchmove", draw);
    }

});
canvas.addEventListener('touchend', function() {
    clearTimeout(timer);
    down = false;
});

function draw(e){
    console.log('mode: ' + mode)
    if (mode === 'eraser') {
        context.strokeStyle = background;
        context.fillStyle = background;
        xPos = e.touches[0].clientX - canvas.offsetLeft;
        yPos =e.touches[0].clientY - canvas.offsetTop;
        if (down == true) {
            context.lineTo(xPos, yPos);
            context.stroke();
        }
    } else if (mode === 'pencil'){
        xPos = e.touches[0].clientX - canvas.offsetLeft;
        yPos =e.touches[0].clientY - canvas.offsetTop;
        if (down == true) {
            context.lineTo(xPos, yPos);
            context.stroke();
        }
    } else if (mode === 'crop') {
        xPos = e.touches[0].clientX - canvas.offsetLeft;
        yPos =e.touches[0].clientY - canvas.offsetTop;
         if (down == true) {
             console.log('hi');
             context.clearRect(0, 0, canvas.width, canvas.height);
             var width = xPos - startX;
             var height = yPos - startY;
             context.strokeRect(startX, startY, width, height);
         }
    }

}
function changeColor(color){
    context.strokeStyle = color;
    context.fillStyle = color;
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function changeBrushSize(size) {
    context.lineWidth = size;
}
function fillCanvas() {
    background = context.fillStyle;
    console.log(background);
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function changeBrushStyle(brushStyle) {context.lineCap = brushStyle;}
function triggerClick() {document.getElementById('file').click();}
document.getElementById('file').addEventListener('change', function(e) {
    clearCanvas();
    URL = URL || webkitURL;
    var temp = URL.createObjectURL(e.target.files[0]);
    var image = new Image();
    image.src = temp;
    image.addEventListener('load', function() {
        imageWidth = image.naturalWidth;
        imageHeight = image.naturalHeight;
        newImageWidth = imageWidth;
        newImageHeight = imageHeight;
        originalImageRatio = imageWidth / imageHeight;
        if (newImageWidth > newImageHeight && newImageWidth > canvas.width) {
            newImageWidth = canvas.width;
            newImageHeight = canvas.width / originalImageRatio;
        }
        if (newImageHeight > newImageWidth && newImageHeight > canvas.height) {
            newImageHeight = canvas.height;
            newImageWidth = canvas.height * originalImageRatio;
        }
        if (newImageWidth == newImageHeight && newImageHeight > canvas.height) {
            newImageHeight = canvas.height;
            newImageWidth = canvas.height * originalImageRatio;
        }
        context.drawImage(image, 0, 0, newImageWidth, newImageHeight);//last two argument is x y original location where you want to put your img
        URL.revokeObjectURL(temp);// release the reference to this img
    });
});
function sideBarTouchStart(event) {
    sidebarStartX = event.touches[0].pageX;
}
function sideBarTouchEnd(event) {
    console.log(event.changedTouches[0].pageX);
    var changes = event.changedTouches[0].pageX;
    if (changes < 0) {
        console.log('hi');
        sidebar.style.left = '-300px';
    } else {
        sidebar.style.left = '0px';
    }
}
function changeMode(curMode) {
    console.log('click me haha');
    mode = curMode;
}

function showRangeInput(e) {
    clearTimeout();
    console.log('long press');
    console.log(e.touches[0]);
    isShowBrushSlider = true;
    var sliderContainer = document.getElementById('penSizeSliderContainer');
    var slider = document.getElementById("penSizeSlider");
    var output = document.getElementById("demo");
    sliderContainer.style.left = e.touches[0].clientX - canvas.offsetLeft + 'px';
    //console.log(e.touches[0].pageX + 'px');
    sliderContainer.style.top = e.touches[0].clientY - canvas.offsetTop + 'px';
    sliderContainer.style.visibility = 'visible';
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
    }
}