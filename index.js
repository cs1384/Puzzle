$(document).ready(function(){   

    var numPic;
    var firstI;
    var lastI;
    var pics;
    var match;
    
    $("#startb").click( function() {
         
        $(".bigpic").fadeOut("slow");
        $(".smallpic").fadeIn("slow");
		
	    match = 0;
	    numPic = 12;

        pics = $.makeArray($(".show > img"));
        pics.sort(function(){ return 0.5 - Math.random()});
        for (var i=0 ; i<numPic ; i++) {
            $(pics[i]).css("z-index",i+11);
        }
        
        firstI = numPic-1;
        lastI = 0; 
        $(pics).fadeIn("slow");

	    $("#startb").attr("disabled","true");
	    $("#resetb").prop("disabled",false);

	    $(".puzzp1").hide();
	    $(".puzzp2").fadeIn("slow");
                  
    });

    $("#leftb").click( function() {
        
        $(pics[firstI]).hide("slide",{direction:"left"},300);
        
        lastI = firstI;
        
        if(firstI == 0) {
            firstI = numPic - 1;
        }else {
            firstI = firstI - 1;
        }
        
        $(pics[lastI]).css("z-index",10);
        
        for (var i=0 ; i<numPic ; i++) {
            $(pics[i]).css("z-index",parseInt($(pics[i]).css("z-index"))+1);
        }
        
        $(pics[lastI]).show("slide",{direction:"right"},300);
        
    });

    $("#rightb").click( function() {
        
        $(pics[lastI]).css("z-index",11+numPic);
        
        $(pics[firstI]).hide("slide",{direction:"right"},300);
        
        for (var i=0 ; i<numPic ; i++) {
            $(pics[i]).css("z-index",parseInt($(pics[i]).css("z-index"))-1);
        }
        
        $(pics[firstI]).show("slide",{direction:"left"},300);
        
        firstI = lastI;
        
        if(lastI == numPic-1) {
            lastI = 0
        }else {
            lastI = lastI + 1;
        }
        
    });

    $(".puzz").draggable({revert:"invalid"},{helper:"clone"},{stack:"img"},
	    {start:function(event,ui){   
            	if(!$($(this).parent()).hasClass("show")) {
            		$($(this).parent()).droppable("enable");
            		$($(this).parent()).removeClass("picbox2");
            		$($(this).parent()).css("opacity","");
        		}
    		}
	    },
	    {stop:function(event,ui){
    			if(!$($(this).parent()).hasClass("show")){
    			$($(this).parent()).droppable("disable");
    			$($(this).parent()).css("opacity",1);
           	 		$($(this).parent()).addClass("picbox2");
    			}
    		}
    	}
    );

    $(".picbox").droppable({hoverClass:"hoverb"},
        {drop:function(event,ui){    
        	if($($(ui.draggable).parent()).hasClass("show")) {                	
        		pics.splice(firstI,1);
        		numPic--;
        		if(firstI == 0){
        			firstI = numPic-1;
        			lastI = 0;
        		}else if(firstI == numPic) {
        			firstI = numPic-1;
        		}else {
        			lastI = firstI;
        			firstI = firstI-1; 
        		}
        	}
        	if(ui.draggable.attr("id")+ "b" == $($(ui.draggable).parent()).attr("id")) {
                match--;
            }
        	ui.draggable.detach().appendTo($(this));
        	$(ui.draggable).css("z-index",10);
        	$(this).css("z-index",10);
            if(ui.draggable.attr("id")+ "b" == $(this).attr("id")) {
                match++;
            }
            if(match==12) {
                var ob = $(".finish");
                ob.show("bounce", {distance:400},5000);
                $("#wall").attr("target","_blank");
                $("#wall").attr("href","Wallpaper/Wal1paper.jpeg");
            }
        }
    });

    $(".puzz").dblclick( function() {
        if($(this).attr("id")+ "b" == $($(this).parent()).attr("id")) {
            match--;
        }
        if(!$($(this).parent()).hasClass("show")) {
            $($(this).parent()).droppable("enable");
            $($(this).parent()).removeClass("picbox2");
            $($(this).parent()).css("opacity","");
        }
    	$(this).css("z-index",11+numPic);
            $(this).detach().appendTo($(".show"));
            if(firstI == numPic-1) {
    		pics.splice(0, 0, $(this));
    		firstI = 0;
    		lastI = firstI+1;
    		numPic++;
    	}else {
    		pics.splice(firstI+1, 0, $(this));
    		firstI = firstI+1;
    		numPic++;
    		if(firstI = numPic-1){
    			lastI = 0;
    		}else {
    			lastI = firstI + 1;
    		}
    	}
    });

    $("#resetb").click( function(){
        location.reload();
        
    }); 
});

