var gamePattern=[];

var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level = 0;

$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatepress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});




function nextSequence(){


    level=level+1;
    $("#level-title").text("Level " + level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}


function animatepress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        
        $("."+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
        {
            setTimeout(function(){nextSequence();},1000);
        }
        else{
            playsound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            startover();
        }
    }
function playsound(name){
        var audio= new Audio("./sounds/"+name+".mp3");
        audio.play();
    }

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}
