	function makePossibleCardsDraggableandDroppable(){
        for(i=0;i<NUMBER_OF_PLAYSTACKS;i++){
        		$("#P"+(i+1)+topOfP[i]+"").draggable("enable");
//        		$("#P"+(i+1)+topOfP[i]+"").draggable({revert:'invalid',revertDuration : 500,zIndex:10,opacity:0.85,cursor:'move'});
        			$("#P"+(i+1)+topOfP[i]).draggable({
        				revert:function(){
        				if(this[0].id[0]=="P"){
        					values = makeAppendable(this[0].id)        					
		        			for(l=0;l<values.length;l++){
									$("#P_"+values[l][1]+values[l][2]).append($("#"+values[l]));
	   							$("#"+values[l]).css({"top":"0px"});		
								}
							}
	        				return "invalid"
        				},
        				revertDuration : 10,
        				zIndex:10,opacity:0.85,cursor:'move',
		        		start:function(event,ui){
		        		if(ui.helper[0].id[0]=="P"){
		        			values = makeAppendable(ui.helper[0].id)
		           		if(values.length>0){
		        				if(values[values.length-1][2] == topOfP[(values[values.length-1][1]-1)]){
		        					for(l=0;l<values.length;l++){
										var top = (l+1)*-135;
	   								$("#"+values[l]).css({"position":"relative","top":top});		
										$("#P"+ui.helper[0].id[1]+ui.helper[0].id[2]).append($("#"+values[l]))
										$("#P"+ui.helper[0].id[1]+ui.helper[0].id[2]).css({"height":160+((l+1)*25)})
										}		
									}
								}
							}
        				}
        			});					
        	   if(topOfP[i]>=(-2)){        	   
        	   if($("#P_"+(i+1)+(topOfP[i]+1)).size()==0){
        	   	$("#P"+(i+1)).append('<div id="P_'+(i+1)+(topOfP[i]+1)+'" class="container"></div>')
        	   	var top = (topOfP[i]+1)*-137
        	   	$("#P_"+(i+1)+(topOfP[i]+1)).css({'position':'relative','top':top+'px','visibility':'hidden'});
        	   }
        			$("#P_"+(i+1)+(topOfP[i]+1)).droppable("enable");
        			$("#P_"+(i+1)+(topOfP[i]+1)).droppable({
					accept:function(event,ui){
								if(this.id[3]-(-($("#"+event[0].id).children().size()))>10)
									return false;
								var val = isSuitableForPlayStack(this.id,event[0].id); 				
								return val;								
					},
					drop:function(event,ui){
						dest_id = this.id
						src_id = ui.draggable[0].id
						if($("#"+src_id).children().size()>1){
							makeUIChangesForMultipleValues(dest_id,src_id);
							var size = $("#"+src_id).children().size()
							resetValuesForMultipleValues(dest_id,src_id,this.children[0].childNodes[0].id,ui.draggable[0].id);
							for(i=1;i<size;i++){
					      	   if($("#P_"+(dest_id[2])+(dest_id[3]-(-1*i))).size()==0){
        	   						$("#P"+(dest_id[2])).append('<div id="P_'+(dest_id[2])+(dest_id[3]-(-1*i))+'" class="container"></div>')
        	   						var top = (topOfP[dest_id[2]-1]-(-1))*-137
        	   						$("#P_"+(dest_id[2])+(dest_id[3]-(-1*i))).css({'position':'relative','top':top+'px','visibility':'hidden'});
        	   					}
        	   					var d = $("#P_"+(dest_id[2])+(dest_id[3]-(-1*i)))[0].id
        	   					var s = $("#P"+(dest_id[2])+(dest_id[3])).children()[1].id
        	   					var imageId = $("#P"+(dest_id[2])+(dest_id[3])).children()[1].childNodes[0].id
        	   					makeUIChangesForMultipleValues(d,s);
									resetValuesForMultipleValues(d,s,imageId);
							}
							$("#P"+(dest_id[2])+(dest_id[3])).css({"height":"160"})		
							$(".ui-droppable").each(function(index){$(this).droppable("disable")});  
							$(".ui-draggable").each(function(index){$(this).draggable("disable")});
							scanForPlacements();
							if(topOfT[0]==(MAX_CARD_VALUE+1) &&topOfT[1]== (MAX_CARD_VALUE+1) &&topOfT[2]==(MAX_CARD_VALUE+1) &&topOfT[3]==(MAX_CARD_VALUE+1))
								alert("Congratulations.... You've Won!!!")
							else{
      						makePossibleCardsDraggableandDroppable();
      						makePlayStackCardsDraggableAndDroppable();
      					}					
						}
						else{
						makeUIChanges();
						resetValues(this.children[0].childNodes[0].id,ui.draggable[0].id);
						}
						}        				
        			});
        		}        		
        		}
			for(i=0;i<NUMBER_OF_SWAP_AREAS;i++){
				if(topOfW[i]==0){
					$("#W_"+(i+1)+"0").droppable("enable");
					$("#W_"+(i+1)+"0").droppable({
					accept:function(event,ui){
						if($("#"+event[0].id).children().size()>1)
							return false;
						return isSuitable(this.id,event[0].id);						
					},
					drop:function(event,ui){
						dest_id = this.id
						src_id = ui.draggable[0].id
						makeUIChanges();
						resetValues(this.children[0].childNodes[0].id,ui.draggable[0].id);						
					}
					});				
					}
					else{
        				$("#W"+(i+1)+"0").draggable("enable");						
        				$("#W"+(i+1)+"0").draggable({revert:'invalid',revertDuration : 10,zIndex:10,opacity:0.85,cursor:'move'});						
					}		
			}
			for(i=0;i<4;i++){
				if(topOfT[i]<14){
			   	$("#T"+(i+1)).droppable("enable");
        			$("#T"+(i+1)).droppable({
					accept:function(event,ui){
						return isSuitableForTarget(this.id,event[0].id);						
					},
					drop:function(event,ui){
							dest_id = this.id;
							src_id = ui.draggable[0].id;
							$("#"+dest_id).children().each(function(index){$(this).hide()});		
							makeUIChanges();
							resetValues(this.children[(topOfT[dest_id[1]-1]-1)].childNodes[0].id,ui.draggable[0].id);																
						}        				
        			});
	
				}
			}
	}

	function makePlayStackCardsDraggableAndDroppable(){
	var topCard,bottomCard,topCardIndex,bottomCardIndex;
	var flag=0;
		for(i=0;i<NUMBER_OF_PLAYSTACKS;i++)
			for(j=(topOfP[i]);j>0;j--){
				flag=0;
				topCard = P[i][j-1];
				bottomCard = P[i][j];
				if(topCard[1]=="1" && topCard[2]){
					topCardIndex = topCard[1]+topCard[2] 
				}
				else{
					topCardIndex = topCard[1]
				} 				
				if(bottomCard[1]=="1" && bottomCard[2]){
					bottomCardIndex = bottomCard[1]+bottomCard[2] 
				}
				else{
					bottomCardIndex = bottomCard[1]
				}
				if((topCardIndex-1)==bottomCardIndex){
						if(topCard[0]=="C" && (bottomCard[0]=="H"||bottomCard[0]=="D"))
							flag=1;
						if(topCard[0]=="S" && (bottomCard[0]=="H"||bottomCard[0]=="D"))
							flag=1;
						if(topCard[0]=="D" && (bottomCard[0]=="C"||bottomCard[0]=="S"))
							flag=1;
						if(topCard[0]=="H" && (bottomCard[0]=="C"||bottomCard[0]=="S"))
							flag=1;					
				}
				if(flag==1){
        			$("#P"+(i+1)+(j-1)).draggable("enable");
        			$("#P"+(i+1)+(j-1)).draggable({
        				revert:function(){
        					values = makeAppendable(this[0].id)        					
		        			for(l=0;l<values.length;l++){
									$("#P_"+values[l][1]+values[l][2]).append($("#"+values[l]));
	   							$("#"+values[l]).css({"top":"0px"});		
								}
	        				return "invalid"
        				},
        				revertDuration : 10,
        				zIndex:10,opacity:0.85,cursor:'move',
		        		start:function(event,ui){
		        			values = makeAppendable(ui.helper[0].id)
		        			if(values.length>0)
		        				if(values[values.length-1][2] == topOfP[(values[values.length-1][1]-1)]){
		        				for(l=0;l<values.length;l++){
									var top = (l+1)*-135;
	   							$("#"+values[l]).css({"position":"relative","top":top});		
									$("#P"+ui.helper[0].id[1]+ui.helper[0].id[2]).append($("#"+values[l]))
									$("#P"+ui.helper[0].id[1]+ui.helper[0].id[2]).css({"height":160+((l+1)*25)})
								}
							}
        				}
        			});					
				}	 				
				else break;
			}
	}

	function resetValues(cardId,positionId){
		if(dest_id[0]=="W" && src_id[0]=="P"){
			W[dest_id[2]-1] = cardId 
			topOfW[dest_id[2]-1] = 1 
			topOfP[src_id[1]-1]--;
			P[(src_id[1]-1)][src_id[2]]='-'
			$("#"+positionId+"").attr("id","W"+dest_id[2]+dest_id[3]);
			$("#"+src_id[0]+"_"+src_id[1]+src_id[2]).css("visibility","hidden")			
		}
		if(dest_id[0]=="P" && src_id[0]=="P"){
			P[src_id[1]-1][src_id[2]] = '-' 
			topOfP[src_id[1]-1]--;
			topOfP[dest_id[2]-1]++;
			P[(dest_id[2]-1)][dest_id[3]]= cardId;
			$("#"+positionId+"").attr("id","P"+dest_id[2]+dest_id[3]);
			$("#"+src_id[0]+"_"+src_id[1]+src_id[2]).css("visibility","hidden")
			$("#"+dest_id[0]+"_"+dest_id[2]+dest_id[3]).css("visibility","visible")
		}
		if(dest_id[0]=="P" && src_id[0]=="W"){
			W[src_id[1]-1] = '-'  
			topOfW[src_id[1]-1] = 0; 
			topOfP[dest_id[2]-1]++;
			P[(dest_id[2]-1)][dest_id[3]] = cardId 
			$("#"+positionId+"").attr("id","P"+dest_id[2]+dest_id[3]);
			$("#"+dest_id[0]+"_"+dest_id[2]+dest_id[3]).css("visibility","visible")
		}
		if(dest_id[0]=="W" && src_id[0]=="W"){
			W[src_id[1]-1] = '-'  
			topOfW[src_id[1]-1] = 0; 
			topOfW[dest_id[2]-1] = 1;
			W[(dest_id[2]-1)] = cardId; 
			$("#"+positionId+"").attr("id","W"+dest_id[2]+dest_id[3]);
		}
		if(dest_id[0]=="T" && src_id[0]=="P"){
			P[src_id[1]-1][src_id[2]] = '-'  
			topOfP[src_id[1]-1]--; 
			T[(dest_id[1]-1)][(topOfT[dest_id[1]-1]-1)] = cardId; 
			topOfT[dest_id[1]-1]++;
			$("#"+positionId+"").attr("id","T"+dest_id[1]+(topOfT[dest_id[1]-1]-2));
			$("#"+src_id[0]+"_"+src_id[1]+src_id[2]).css("visibility","hidden")
		}
		if(dest_id[0]=="T" && src_id[0]=="W"){
			W[src_id[1]-1] = '-'  
			topOfW[src_id[1]-1] = 0; 
			T[(dest_id[1]-1)][(topOfT[dest_id[1]-1]-1)] = cardId; 
			topOfT[dest_id[1]-1]++;
			$("#"+positionId+"").attr("id","T"+dest_id[1]+src_id[2]);
		}
		$(".ui-droppable").each(function(index){$(this).droppable("disable")});  
		$(".ui-draggable").each(function(index){$(this).draggable("disable")});
		scanForPlacements();
		if(topOfT[0]==(MAX_CARD_VALUE+1) &&topOfT[1]== (MAX_CARD_VALUE+1) &&topOfT[2]==(MAX_CARD_VALUE+1) &&topOfT[3]==(MAX_CARD_VALUE+1))
			alert("Congratulations.... You've Won!!!")
		else{
      	makePossibleCardsDraggableandDroppable();
      	makePlayStackCardsDraggableAndDroppable();
      }
}

	function isSuitableForPlayStack(hostId,guestId){
	var cardId = $("#"+guestId).children()[0].id
	if(hostId[3]>0){
		var topCard = $("#"+(hostId[0])+(hostId[2])+(hostId[3]-(1))).children()[0].id
	var topCardIndex,cardIndex;
	if(topCard[1]=="1" && topCard[2]){
		topCardIndex = topCard[1]+topCard[2] 
	}
	else{
		topCardIndex = topCard[1]
	} 
	if(cardId[1]=="1" && cardId[2]){
		cardIndex = cardId[1]+cardId[2] 
	}
	else{
		cardIndex = cardId[1]
	} 
	if((topCardIndex-1)==cardIndex){
		if(topCard[0]=="C" && (cardId[0]=="H"||cardId[0]=="D"))
			return true;
		if(topCard[0]=="S" && (cardId[0]=="H"||cardId[0]=="D"))
			return true;
		if(topCard[0]=="D" && (cardId[0]=="C"||cardId[0]=="S"))
			return true;
		if(topCard[0]=="H" && (cardId[0]=="C"||cardId[0]=="S"))
			return true;
		return false
	}
	else
		return false;
	}
	return true;
}
	function isSuitable(hostId,guestId){
	if($("#"+guestId).children.length==2){
		if(hostId[0]==guestId[0] && hostId[2]==guestId[1])
			return false;
		else
			return true;
	}
}

	function isSuitableForTarget(hostId,guestId){
	var cardId = $("#"+guestId).children()[0].id
	var cardIndex;
		if(cardId[1]=="1" && cardId[2]){
		cardIndex = cardId[1]+cardId[2] 
	}
	else{
		cardIndex = cardId[1]
	} 
	if(topOfT[hostId[1]-1] == cardIndex){
		if(hostId[1]-1==0 && cardId[0]=="C")		
			return true;
		if(hostId[1]-1==1 && cardId[0]=="D")		
			return true;
		if(hostId[1]-1==2 && cardId[0]=="H")		
			return true;
		if(hostId[1]-1==3 && cardId[0]=="S")		
			return true;
	}
	else
		return false;
}	   

	function makeAppendable(topCardId){
		var i = topCardId[1]
		var j = topCardId[2]
		var count=0;
		var returnList = new Array()
		for(k=j-(-1);k<=topOfP[i-1];k++){
			if(satisfiesCondition(i,k))
				returnList[count++] = "P"+i+k; 
			else
				break;
		}		
		return returnList;
	}
	
	function satisfiesCondition(i,k)	{
		var topCard = P[i-1][k-1];
		var bottomCard = P[i-1][k];
		if(topCard[1]=="1" && topCard[2]){
			topCardIndex = topCard[1]+topCard[2] 
		}
		else{
			topCardIndex = topCard[1]
		} 				
		if(bottomCard[1]=="1" && bottomCard[2]){
			bottomCardIndex = bottomCard[1]+bottomCard[2] 
		}
		else{
			bottomCardIndex = bottomCard[1]
		}
		if((topCardIndex-1)==bottomCardIndex){
			return true;
		}
		else
			return false;
	}
	
	function makeUIChanges(){
			$("#"+dest_id).append($("#"+src_id))
			$("#"+src_id).css("top","0")
			$("#"+src_id).css("left","0")		
	}

	function makeUIChangesForMultipleValues(dest_id,src_id){
			$("#"+dest_id).append($("#"+src_id))
			$("#"+src_id).css("top","0")
			$("#"+src_id).css("left","0")		
	}
	function resetValuesForMultipleValues(dest_id,src_id,cardId){
		if(dest_id[0]=="P" && src_id[0]=="P"){
			P[src_id[1]-1][src_id[2]] = '-' 
			topOfP[src_id[1]-1]--;
			topOfP[dest_id[2]-1]++;
			P[(dest_id[2]-1)][dest_id[3]]= cardId;
			$("#"+src_id+"").attr("id","P"+dest_id[2]+dest_id[3]);
			$("#"+src_id[0]+"_"+src_id[1]+src_id[2]).css("visibility","hidden")
			$("#"+dest_id[0]+"_"+dest_id[2]+dest_id[3]).css("visibility","visible")
		}
	}
