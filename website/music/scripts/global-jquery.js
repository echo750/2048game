//隐藏时点击之后显示页面，显示时点击之后隐藏页面
$(function(){
	var $links=$("article nav a");
	var $section=$("section");
	$section.css("display","none");
	$links.each(function(index,element){
		$(this).toggle(function(){
			var same=$(this).attr("href").split("#")[1];
			$("#"+same).toggle();
		},function(){
			var same=$(this).attr("href").split("#")[1];
			$("#"+same).toggle();
		});
	});
});

//高亮显示当前页面导航栏
$(function(){
	var $links=$("header ul li a");
	$links.each(function(){
		if(window.location.href.indexOf($(this).attr("href"))!=-1){
			$(this).attr("class","here");
		}
	});
});

//
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById||!document.getElementsByTagName) return false;
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dlist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dlist;
	}
	if(xpos>final_x){
		var dlist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dlist;
	}
	if(ypos<final_y){
		var dlist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dlist;
	}
	if(ypos>final_y){
		var dlist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dlist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}


$(function(){
	var $intro=$("#intro");
	var slideshow=$("<div id='slideshow'></div>");
	var frame=$("<img src='images/frame.gif' id='frame'></img>");
	slideshow.append(frame);
	var preview=$("<img src='images/slideshow.gif' id='preview'></img>");
	slideshow.append(preview);
	$intro.after(slideshow);
	var $links=$("a");
	$links.each(function(){
		$(this).hover(function(){
			if($(this).attr("href").indexOf("index.html")!=-1){
				$(this).css("backgroundColor","#bbb");
				moveElement("preview",0,0,5);
			}
			if($(this).attr("href").indexOf("about.html")!=-1){
				$(this).css("backgroundColor","#bbb");
				moveElement("preview",-150,0,5);
			}
			if($(this).attr("href").indexOf("photos.html")!=-1){
				$(this).css("backgroundColor","#bbb");
				moveElement("preview",-300,0,5);
			}
			if($(this).attr("href").indexOf("live.html")!=-1){
				$(this).css("backgroundColor","#bbb");
				moveElement("preview",-450,0,5);
			}
			if($(this).attr("href").indexOf("contact.html")!=-1){
				$(this).css("backgroundColor","#bbb");
				moveElement("preview",-600,0,5);	
			}
		},function(){
			$(this).css("backgroundColor","");
		});
	});
});


$(function(){
	var placeholder=$("<img id='placeholder' src='images/placeholder.gif' alt='my images gallery'></img>");
	var description=$("<p id='description'>choose an image</p>");
	$("#imagegallery").after(placeholder);
	$("#placeholder").after(description);
	var $links=$("#imagegallery a");
	$links.each(function(){
		$(this).mouseover(function(){
			placeholder.attr("src",$(this).attr('href'));
			description.html($(this).attr('title'));
		});
	});
});

$(function(){
	var $tr=$("table tr");
	$("$tr:even").attr("class","odd");
	$tr.each(function(){
		$(this).hover(function(){
			$(this).attr("class","highlight");
		},function(){
			$(this).attr("class","odd");
		})
	})
});


