	var vBrowsermouseposX = 0;
	var vBrowsermouseposY = 0;
	var vBagemouseposX = 0;
	var vPagemouseposY = 0;
	vDisableHide = 0;
	
	// distancia do layer p/o cursor
	var vSpaceLayerCursor = 10;
	var IE = document.all?true:false;
	//identifica browser e seta variáveis especícas p/os mesmos

	function SourceBrowser(theLayer) {
		if (navigator.appName == 'Netscape') {
			vHeightScreen = self.innerHeight;
			vWidthScreen = self.innerWidth;
			vHeightLayerOrigin = vIdentifyObject.offsetHeight;
			vWidthLayerOrigin = vIdentifyObject.offsetWidth;
			vWidthLayer = vIdentifyObject.offsetWidth;
			vHeightLayer = vIdentifyObject.offsetHeight; 
			vHeightLayer = vIdentifyObject.offsetHeight; 
		} else {
			vHeightScreen = document.body.clientHeight;
			vWidthScreen = document.body.clientWidth;
			vHeightLayerOrigin = vIdentifyObject.offsetHeight;
			vWidthLayerOrigin = vIdentifyObject.offsetWidth;
			vHeightLayer = vIdentifyObject.offsetHeight;
			vWidthLayer = vIdentifyObject.offsetWidth;
			vHeightLayer = vIdentifyObject.offsetHeight;
		}
	}
	
	// If NS - that is, !IE - then set up for mouse capture
	if (!IE) document.captureEvents(Event.MOUSEMOVE);
	// Set-up to use getMouseXY function onMouseMove
	document.onmousemove = getMouseXY;
	// Main function to retrieve mouse x-y pos.s
	function getMouseXY(e) {
		if (IE) { // grab the x-y pos.s if browser is IE
			vBrowsermouseposX = event.clientX; 
			vBrowsermouseposY = event.clientY;
			vPagemouseposX = event.clientX  + document.body.scrollLeft;
			vPagemouseposY = event.clientY + document.body.scrollTop;
		} else {  // grab the x-y pos.s if browser is NS
			vBrowsermouseposX = e.pageX - self.pageXOffset;
			vBrowsermouseposY = e.pageY - self.pageYOffset;
			vPagemouseposX = e.pageX ;
			vPagemouseposY = e.pageY;
		}   
		return true
	}
	
	/*
	isIE=document.all;
	isNN=!document.all&&document.getElementById;
	isN4=document.layers;
	isHot=false;*/
	 
	function PutLayerY(theLayer){
		vSapcebotton = vHeightScreen - vBrowsermouseposY;
		if ( vHeightLayer > vSapcebotton ) {// layer acima do cursor
			if (vHeightLayer > vHeightScreen) {
				vSpaceLayerCursor = -10;
				vObjectLayer.overflow = 'scroll';
				vObjectLayer.height = vHeightScreen;
				vNewLayerPosY = vPagemouseposY - vBrowsermouseposY;
				vDisableHide = 1;
			} else {
				if (vHeightLayer > vBrowsermouseposY) {
					vNewLayerPosY = vPagemouseposY - vBrowsermouseposY;
				} else { 
					vNewLayerPosY = vPagemouseposY - vHeightLayer - vSpaceLayerCursor;
				}
			}
		} else {// layer abaixo do cursor
			vNewLayerPosY = vPagemouseposY + vSpaceLayerCursor;
		}
	}
	
	function PutLayerX(theLayer){
		if ( vWidthLayer < vBrowsermouseposX ) { //layer à esquerda do cursor
			vNewLayerPosX = vBrowsermouseposX - vWidthLayer - vSpaceLayerCursor;
		} else {// layer à direita do cursor
			if (vWidthLayer > (vWidthScreen - vBrowsermouseposX)) {
				vNewLayerPosX = vBrowsermouseposX + vSpaceLayerCursor;
				vNewWidthLayer = vWidthScreen - vBrowsermouseposX - vSpaceLayerCursor;
				vObjectLayer.width = vNewWidthLayer;                  
				if (vHeightLayer > vHeightScreen) {
					vObjectLayer.overflow = 'scroll';
					vSpaceLayerCursor = - 10;
					vObjectLayer.height = vHeightScreen;
					vNewLayerPosY = vPagemouseposY - vBrowsermouseposY;
				}
			} else {
				vNewLayerPosX = vBrowsermouseposX + vSpaceLayerCursor;
			}
		}
	}
	
	//mostra o layer na posição correta
	function showMe(theLayer) {
		//alert(theLayer);
		vIdentifyObject = document.getElementById(theLayer);
		vObjectLayer = document.getElementById(theLayer).style;
		SourceBrowser(theLayer);
		PutLayerY(theLayer);
		PutLayerX(theLayer);
		vObjectLayer.top = vNewLayerPosY;
		vObjectLayer.left= vNewLayerPosX;
		vObjectLayer.visibility = 'visible';
	}
	
	//esconde o layer e retorna todos os seus valores aos iniciais
	function hideMe(theLayer) {
		if(vDisableHide == 0) {
			vObjectLayer.visibility = 'hidden';
			vSpaceLayerCursor = 10;
			vObjectLayer.overflow = '';
			vObjectLayer.height = vHeightLayerOrigin;
			vObjectLayer.Width = vWidthLayerOrigin;
		}
		vDisableHide = 0;
	}
	
	function DisableHide() {
		vDisableHide = 1;
	}
	
	function EnableHide(theLayer) {
		vDisableHide = 0;
		vObjectLayer = document.getElementById(theLayer).style;
		hideMe(theLayer);
	}