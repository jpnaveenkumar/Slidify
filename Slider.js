var AllElements = {};
function rightButtonClick(id)
{
    var currentElement = AllElements[id.slice(0,id.indexOf("_"))];
    var elements = document.querySelectorAll("#"+currentElement.containerId+" .sliderItems");
    $(elements[currentElement.start]).addClass("animateSlideLeft");
    setTimeout(function() {
        $(elements[currentElement.start]).css({"display":"none"});
        $(elements[currentElement.start]).removeClass("animateSlideLeft");
        if((currentElement.start+currentElement.bucket+1) == currentElement.totalElementsCount){
            $("#"+currentElement.rightButtonId).css("display","none");
        }
        currentElement.start++;
        currentElement.end++;
        $(elements[currentElement.end]).css("display","block");
        $(elements[currentElement.end]).css("width",currentElement.elementsWidth);
        $("#"+currentElement.leftButtonId).css("display","block");
    }, 300);
}
function leftButtonClick(id)
{
    var currentElement = AllElements[id.slice(0,id.indexOf("_"))];
    var elements = document.querySelectorAll("#"+currentElement.containerId+" .sliderItems");
    $(elements[currentElement.end]).addClass("animateSlideRight");
    setTimeout(function() {
        $(elements[currentElement.end]).css({"display":"none"});
        $(elements[currentElement.end]).removeClass("animateSlideRight");
        currentElement.end--;
        currentElement.start--;
        if(currentElement.start == 0){
            $("#"+currentElement.leftButtonId).css("display","none");
        }
        $(elements[currentElement.start]).css("display","block");
        $(elements[currentElement.start]).css("width",currentElement.elementsWidth);
        $("#"+currentElement.rightButtonId).css("display","block");
    }, 300);
}
function initSlider(containerId,dataId,options)
{
    var elements = document.querySelectorAll("#"+dataId+" .sliderItems");
    var currentElement = {};
    currentElement.start=0;
    currentElement.dataId = dataId;
    currentElement.containerId = containerId;
    currentElement.bucket = options["itemCount"];
    currentElement.totalElementsCount = elements.length;
    currentElement.end = currentElement.bucket - 1;
    currentElement.elementsWidth = elements[0].style.width;
    var leftButtonId = dataId+"_"+"leftBtn";
    var rightButtonId = dataId+"_"+"rightBtn";
    currentElement.leftButtonId = leftButtonId;
    currentElement.rightButtonId = rightButtonId;
    AllElements[dataId] = currentElement;
    AllElements[dataId] = currentElement;
    var outerElement = '<div id="childContainer" style="display:flex;justify-content:space-around;position:relative;align-content:center"></div>';
    var rightButton = '<div class="rightSliderBtn" style="border-radius:50px;position:absolute;right:-25px;top:50%;margin-top:-20px;background-color:white;box-shadow: 0px 0px 10px 0px black;" id="'+rightButtonId+'">';
    rightButton = rightButton + '<img src="./icons/right_arrow.svg" height="40px" width="40px" >';
    rightButton = rightButton + '</div>';
    var leftButton = '<div class="leftSliderBtn" style="border-radius:50px;position:absolute;left:-20px;top:50%;margin-top:-20px;background-color:white;box-shadow: 0px 0px 10px 0px black;" id="'+leftButtonId+'">';
    leftButton = leftButton + '<img src="./icons/left_arrow.svg" height="40px" width="40px" >';
    leftButton = leftButton + '</div>';
    $(outerElement).appendTo("#"+containerId);
    $("#childContainer").append(leftButton);
    $("#childContainer").append(rightButton);
    for(var index = 0 ; index < elements.length; index++){
        var newElement = $(elements[index]).clone();
        $(newElement).addClass("gravity");
        if(index>=options["itemCount"]){
            $(newElement).css({
                "width" : "0%",
                "display" : "none"
            });
        }
        $("#childContainer").append(newElement);
    }
    if(currentElement.totalElementsCount <= currentElement.bucket){
        $("#"+currentElement.leftButtonId).css("display","none");
        $("#"+currentElement.rightButtonId).css("display","none");
    }
    else{
        $("#"+currentElement.leftButtonId).css("display","none");
    }
    $("#"+containerId).on("click",".rightSliderBtn",function(){
        rightButtonClick(this.id);
    });
    $("#"+containerId).on("click",".leftSliderBtn",function(){
        leftButtonClick(this.id);
    });
}