// Admin Page
function Total_Soft_Gallery_Video_AMD2_But1(Gallery_Video_ID)
{
	jQuery('.Total_Soft_Gallery_Video_AMD2').hide(500);
	jQuery('.Total_Soft_Gallery_VideoAMMTable').hide(500);
	jQuery('.Total_Soft_Gallery_VideoAMOTable').hide(500);
	jQuery('.Total_Soft_Gallery_Video_Save').show(500);
	jQuery('.Total_Soft_Gallery_Video_Update').hide(500);
	jQuery('.Total_Soft_Gallery_Video_ID').html('[Total_Soft_Gallery_Video id="'+Gallery_Video_ID+'"]');
	jQuery('.Total_Soft_Gallery_Video_TID').html('&lt;?php echo do_shortcode(&#039;[Total_Soft_Gallery_Video id="'+Gallery_Video_ID+'"]&#039;);?&gt');
	Total_Soft_GVideo_Editor();
	setTimeout(function(){
		jQuery('.Total_Soft_Gallery_Video_AMD3').show(500);
		jQuery('.Total_Soft_AMTable').show(500);
		jQuery('.Total_Soft_AMVideoTable').show(500);
		jQuery('.Total_Soft_AMVideoTable1').show(500);
		jQuery('.Total_Soft_GV_AMShortTable').show(500);
	},500)
}
function TotalSoft_Reload()
{
	location.reload();
}
function TotalSoftGallery_Video_Show()
{
	var TotalSoftGallery_Video_ShowType=jQuery('#TotalSoftGallery_Video_ShowType').val();
	if(TotalSoftGallery_Video_ShowType=='All')
	{
		jQuery('#TotalSoftGallery_Video_PerPage').hide(500);
		jQuery('#TotalSoftGallery_LoadMore').hide(500);
	}
	else if(TotalSoftGallery_Video_ShowType=='Pagination')
	{
		jQuery('#TotalSoftGallery_LoadMore').hide(500);
		setTimeout(function(){
			jQuery('#TotalSoftGallery_Video_PerPage').show(500);
		},500)
	}
	else
	{
		jQuery('#TotalSoftGallery_Video_PerPage').show(500);
		jQuery('#TotalSoftGallery_LoadMore').show(500);
	}	
}
function TotalSoftGallery_Video_URL_Clicked()
{
	var nIntervId = setInterval(function(){
		var code = jQuery('#TotalSoftGallery_Video_URL_1').val();
		
		if(code.indexOf('https://www.youtube.com/')>0)
		{
			if(code.indexOf('list')>0 || code.indexOf('index')>0)
			{
				var TotalSoftCodes1 = code.split('<a href="https://www.youtube.com/');
				var TotalSoftCodes2= TotalSoftCodes1[1].split("=");
				var TotalSoftCodeSrc = TotalSoftCodes2[1].split('&');

				jQuery('#TotalSoftGallery_Video_URL_2').val('https://www.youtube.com/embed/'+TotalSoftCodeSrc[0]);
				jQuery('#TotalSoftGallery_VideoIm_URL_2').val('http://img.youtube.com/vi/'+TotalSoftCodeSrc[0]+'/mqdefault.jpg');
				jQuery('#TotalSoftGallery_Video_Video_1').val('https://www.youtube.com/watch?v='+TotalSoftCodeSrc[0]);

				if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
					clearInterval(nIntervId);
				}				
			}
			else if(code.indexOf('embed')>0)
			{
				var TotalSoftCodes1=code.split('[embed]');
				var TotalSoftCodes2=TotalSoftCodes1[1].split('[/embed]');
				if(TotalSoftCodes2[0].indexOf('watch?')>0)
				{
					var TotalSoftCodes3=TotalSoftCodes2[0].split('=');
					
					jQuery('#TotalSoftGallery_Video_URL_2').val('https://www.youtube.com/embed/'+TotalSoftCodes3[1]);
					jQuery('#TotalSoftGallery_VideoIm_URL_2').val('http://img.youtube.com/vi/'+TotalSoftCodes3[1]+'/mqdefault.jpg');
					jQuery('#TotalSoftGallery_Video_Video_1').val('https://www.youtube.com/watch?v='+TotalSoftCodes3[1]);
					if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
						clearInterval(nIntervId);
					}	
				}
				else
				{
					var TotalSoftCodes2 = TotalSoftCodes1[1].split('=');
					var TotalSoftCodeSrc = TotalSoftCodes2[1].split('">https://');

					jQuery('#TotalSoftGallery_Video_URL_2').val('https://www.youtube.com/embed/'+TotalSoftCodeSrc[0]);
					jQuery('#TotalSoftGallery_VideoIm_URL_2').val('http://img.youtube.com/vi/'+TotalSoftCodeSrc[0]+'/mqdefault.jpg');
					jQuery('#TotalSoftGallery_Video_Video_1').val('https://www.youtube.com/watch?v='+TotalSoftCodeSrc[0]);

					if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
						clearInterval(nIntervId);
					}
				}
			}
			else
			{
				var TotalSoftCodes1 = code.split('<a href="https://www.youtube.com/');
				var TotalSoftCodes2 = TotalSoftCodes1[1].split('=');

				if(TotalSoftCodes2.length >= 5) 
				{
					var TotalSoftCodeSrc = TotalSoftCodes2[3].split('&');
				}
				else
				{
					var TotalSoftCodeSrc = TotalSoftCodes2[1].split('">https://');
				}

				jQuery('#TotalSoftGallery_Video_URL_2').val('https://www.youtube.com/embed/'+TotalSoftCodeSrc[0]);
				jQuery('#TotalSoftGallery_VideoIm_URL_2').val('http://img.youtube.com/vi/'+TotalSoftCodeSrc[0]+'/mqdefault.jpg');
				jQuery('#TotalSoftGallery_Video_Video_1').val('https://www.youtube.com/watch?v='+TotalSoftCodeSrc[0]);

				if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
					clearInterval(nIntervId);
				}				
			}		
		}
		else if(code.indexOf('https://youtu.be/')>0)
		{
			var TotalSoftCodes1 = code.split('<a href="https://youtu.be/'); 
			var TotalSoftCodeSrc = TotalSoftCodes1[1].split('">https://');

			jQuery('#TotalSoftGallery_Video_URL_2').val('https://www.youtube.com/embed/'+TotalSoftCodeSrc[0]);
			jQuery('#TotalSoftGallery_VideoIm_URL_2').val('http://img.youtube.com/vi/'+TotalSoftCodeSrc[0]+'/mqdefault.jpg');
			jQuery('#TotalSoftGallery_Video_Video_1').val('https://www.youtube.com/watch?v='+TotalSoftCodeSrc[0]);			

			if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
				clearInterval(nIntervId);
			}				
		}
		else if(code.indexOf('vimeo.com')>0)
		{
			if(code.indexOf('embed')>0)
			{
				var s1=code.split('[embed]https://vimeo.com/');
				var src=s1[1].split('[/embed]');
				if(src[0].length>9)
				{
					var real_src=src[0].split('/');
					src[0]=real_src[2];
				}
				jQuery('#TotalSoftGallery_Video_URL_2').val('https://player.vimeo.com/video/'+src[0]);
				jQuery('#TotalSoftGallery_Video_Video_1').val('https://vimeo.com/'+src[0]);			

				var ajaxurl = object.ajaxurl;
				var data = {
				action: 'TSoft_Vimeo_Video_Image', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
				foobar: 'https://player.vimeo.com/video/'+src[0], // translates into $_POST['foobar'] in PHP
				};
				jQuery.post(ajaxurl, data, function(response) {
					jQuery('#TotalSoftGallery_VideoIm_URL_2').val(response);
					if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
						clearInterval(nIntervId);
					}				
				});		
   			}
   			else if(code.indexOf('player.vimeo') > 0)
   			{
   				var s1 = code.split('<a href="https://player.vimeo.com/video/'); 
				var src = s1[1].split('">https://');
				if(src[0].length>9)
				{
					var real_src=src[0].split('/');
					src[0]=real_src[2];
				}
				jQuery('#TotalSoftGallery_Video_URL_2').val('https://player.vimeo.com/video/'+src[0]);
				jQuery('#TotalSoftGallery_Video_Video_1').val('https://vimeo.com/'+src[0]);			

				var ajaxurl = object.ajaxurl;
				var data = {
				action: 'TSoft_Vimeo_Video_Image', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
				foobar: 'https://player.vimeo.com/video/'+src[0], // translates into $_POST['foobar'] in PHP
				};
				jQuery.post(ajaxurl, data, function(response) {
					jQuery('#TotalSoftGallery_VideoIm_URL_2').val(response);
					if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
						clearInterval(nIntervId);
					}				
				});
   			}
			else
			{
				var s1 = code.split('<a href="https://vimeo.com/'); 
				var src = s1[1].split('">https://');
				if(src[0].length>9)
				{
					var real_src=src[0].split('/');
					src[0]=real_src[2];
				}
				jQuery('#TotalSoftGallery_Video_URL_2').val('https://player.vimeo.com/video/'+src[0]);
				jQuery('#TotalSoftGallery_Video_Video_1').val('https://vimeo.com/'+src[0]);			

				var ajaxurl = object.ajaxurl;
				var data = {
				action: 'TSoft_Vimeo_Video_Image', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
				foobar: 'https://player.vimeo.com/video/'+src[0], // translates into $_POST['foobar'] in PHP
				};
				jQuery.post(ajaxurl, data, function(response) {
					jQuery('#TotalSoftGallery_VideoIm_URL_2').val(response);
					if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
						clearInterval(nIntervId);
					}				
				});		
			}		
		}
		else if(code.indexOf('wistia.com')>0)
		{
			var TotalSoftCodes1 = code.split('<a href="');
			var TotalSoftCodes2 = TotalSoftCodes1[1].split('">https://');
			var TotalSoftCodeSrc = TotalSoftCodes2[0].split('/');
			var TotalSoftCodeSrcRe = TotalSoftCodeSrc[TotalSoftCodeSrc.length-1];

			jQuery('#TotalSoftGallery_Video_URL_2').val('//fast.wistia.net/embed/iframe/'+TotalSoftCodeSrcRe);
			jQuery('#TotalSoftGallery_Video_Video_1').val(TotalSoftCodes2[0]);

			var ajaxurl = object.ajaxurl;
			var data = {
			action: 'TSoft_Wistia_Video_Image', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
			foobar: TotalSoftCodes2[0], // translates into $_POST['foobar'] in PHP
			};
			jQuery.post(ajaxurl, data, function(response) {
				jQuery('#TotalSoftGallery_VideoIm_URL_2').val(response);
				if(jQuery('#TotalSoftGallery_Video_URL_2').val().length>0){
					clearInterval(nIntervId);
				}				
			});	
		}
	},100)	
}
function Total_Soft_Gallery_Video_Res_Vid()
{
	jQuery('#TotalSoftGallery_Video_Title').val('');
	jQuery('#TotalSoftGallery_Video_URL_1').val('');
	jQuery('#TotalSoftGallery_Video_Video_1').val('');
	jQuery('#TotalSoftGallery_Video_URL_2').val('');
	jQuery('#TotalSoftGallery_VideoIm_URL_2').val('');

	tinyMCE.get('TotalSoftGallery_Video_Desc').setContent('');
	jQuery('#TotalSoftGallery_Video_Link').val('');
	jQuery('#TotalSoftGallery_Video_ONT').attr('checked',true);
	jQuery('#Total_Soft_Gallery_Video_Upd').hide(500);
	jQuery('#Total_Soft_Gallery_Video_Sav').show(500);
}
function Total_Soft_Gallery_Video_Save_Vid()
{
	var TotalSoftGVHidNum=jQuery('#TotalSoftGVHidNum').val();
	var TotalSoftGallery_Video_Title=jQuery('#TotalSoftGallery_Video_Title').val();
	var TotalSoftGallery_Video_URL_2=jQuery('#TotalSoftGallery_Video_URL_2').val();
	var TotalSoftGallery_Video_Video_1=jQuery('#TotalSoftGallery_Video_Video_1').val();
	var TotalSoftGallery_VideoIm_URL_2=jQuery('#TotalSoftGallery_VideoIm_URL_2').val();
	var TotalSoftGallery_Video_Desc=tinyMCE.get('TotalSoftGallery_Video_Desc').getContent();
	var TotalSoftGallery_Video_Link=jQuery('#TotalSoftGallery_Video_Link').val();
	var TotalSoftGallery_Video_ONT=jQuery('#TotalSoftGallery_Video_ONT').attr('checked');
	if(TotalSoftGallery_Video_ONT=='checked')
	{ TotalSoftGallery_Video_ONT='true'; }
	else
	{ TotalSoftGallery_Video_ONT='false'; }

	if(TotalSoftGVHidNum=='0')
	{
		jQuery('#TotalSoftGallery_VideoUl').html('<li id="TotalSoftGallery_VideoLi_1"><table class="Total_Soft_AMVideoTable1 Total_Soft_AMVideoTable2"><tr><td>1</td><td><input type="text" readonly value="'+TotalSoftGallery_Video_Title+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VT_1" name="TotalSoftGallery_Video_VT_1"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_VDesc_1" name="TotalSoftGallery_Video_VDesc_1" value=\''+TotalSoftGallery_Video_Desc+'\'><input type="text" style="display:none;" class="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_VLink_1" name="TotalSoftGallery_Video_VLink_1" value="'+TotalSoftGallery_Video_Link+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Video" id="TotalSoftGallery_Video_RVideo_1" name="TotalSoftGallery_Video_RVideo_1" value="'+TotalSoftGallery_Video_Video_1+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_ONT" id="TotalSoftGallery_Video_VONT_1" name="TotalSoftGallery_Video_VONT_1" value="'+TotalSoftGallery_Video_ONT+'"></td><td><input type="text" readonly value="'+TotalSoftGallery_Video_URL_2+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VURL_1" name="TotalSoftGallery_Video_VURL_1"></td><td><img class="TotalSoftGallery_VideoImage" src="'+TotalSoftGallery_VideoIm_URL_2+'"><input type="text" readonly value="'+TotalSoftGallery_VideoIm_URL_2+'" class="Total_Soft_Select Total_Soft_Select1" style="display:none;" id="TotalSoftGallery_Video_IURL_1" name="TotalSoftGallery_Video_IURL_1"></td><td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGV_Video_Edit(1)"></i></td><td><i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGV_Video_Del(1)"></i><span class="Total_Soft_GVideo_Del_Span"><i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="Total_Soft_GVideo_Del_Vd_Yes(1)"></i><i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="Total_Soft_GVideo_Del_Vd_No(1)"></i></span></td></tr></table></li>');
	}
	else
	{
		if(TotalSoftGVHidNum%2==1)
		{
			jQuery('<li id="TotalSoftGallery_VideoLi_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"><table class="Total_Soft_AMVideoTable1 Total_Soft_AMVideoTable3"><tr><td>'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'</td><td><input type="text" readonly value="'+TotalSoftGallery_Video_Title+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value=\''+TotalSoftGallery_Video_Desc+'\'><input type="text" style="display:none;" class="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_VLink_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VLink_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value="'+TotalSoftGallery_Video_Link+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Video" id="TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value="'+TotalSoftGallery_Video_Video_1+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_ONT" id="TotalSoftGallery_Video_VONT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VONT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value="'+TotalSoftGallery_Video_ONT+'"></td><td><input type="text" readonly value="'+TotalSoftGallery_Video_URL_2+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"></td><td><img class="TotalSoftGallery_VideoImage" src="'+TotalSoftGallery_VideoIm_URL_2+'"><input type="text" readonly value="'+TotalSoftGallery_VideoIm_URL_2+'" class="Total_Soft_Select Total_Soft_Select1" style="display:none;" id="TotalSoftGallery_Video_IURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_IURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"></td><td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGV_Video_Edit('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i></td><td><i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGV_Video_Del('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i><span class="Total_Soft_GVideo_Del_Span"><i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="Total_Soft_GVideo_Del_Vd_Yes('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i><i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="Total_Soft_GVideo_Del_Vd_No('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i></span></td></tr></table></li>').insertAfter('#TotalSoftGallery_VideoUl li:nth-child('+TotalSoftGVHidNum+')');
		}
		else
		{
			jQuery('<li id="TotalSoftGallery_VideoLi_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"><table class="Total_Soft_AMVideoTable1 Total_Soft_AMVideoTable2"><tr><td>'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'</td><td><input type="text" readonly value="'+TotalSoftGallery_Video_Title+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value=\''+TotalSoftGallery_Video_Desc+'\'><input type="text" style="display:none;" class="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_VLink_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VLink_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value="'+TotalSoftGallery_Video_Link+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Video" id="TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value="'+TotalSoftGallery_Video_Video_1+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_ONT" id="TotalSoftGallery_Video_VONT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VONT_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" value="'+TotalSoftGallery_Video_ONT+'"></td><td><input type="text" readonly value="'+TotalSoftGallery_Video_URL_2+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_VURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"></td><td><img class="TotalSoftGallery_VideoImage" src="'+TotalSoftGallery_VideoIm_URL_2+'"><input type="text" readonly value="'+TotalSoftGallery_VideoIm_URL_2+'" class="Total_Soft_Select Total_Soft_Select1" style="display:none;" id="TotalSoftGallery_Video_IURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'" name="TotalSoftGallery_Video_IURL_'+parseInt(parseInt(TotalSoftGVHidNum)+1)+'"></td><td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGV_Video_Edit('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i></td><td><i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGV_Video_Del('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i><span class="Total_Soft_GVideo_Del_Span"><i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="Total_Soft_GVideo_Del_Vd_Yes('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i><i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="Total_Soft_GVideo_Del_Vd_No('+parseInt(parseInt(TotalSoftGVHidNum)+1)+')"></i></span></td></tr></table></li>').insertAfter('#TotalSoftGallery_VideoUl li:nth-child('+TotalSoftGVHidNum+')');
		}
	}
	jQuery('#TotalSoftGVHidNum').val(parseInt(parseInt(TotalSoftGVHidNum)+1));
	
	Total_Soft_Gallery_Video_Res_Vid();
}
function TotalSoftGV_Video_Edit(TotalSoftGV_Video_Li_ID)
{
	var TotalSoftGallery_Video_VT    =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.Total_Soft_Select').val();
	var TotalSoftGallery_Video_VDesc =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Desc').val();
	var TotalSoftGallery_Video_VLink =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Link').val();
	var TotalSoftGallery_Video_VONT  =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_ONT').val();
	var TotalSoftGallery_Video_VURL  =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(3)').find('.Total_Soft_Select').val();
	var TotalSoftGallery_Video_IURL  =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.Total_Soft_Select').val();
	var TotalSoftGallery_Video_Video =jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Video').val();

	jQuery('#TotalSoftGVHidUpdate').val(TotalSoftGV_Video_Li_ID);
	jQuery('#Total_Soft_Gallery_Video_Sav').hide(500);
	jQuery('#Total_Soft_Gallery_Video_Upd').show(500);

	jQuery('#TotalSoftGallery_Video_Title').val(TotalSoftGallery_Video_VT);
	jQuery('#TotalSoftGallery_Video_URL_2').val(TotalSoftGallery_Video_VURL);
	jQuery('#TotalSoftGallery_Video_Video_1').val(TotalSoftGallery_Video_Video);
	jQuery('#TotalSoftGallery_VideoIm_URL_2').val(TotalSoftGallery_Video_IURL);
	tinyMCE.get('TotalSoftGallery_Video_Desc').setContent(TotalSoftGallery_Video_VDesc);
	jQuery('#TotalSoftGallery_Video_Link').val(TotalSoftGallery_Video_VLink);

	if(TotalSoftGallery_Video_VONT=='true')
	{ jQuery('#TotalSoftGallery_Video_ONT').attr('checked', true); }
	else
	{ jQuery('#TotalSoftGallery_Video_ONT').attr('checked', false); }
}
function TotalSoftGV_Video_Del(TotalSoftGV_Video_Li_ID)
{
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_GVideo_Del_Span').addClass('Total_Soft_GVideo_Del_Span1');
}
function Total_Soft_GVideo_Del_Vd_No(TotalSoftGV_Video_Li_ID)
{
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_GVideo_Del_Span').removeClass('Total_Soft_GVideo_Del_Span1');
}
function Total_Soft_GVideo_Del_Vd_Yes(TotalSoftGV_Video_Li_ID)
{
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).remove();
	jQuery('#TotalSoftGVHidNum').val(jQuery('#TotalSoftGVHidNum').val()-1);

	jQuery("#TotalSoftGallery_VideoUl > li").each(function(){
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(1)').html(parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.Total_Soft_Select').attr('id','TotalSoftGallery_Video_VT_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.Total_Soft_Select').attr('name','TotalSoftGallery_Video_VT_'+parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Desc').attr('id','TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Desc').attr('name','TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Link').attr('id','TotalSoftGallery_Video_VLink_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Link').attr('name','TotalSoftGallery_Video_VLink_'+parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Video').attr('id','TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Video').attr('name','TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_ONT').attr('id','TotalSoftGallery_Video_VONT_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_ONT').attr('name','TotalSoftGallery_Video_VONT_'+parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(3)').find('.Total_Soft_Select').attr('id','TotalSoftGallery_Video_VURL_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(3)').find('.Total_Soft_Select').attr('name','TotalSoftGallery_Video_VURL_'+parseInt(parseInt(jQuery(this).index())+1));

		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.Total_Soft_Select').attr('id','TotalSoftGallery_Video_IURL_'+parseInt(parseInt(jQuery(this).index())+1));
		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.Total_Soft_Select').attr('name','TotalSoftGallery_Video_IURL_'+parseInt(parseInt(jQuery(this).index())+1));
	});  
}
function TotalSoftGallery_VideoUlSort()
{
	jQuery('#TotalSoftGallery_VideoUl').sortable({
	  	update: function() {
	    	jQuery("#TotalSoftGallery_VideoUl > li").each(function(){
	    		jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(1)').html(parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.Total_Soft_Select').attr('id','TotalSoftGallery_Video_VT_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.Total_Soft_Select').attr('name','TotalSoftGallery_Video_VT_'+parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Desc').attr('id','TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Desc').attr('name','TotalSoftGallery_Video_VDesc_'+parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Link').attr('id','TotalSoftGallery_Video_VLink_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Link').attr('name','TotalSoftGallery_Video_VLink_'+parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Video').attr('id','TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Video').attr('name','TotalSoftGallery_Video_RVideo_'+parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_ONT').attr('id','TotalSoftGallery_Video_VONT_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_ONT').attr('name','TotalSoftGallery_Video_VONT_'+parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(3)').find('.Total_Soft_Select').attr('id','TotalSoftGallery_Video_VURL_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(3)').find('.Total_Soft_Select').attr('name','TotalSoftGallery_Video_VURL_'+parseInt(parseInt(jQuery(this).index())+1));

				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.Total_Soft_Select').attr('id','TotalSoftGallery_Video_IURL_'+parseInt(parseInt(jQuery(this).index())+1));
				jQuery(this).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.Total_Soft_Select').attr('name','TotalSoftGallery_Video_IURL_'+parseInt(parseInt(jQuery(this).index())+1));
			});         
	   	}
    });	
}
function Total_Soft_Gallery_Video_Update_Vid()
{
	var TotalSoftGV_Video_Li_ID=jQuery('#TotalSoftGVHidUpdate').val();

	var TotalSoftGallery_Video_Title=jQuery('#TotalSoftGallery_Video_Title').val();
	var TotalSoftGallery_Video_URL_2=jQuery('#TotalSoftGallery_Video_URL_2').val();
	var TotalSoftGallery_Video_Video_1=jQuery('#TotalSoftGallery_Video_Video_1').val();
	var TotalSoftGallery_VideoIm_URL_2=jQuery('#TotalSoftGallery_VideoIm_URL_2').val();
	var TotalSoftGallery_Video_Desc=tinyMCE.get('TotalSoftGallery_Video_Desc').getContent();

	var TotalSoftGallery_Video_Link=jQuery('#TotalSoftGallery_Video_Link').val();
	var TotalSoftGallery_Video_ONT=jQuery('#TotalSoftGallery_Video_ONT').attr('checked');
	if(TotalSoftGallery_Video_ONT=='checked')
	{ TotalSoftGallery_Video_ONT='true'; }
	else
	{ TotalSoftGallery_Video_ONT='false'; }

	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.Total_Soft_Select').val(TotalSoftGallery_Video_Title);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Video').val(TotalSoftGallery_Video_Video_1);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Desc').val(TotalSoftGallery_Video_Desc);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_Link').val(TotalSoftGallery_Video_Link);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(2)').find('.TotalSoftGallery_Video_ONT').val(TotalSoftGallery_Video_ONT);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(3)').find('.Total_Soft_Select').val(TotalSoftGallery_Video_URL_2);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.Total_Soft_Select').val(TotalSoftGallery_VideoIm_URL_2);
	jQuery('#TotalSoftGallery_VideoLi_'+TotalSoftGV_Video_Li_ID).find('.Total_Soft_AMVideoTable1 td:nth-child(4)').find('.TotalSoftGallery_VideoImage').attr('src',TotalSoftGallery_VideoIm_URL_2);

	jQuery('#Total_Soft_Gallery_Video_Upd').hide(500);
	jQuery('#Total_Soft_Gallery_Video_Sav').show(500);

	Total_Soft_Gallery_Video_Res_Vid();
}
function TotalSoftGallery_Video_Del(Gallery_Video_ID)
{
	jQuery('#Total_Soft_Gallery_VideoAMOTable_tr_'+Gallery_Video_ID).find('.Total_Soft_GVideo_Del_Span').addClass('Total_Soft_GVideo_Del_Span1');
}
function TotalSoftGallery_Video_Del_No(Gallery_Video_ID)
{
	jQuery('#Total_Soft_Gallery_VideoAMOTable_tr_'+Gallery_Video_ID).find('.Total_Soft_GVideo_Del_Span').removeClass('Total_Soft_GVideo_Del_Span1');
}
function TotalSoftGallery_Video_Del_Yes(Gallery_Video_ID)
{
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_Del', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_ID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		location.reload();
	})
}
function TotalSoftGallery_Video_Clone(Gallery_Video_ID)
{
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_Clone', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_ID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		location.reload();
	})
}
function TotalSoftGallery_Video_Edit(Gallery_Video_ID)
{
	jQuery('.Total_Soft_Gallery_Video_AMD2').hide(500);
	jQuery('.Total_Soft_Gallery_VideoAMMTable').hide(500);
	jQuery('.Total_Soft_Gallery_VideoAMOTable').hide(500);
	jQuery('.Total_Soft_Gallery_Video_Save').hide(500);
	jQuery('.Total_Soft_Gallery_Video_Update').show(500);
	jQuery('.Total_Soft_Gallery_Video_ID').html('[Total_Soft_Gallery_Video id="'+Gallery_Video_ID+'"]');
	jQuery('.Total_Soft_Gallery_Video_TID').html('&lt;?php echo do_shortcode(&#039;[Total_Soft_Gallery_Video id="'+Gallery_Video_ID+'"]&#039;);?&gt');
	
	jQuery('#Total_SoftGallery_Video_Update').val(Gallery_Video_ID);
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_Edit', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_ID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=3;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();

		jQuery('#TotalSoftGallery_Video_Gallery_Title').val(b[0]); 
		jQuery('#TotalSoftGallery_Video_Option').val(b[1]); 
		jQuery('#TotalSoftGallery_Video_ShowType').val(b[2]); 
		jQuery('#TotalSoftGallery_Video_PerPage').val(b[3]);
		jQuery('#TotalSoftGallery_LoadMore').val(b[4]);

		TotalSoftGallery_Video_Show();
		Total_Soft_GVideo_Editor();
	})

	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_Edit_Videos', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_ID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var TotalSoftGallery_Video_VT=Array();
		var TotalSoftGallery_Video_VDesc=Array();
		var TotalSoftGallery_Video_VLink=Array();
		var TotalSoftGallery_Video_VONT=Array();
		var TotalSoftGallery_Video_VURL=Array();
		var TotalSoftGallery_Video_IURL=Array();
		var TotalSoftGallery_Video_Video_1=Array();

		var a=response.split('stdClass Object');
		for(i=1;i<a.length;i++)
		{
			var c=a[i].split('=>');
			TotalSoftGallery_Video_VT[TotalSoftGallery_Video_VT.length]=c[2].split('[')[0].trim();
			TotalSoftGallery_Video_VDesc[TotalSoftGallery_Video_VDesc.length]=c[3].split('[')[0].trim();
			TotalSoftGallery_Video_VLink[TotalSoftGallery_Video_VLink.length]=c[4].split('[')[0].trim();
			TotalSoftGallery_Video_VONT[TotalSoftGallery_Video_VONT.length]=c[5].split('[')[0].trim();
			TotalSoftGallery_Video_VURL[TotalSoftGallery_Video_VURL.length]=c[6].split('[')[0].trim();
			TotalSoftGallery_Video_IURL[TotalSoftGallery_Video_IURL.length]=c[7].split('[')[0].trim();
			TotalSoftGallery_Video_Video_1[TotalSoftGallery_Video_Video_1.length]=c[8].split('[')[0].trim();
		}
		for(i=1;i<=TotalSoftGallery_Video_VT.length;i++)
		{	
			if(i==1)
			{
				jQuery('#TotalSoftGallery_VideoUl').html('<li id="TotalSoftGallery_VideoLi_1"><table class="Total_Soft_AMVideoTable1 Total_Soft_AMVideoTable2"><tr><td>1</td><td><input type="text" readonly value="'+TotalSoftGallery_Video_VT[0]+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VT_1" name="TotalSoftGallery_Video_VT_1"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_VDesc_1" name="TotalSoftGallery_Video_VDesc_1" value=\''+TotalSoftGallery_Video_VDesc[0]+'\'><input type="text" style="display:none;" class="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_VLink_1" name="TotalSoftGallery_Video_VLink_1" value="'+TotalSoftGallery_Video_VLink[0]+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Video" id="TotalSoftGallery_Video_RVideo_1" name="TotalSoftGallery_Video_RVideo_1" value="'+TotalSoftGallery_Video_Video_1[0]+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_ONT" id="TotalSoftGallery_Video_VONT_1" name="TotalSoftGallery_Video_VONT_1" value="'+TotalSoftGallery_Video_VONT[0]+'"></td><td><input type="text" readonly value="'+TotalSoftGallery_Video_VURL[0]+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VURL_1" name="TotalSoftGallery_Video_VURL_1"></td><td><img class="TotalSoftGallery_VideoImage" src="'+TotalSoftGallery_Video_IURL[0]+'"><input type="text" readonly value="'+TotalSoftGallery_Video_IURL[0]+'" class="Total_Soft_Select Total_Soft_Select1" style="display:none;" id="TotalSoftGallery_Video_IURL_1" name="TotalSoftGallery_Video_IURL_1"></td><td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGV_Video_Edit(1)"></i></td><td><i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGV_Video_Del(1)"></i><span class="Total_Soft_GVideo_Del_Span"><i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="Total_Soft_GVideo_Del_Vd_Yes(1)"></i><i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="Total_Soft_GVideo_Del_Vd_No(1)"></i></span></td></tr></table></li>');
			}
			else
			{
				if(i%2==0)
				{
					jQuery('<li id="TotalSoftGallery_VideoLi_'+i+'"><table class="Total_Soft_AMVideoTable1 Total_Soft_AMVideoTable3"><tr><td>'+i+'</td><td><input type="text" readonly value="'+TotalSoftGallery_Video_VT[i-1]+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VT_'+i+'" name="TotalSoftGallery_Video_VT_'+i+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_VDesc_'+i+'" name="TotalSoftGallery_Video_VDesc_'+i+'" value=\''+TotalSoftGallery_Video_VDesc[i-1]+'\'><input type="text" style="display:none;" class="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_VLink_'+i+'" name="TotalSoftGallery_Video_VLink_'+i+'" value="'+TotalSoftGallery_Video_VLink[i-1]+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Video" id="TotalSoftGallery_Video_RVideo_'+i+'" name="TotalSoftGallery_Video_RVideo_'+i+'" value="'+TotalSoftGallery_Video_Video_1[i-1]+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_ONT" id="TotalSoftGallery_Video_VONT_'+i+'" name="TotalSoftGallery_Video_VONT_'+i+'" value="'+TotalSoftGallery_Video_VONT[i-1]+'"></td><td><input type="text" readonly value="'+TotalSoftGallery_Video_VURL[i-1]+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VURL_'+i+'" name="TotalSoftGallery_Video_VURL_'+i+'"></td><td><img class="TotalSoftGallery_VideoImage" src="'+TotalSoftGallery_Video_IURL[i-1]+'"><input type="text" readonly value="'+TotalSoftGallery_Video_IURL[i-1]+'" class="Total_Soft_Select Total_Soft_Select1" style="display:none;" id="TotalSoftGallery_Video_IURL_'+i+'" name="TotalSoftGallery_Video_IURL_'+i+'"></td><td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGV_Video_Edit('+i+')"></i></td><td><i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGV_Video_Del('+i+')"></i><span class="Total_Soft_GVideo_Del_Span"><i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="Total_Soft_GVideo_Del_Vd_Yes('+i+')"></i><i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="Total_Soft_GVideo_Del_Vd_No('+i+')"></i></span></td></tr></table></li>').insertAfter('#TotalSoftGallery_VideoUl li:nth-child('+parseInt(parseInt(i)-1)+')');
				}
				else
				{
					jQuery('<li id="TotalSoftGallery_VideoLi_'+i+'"><table class="Total_Soft_AMVideoTable1 Total_Soft_AMVideoTable2"><tr><td>'+i+'</td><td><input type="text" readonly value="'+TotalSoftGallery_Video_VT[i-1]+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VT_'+i+'" name="TotalSoftGallery_Video_VT_'+i+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_VDesc_'+i+'" name="TotalSoftGallery_Video_VDesc_'+i+'" value=\''+TotalSoftGallery_Video_VDesc[i-1]+'\'><input type="text" style="display:none;" class="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_VLink_'+i+'" name="TotalSoftGallery_Video_VLink_'+i+'" value="'+TotalSoftGallery_Video_VLink[i-1]+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_Video" id="TotalSoftGallery_Video_RVideo_'+i+'" name="TotalSoftGallery_Video_RVideo_'+i+'" value="'+TotalSoftGallery_Video_Video_1[i-1]+'"><input type="text" style="display:none;" class="TotalSoftGallery_Video_ONT" id="TotalSoftGallery_Video_VONT_'+i+'" name="TotalSoftGallery_Video_VONT_'+i+'" value="'+TotalSoftGallery_Video_VONT[i-1]+'"></td><td><input type="text" readonly value="'+TotalSoftGallery_Video_VURL[i-1]+'" class="Total_Soft_Select Total_Soft_Select1" id="TotalSoftGallery_Video_VURL_'+i+'" name="TotalSoftGallery_Video_VURL_'+i+'"></td><td><img class="TotalSoftGallery_VideoImage" src="'+TotalSoftGallery_Video_IURL[i-1]+'"><input type="text" readonly value="'+TotalSoftGallery_Video_IURL[i-1]+'" class="Total_Soft_Select Total_Soft_Select1" style="display:none;" id="TotalSoftGallery_Video_IURL_'+i+'" name="TotalSoftGallery_Video_IURL_'+i+'"></td><td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGV_Video_Edit('+i+')"></i></td><td><i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGV_Video_Del('+i+')"></i><span class="Total_Soft_GVideo_Del_Span"><i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="Total_Soft_GVideo_Del_Vd_Yes('+i+')"></i><i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="Total_Soft_GVideo_Del_Vd_No('+i+')"></i></span></td></tr></table></li>').insertAfter('#TotalSoftGallery_VideoUl li:nth-child('+parseInt(parseInt(i)-1)+')');
				}
			}
		}
		jQuery('#TotalSoftGVHidNum').val(TotalSoftGallery_Video_VT.length);
	})
	setTimeout(function(){
		jQuery('.Total_Soft_Gallery_Video_AMD3').show(500);
		jQuery('.Total_Soft_AMTable').show(500);
		jQuery('.Total_Soft_AMVideoTable').show(500);
		jQuery('.Total_Soft_AMVideoTable1').show(500);
		jQuery('.Total_Soft_GV_AMShortTable').show(500);
	},500)
}
function Total_Soft_GVideo_Editor()
{
	tinymce.init({
		selector: '#TotalSoftGallery_Video_Desc',
		menubar: false,
		statusbar: false,
		height: 250,
		plugins: [
		    'advlist autolink lists link image charmap print preview hr',
		    'searchreplace wordcount code media ',
		    'insertdatetime save table contextmenu directionality',
		    'paste textcolor colorpicker textpattern imagetools codesample'
		],
		toolbar1: "newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect",
		toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink code | insertdatetime preview | forecolor backcolor",
		toolbar3: "table | hr | subscript superscript | charmap | print | codesample ",
		fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 42px 44px 46px 48px',
		font_formats: 'Abadi MT Condensed Light = abadi mt condensed light; Aharoni = aharoni; Aldhabi = aldhabi; Andalus = andalus; Angsana New = angsana new; AngsanaUPC = angsanaupc; Aparajita = aparajita; Arabic Typesetting = arabic typesetting; Arial = arial; Arial Black = arial black; Batang = batang; BatangChe = batangche; Browallia New = browallia new; BrowalliaUPC = browalliaupc; Calibri = calibri; Calibri Light = calibri light; Calisto MT = calisto mt; Cambria = cambria; Candara = candara; Century Gothic = century gothic; Comic Sans MS = comic sans ms; Consolas = consolas; Constantia = constantia; Copperplate Gothic = copperplate gothic; Copperplate Gothic Light = copperplate gothic light; Corbel = corbel; Cordia New = cordia new; CordiaUPC = cordiaupc; Courier New = courier new; DaunPenh = daunpenh; David = david; DFKai-SB = dfkai-sb; DilleniaUPC = dilleniaupc; DokChampa = dokchampa; Dotum = dotum; DotumChe = dotumche; Ebrima = ebrima; Estrangelo Edessa = estrangelo edessa; EucrosiaUPC = eucrosiaupc; Euphemia = euphemia; FangSong = fangsong; Franklin Gothic Medium = franklin gothic medium; FrankRuehl = frankruehl; FreesiaUPC = freesiaupc; Gabriola = gabriola; Gadugi = gadugi; Gautami = gautami; Georgia = georgia; Gisha = gisha; Gulim  = gulim; GulimChe = gulimche; Gungsuh = gungsuh; GungsuhChe = gungsuhche; Impact = impact; IrisUPC = irisupc; Iskoola Pota = iskoola pota; JasmineUPC = jasmineupc; KaiTi = kaiti; Kalinga = kalinga; Kartika = kartika; Khmer UI = khmer ui; KodchiangUPC = kodchiangupc; Kokila = kokila; Lao UI = lao ui; Latha = latha; Leelawadee = leelawadee; Levenim MT = levenim mt; LilyUPC = lilyupc; Lucida Console = lucida console; Lucida Handwriting Italic = lucida handwriting italic; Lucida Sans Unicode = lucida sans unicode; Malgun Gothic = malgun gothic; Mangal = mangal; Manny ITC = manny itc; Marlett = marlett; Meiryo = meiryo; Meiryo UI = meiryo ui; Microsoft Himalaya = microsoft himalaya; Microsoft JhengHei = microsoft jhenghei; Microsoft JhengHei UI = microsoft jhenghei ui; Microsoft New Tai Lue = microsoft new tai lue; Microsoft PhagsPa = microsoft phagspa; Microsoft Sans Serif = microsoft sans serif; Microsoft Tai Le = microsoft tai le; Microsoft Uighur = microsoft uighur; Microsoft YaHei = microsoft yahei; Microsoft YaHei UI = microsoft yahei ui; Microsoft Yi Baiti = microsoft yi baiti; MingLiU_HKSCS = mingliu_hkscs; MingLiU_HKSCS-ExtB = mingliu_hkscs-extb; Miriam = miriam; Mongolian Baiti = mongolian baiti; MoolBoran = moolboran; MS UI Gothic = ms ui gothic; MV Boli = mv boli; Myanmar Text = myanmar text; Narkisim = narkisim; Nirmala UI = nirmala ui; News Gothic MT = news gothic mt; NSimSun = nsimsun; Nyala = nyala; Palatino Linotype = palatino linotype; Plantagenet Cherokee = plantagenet cherokee; Raavi = raavi; Rod = rod; Sakkal Majalla = sakkal majalla; Segoe Print = segoe print; Segoe Script = segoe script; Segoe UI Symbol = segoe ui symbol; Shonar Bangla = shonar bangla; Shruti = shruti; SimHei = simhei; SimKai = simkai; Simplified Arabic = simplified arabic; SimSun = simsun; SimSun-ExtB = simsun-extb; Sylfaen = sylfaen; Tahoma = tahoma; Times New Roman = times new roman; Traditional Arabic = traditional arabic; Trebuchet MS = trebuchet ms; Tunga = tunga; Utsaah = utsaah; Vani = vani; Vijaya = vijaya'
	});
}
// Theme Menu
function Total_Soft_Gallery_Video_Opt_AMD2_But1()
{
	alert('This is Our Free Version. For more adventures Click to buy Personal version.');
}
function TotalSoft_VG_GVG_HEffect()
{
	var TotalSoft_VG_GVG_HE=jQuery('#TotalSoft_VG_GVG_HE').val();

	if(TotalSoft_VG_GVG_HE=='drop-shadow')
	{
		jQuery('#TotalSoft_VG_GVG_HO').hide(500);
		jQuery('#TotalSoft_VG_GVG_HO_Output').hide(500);
		jQuery('.DropShadow1').hide();
		setTimeout(function(){
			jQuery('.DropShadow').show(500);
		},500)
	}
	else if(TotalSoft_VG_GVG_HE=='opacity')
	{
		jQuery('#TotalSoft_VG_GVG_HO').show(500);
		jQuery('#TotalSoft_VG_GVG_HO_Output').show(500);
		jQuery('.DropShadow').hide(500);
		setTimeout(function(){
			jQuery('.DropShadow1').show();
		},500)
	}
	else
	{
		jQuery('#TotalSoft_VG_GVG_HO').hide(500);
		jQuery('#TotalSoft_VG_GVG_HO_Output').hide(500);
		jQuery('.DropShadow').hide(500);
		setTimeout(function(){
			jQuery('.DropShadow1').show();
		},500)
	}
}
function TotalSoftGalleryV_Clone_Option(Gallery_Video_OptID)
{
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGalleryV_Clone_Option', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_OptID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		location.reload();
	})
}
function TotalSoftGalleryV_Del_Option(Gallery_Video_OptID)
{
	jQuery('#Total_Soft_AMOTable_tr_'+Gallery_Video_OptID).find('.Total_Soft_GVideo_Del_Span').addClass('Total_Soft_GVideo_Del_Span1');
}
function TotalSoftGalleryV_Del_Option_No(Gallery_Video_OptID)
{
	jQuery('#Total_Soft_AMOTable_tr_'+Gallery_Video_OptID).find('.Total_Soft_GVideo_Del_Span').removeClass('Total_Soft_GVideo_Del_Span1');
}
function TotalSoftGalleryV_Edit_Option(Gallery_Video_OptID)
{
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_VideoOpt_Edit', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_OptID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=3;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();		
		
		setTimeout(function(){
			jQuery('#Total_SoftGallery_Video_Update').val(Gallery_Video_OptID);
			jQuery('#TotalSoftGalleryV_SetName').val(b[1]); jQuery('#TotalSoftGalleryV_SetType').val(b[2]);

			if(b[2]=='Grid Video Gallery')
			{
				if(b[3]=='true'){ b[3]=true; }else{ b[3]=false; }
				if(b[4]=='true'){ b[4]=true; }else{ b[4]=false; }

				jQuery('#TotalSoft_GV_GG_01').attr('chceked', b[3]); jQuery('#TotalSoft_GV_GG_02').attr('checked', b[4]); jQuery('#TotalSoft_GV_GG_03').val(b[5]); jQuery('#TotalSoft_GV_GG_04').val(b[6]); jQuery('#TotalSoft_GV_GG_05').val(b[7]); jQuery('#TotalSoft_GV_GG_06').val(b[8]); jQuery('#TotalSoft_GV_GG_07').val(parseInt(parseFloat(b[9])*100)); jQuery('#TotalSoft_GV_GG_08').val(b[10]); jQuery('#TotalSoft_GV_GG_09').val(b[11]); jQuery('#TotalSoft_GV_GG_10').val(b[12]); jQuery('#TotalSoft_GV_GG_11').val(b[13]); jQuery('#TotalSoft_GV_GG_12').val(b[14]); jQuery('#TotalSoft_GV_GG_13').val(b[15]); jQuery('#TotalSoft_GV_GG_14').val(b[16]); jQuery('#TotalSoft_GV_GG_15').val(b[17]); jQuery('#TotalSoft_GV_GG_16').val(b[18]); jQuery('#TotalSoft_GV_GG_17').val(b[19]); jQuery('#TotalSoft_GV_GG_18').val(b[20]); jQuery('#TotalSoft_GV_GG_19').val(b[21]); jQuery('#TotalSoft_GV_GG_20').val(b[22]); jQuery('#TotalSoft_GV_GG_21').val(b[23]); jQuery('#TotalSoft_GV_GG_22').val(b[24]); jQuery('#TotalSoft_GV_GG_23').val(b[25]); jQuery('#TotalSoft_GV_GG_24').val(b[26]); jQuery('#TotalSoft_GV_GG_25').val(b[27]); jQuery('#TotalSoft_GV_GG_26').val(b[28]); jQuery('#TotalSoft_GV_GG_27').val(b[29]); jQuery('#TotalSoft_GV_GG_28').val(b[30]); jQuery('#TotalSoft_GV_GG_29').val(b[31]); jQuery('#TotalSoft_GV_GG_30').val(b[32]); jQuery('#TotalSoft_GV_GG_31').val(b[33]); jQuery('#TotalSoft_GV_GG_32').val(b[34]); jQuery('#TotalSoft_GV_GG_33').val(b[35]); jQuery('#TotalSoft_GV_GG_34').val(b[36]); jQuery('#TotalSoft_GV_GG_35').val(b[37]); jQuery('#TotalSoft_GV_GG_36').val(b[38]); jQuery('#TotalSoft_GV_GG_37').val(b[39]); jQuery('#TotalSoft_GV_GG_38').val(b[40]); jQuery('#TotalSoft_GV_GG_39').val(b[41]);
				TotalSoft_VG_GVG_HEffect();
			} 
			else if(b[2]=='LightBox Video Gallery')
			{
				if(b[16]=='true'){ b[16]=true; }else{ b[16]=false; }

				jQuery('#TotalSoft_GV_LG_01').val(b[3]); jQuery('#TotalSoft_GV_LG_02').val(b[4]); jQuery('#TotalSoft_GV_LG_03').val(b[5]); jQuery('#TotalSoft_GV_LG_04').val(b[6]); jQuery('#TotalSoft_GV_LG_05').val(b[7]); jQuery('#TotalSoft_GV_LG_06').val(b[8]); jQuery('#TotalSoft_GV_LG_07').val(b[9]); jQuery('#TotalSoft_GV_LG_08').val(b[10]); jQuery('#TotalSoft_GV_LG_09').val(b[11]); jQuery('#TotalSoft_GV_LG_10').val(b[12]); jQuery('#TotalSoft_GV_LG_11').val(b[13]); jQuery('#TotalSoft_GV_LG_12').val(b[14]); jQuery('#TotalSoft_GV_LG_13').val(b[15]); jQuery('#TotalSoft_GV_LG_14').attr('checked', b[16]); jQuery('#TotalSoft_GV_LG_15').val(b[17]); jQuery('#TotalSoft_GV_LG_16').val(b[18]); jQuery('#TotalSoft_GV_LG_17').val(b[19]); jQuery('#TotalSoft_GV_LG_18').val(b[20]); jQuery('#TotalSoft_GV_LG_19').val(b[21]); jQuery('#TotalSoft_GV_LG_20').val(b[22]); jQuery('#TotalSoft_GV_LG_21').val(b[23]); jQuery('#TotalSoft_GV_LG_22').val(b[24]); jQuery('#TotalSoft_GV_LG_23').val(b[25]); jQuery('#TotalSoft_GV_LG_24').val(b[26]); jQuery('#TotalSoft_GV_LG_25').val(b[27]); jQuery('#TotalSoft_GV_LG_26').val(b[28]); jQuery('#TotalSoft_GV_LG_27').val(b[29]); jQuery('#TotalSoft_GV_LG_28').val(b[30]); jQuery('#TotalSoft_GV_LG_29').val(b[31]); jQuery('#TotalSoft_GV_LG_30').val(b[32]); jQuery('#TotalSoft_GV_LG_31').val(b[33]); jQuery('#TotalSoft_GV_LG_32').val(b[34]); jQuery('#TotalSoft_GV_LG_33').val(b[35]); jQuery('#TotalSoft_GV_LG_34').val(b[36]); jQuery('#TotalSoft_GV_LG_35').val(b[37]); jQuery('#TotalSoft_GV_LG_36').val(b[38]); jQuery('#TotalSoft_GV_LG_37').val(b[39]); jQuery('#TotalSoft_GV_LG_38').val(b[40]); jQuery('#TotalSoft_GV_LG_39').val(b[41]);
			} 
			else if(b[2]=='Thumbnails Video')
			{
				if(b[22]=='true'){ b[22]=true; }else{ b[22]=false; }
				if(b[26]=='true'){ b[26]=true; }else{ b[26]=false; }

				jQuery('#TotalSoft_GV_TV_01').val(b[3]); jQuery('#TotalSoft_GV_TV_02').val(b[4]); jQuery('#TotalSoft_GV_TV_03').val(b[5]); jQuery('#TotalSoft_GV_TV_04').val(b[6]); jQuery('#TotalSoft_GV_TV_05').val(b[7]); jQuery('#TotalSoft_GV_TV_06').val(b[8]); jQuery('#TotalSoft_GV_TV_07').val(b[9]); jQuery('#TotalSoft_GV_TV_08').val(b[10]); jQuery('#TotalSoft_GV_TV_09').val(b[11]); jQuery('#TotalSoft_GV_TV_10').val(b[12]); jQuery('#TotalSoft_GV_TV_11').val(b[13]); jQuery('#TotalSoft_GV_TV_12').val(b[14]); jQuery('#TotalSoft_GV_TV_19').val(b[21]); jQuery('#TotalSoft_GV_TV_20').attr('checked', b[22]); jQuery('#TotalSoft_GV_TV_21').val(b[23]); jQuery('#TotalSoft_GV_TV_22').val(b[24]); jQuery('#TotalSoft_GV_TV_23').val(b[25]); jQuery('#TotalSoft_GV_TV_24').attr('checked', b[26]); jQuery('#TotalSoft_GV_TV_25').val(b[27]); jQuery('#TotalSoft_GV_TV_26').val(b[28]); jQuery('#TotalSoft_GV_TV_27').val(b[29]); jQuery('#TotalSoft_GV_TV_28').val(b[30]); jQuery('#TotalSoft_GV_TV_29').val(b[31]); jQuery('#TotalSoft_GV_TV_30').val(b[32]); jQuery('#TotalSoft_GV_TV_31').val(b[33]); jQuery('#TotalSoft_GV_TV_32').val(b[34]); jQuery('#TotalSoft_GV_TV_33').val(b[35]); jQuery('#TotalSoft_GV_TV_34').val(b[36]); jQuery('#TotalSoft_GV_TV_35').val(b[37]); jQuery('#TotalSoft_GV_TV_36').val(b[38]); jQuery('#TotalSoft_GV_TV_37').val(b[39]); jQuery('#TotalSoft_GV_TV_38').val(b[40]); jQuery('#TotalSoft_GV_TV_39').val(b[41]); 
			} 
			else if(b[2]=='Content Popup')
			{
				if(b[8]=='true'){ b[8]=true; }else{ b[8]=false; }
				if(b[13]=='true'){ b[13]=true; }else{ b[13]=false; }
				if(b[18]=='true'){ b[18]=true; }else{ b[18]=false; }

				jQuery('#TotalSoft_GV_CP_01').val(b[3]); jQuery('#TotalSoft_GV_CP_02').val(b[4]); jQuery('#TotalSoft_GV_CP_03').val(b[5]); jQuery('#TotalSoft_GV_CP_04').val(b[6]); jQuery('#TotalSoft_GV_CP_05').val(b[7]); jQuery('#TotalSoft_GV_CP_06').attr('checked', b[8]); jQuery('#TotalSoft_GV_CP_07').val(b[9]); jQuery('#TotalSoft_GV_CP_08').val(b[10]); jQuery('#TotalSoft_GV_CP_09').val(b[11]); jQuery('#TotalSoft_GV_CP_10').val(b[12]); jQuery('#TotalSoft_GV_CP_11').attr('checked', b[13]); jQuery('#TotalSoft_GV_CP_12').val(b[14]); jQuery('#TotalSoft_GV_CP_13').val(b[15]); jQuery('#TotalSoft_GV_CP_14').val(b[16]); jQuery('#TotalSoft_GV_CP_15').val(b[17]); jQuery('#TotalSoft_GV_CP_16').attr('checked', b[18]); jQuery('#TotalSoft_GV_CP_17').val(b[19]); jQuery('#TotalSoft_GV_CP_18').val(b[20]); jQuery('#TotalSoft_GV_CP_19').val(b[21]); jQuery('#TotalSoft_GV_CP_20').val(b[22]); jQuery('#TotalSoft_GV_CP_21').val(b[23]); jQuery('#TotalSoft_GV_CP_22').val(b[24]); jQuery('#TotalSoft_GV_CP_23').val(b[25]); jQuery('#TotalSoft_GV_CP_24').val(b[26]); jQuery('#TotalSoft_GV_CP_25').val(b[27]); jQuery('#TotalSoft_GV_CP_26').val(b[28]); jQuery('#TotalSoft_GV_CP_27').val(b[29]); jQuery('#TotalSoft_GV_CP_28').val(b[30]); jQuery('#TotalSoft_GV_CP_29').val(b[31]); jQuery('#TotalSoft_GV_CP_30').val(b[32]); jQuery('#TotalSoft_GV_CP_31').val(b[33]); jQuery('#TotalSoft_GV_CP_32').val(b[34]); jQuery('#TotalSoft_GV_CP_33').val(b[35]); jQuery('#TotalSoft_GV_CP_34').val(b[36]); jQuery('#TotalSoft_GV_CP_35').val(b[37]); jQuery('#TotalSoft_GV_CP_36').val(b[38]); jQuery('#TotalSoft_GV_CP_37').val(b[39]); jQuery('#TotalSoft_GV_CP_38').val(b[40]); jQuery('#TotalSoft_GV_CP_39').val(b[41]);
			} 
			else if(b[2]=='Elastic Gallery')
			{
				if(b[18]=='true'){ b[18]=true; }else{ b[18]=false; }
				if(b[39]=='true'){ b[39]=true; }else{ b[39]=false; }
				if(b[40]=='true'){ b[40]=true; }else{ b[40]=false; }

				jQuery('#TotalSoft_GV_EG_01').val(b[3]); jQuery('#TotalSoft_GV_EG_02').val(b[4]); jQuery('#TotalSoft_GV_EG_03').val(b[5]); jQuery('#TotalSoft_GV_EG_04').val(b[6]); jQuery('#TotalSoft_GV_EG_05').val(b[7]); jQuery('#TotalSoft_GV_EG_06').val(b[8]); jQuery('#TotalSoft_GV_EG_07').val(b[9]); jQuery('#TotalSoft_GV_EG_08').val(b[10]); jQuery('#TotalSoft_GV_EG_09').val(b[11]); jQuery('#TotalSoft_GV_EG_10').val(b[12]); jQuery('#TotalSoft_GV_EG_11').val(b[13]); jQuery('#TotalSoft_GV_EG_12').val(b[14]); jQuery('#TotalSoft_GV_EG_13').val(b[15]); jQuery('#TotalSoft_GV_EG_14').val(b[16]); jQuery('#TotalSoft_GV_EG_15').val(b[17]); jQuery('#TotalSoft_GV_EG_16').attr('checked', b[18]); jQuery('#TotalSoft_GV_EG_17').val(b[19]); jQuery('#TotalSoft_GV_EG_18').val(b[20]); jQuery('#TotalSoft_GV_EG_19').val(b[21]); jQuery('#TotalSoft_GV_EG_20').val(b[22]); jQuery('#TotalSoft_GV_EG_21').val(b[23]); jQuery('#TotalSoft_GV_EG_22').val(b[24]); jQuery('#TotalSoft_GV_EG_23').val(b[25]); jQuery('#TotalSoft_GV_EG_24').val(b[26]); jQuery('#TotalSoft_GV_EG_25').val(b[27]); jQuery('#TotalSoft_GV_EG_26').val(b[28]); jQuery('#TotalSoft_GV_EG_27').val(b[29]); jQuery('#TotalSoft_GV_EG_28').val(b[30]); jQuery('#TotalSoft_GV_EG_29').val(b[31]); jQuery('#TotalSoft_GV_EG_30').val(b[32]); jQuery('#TotalSoft_GV_EG_31').val(b[33]); jQuery('#TotalSoft_GV_EG_32').val(b[34]); jQuery('#TotalSoft_GV_EG_33').val(b[35]); jQuery('#TotalSoft_GV_EG_34').val(b[36]); jQuery('#TotalSoft_GV_EG_35').val(b[37]); jQuery('#TotalSoft_GV_EG_36').val(b[38]); jQuery('#TotalSoft_GV_EG_37').attr('checked', b[39]); jQuery('#TotalSoft_GV_EG_38').attr('checked', b[40]); jQuery('#TotalSoft_GV_EG_39').val(b[41]);
			} 
			else if(b[2]=='Fancy Gallery')
			{
				jQuery('#TotalSoft_GV_FG_01').val(b[3]); jQuery('#TotalSoft_GV_FG_02').val(b[4]); jQuery('#TotalSoft_GV_FG_03').val(b[5]); jQuery('#TotalSoft_GV_FG_04').val(b[6]); jQuery('#TotalSoft_GV_FG_05').val(b[7]); jQuery('#TotalSoft_GV_FG_06').val(b[8]); jQuery('#TotalSoft_GV_FG_07').val(b[9]); jQuery('#TotalSoft_GV_FG_08').val(b[10]); jQuery('#TotalSoft_GV_FG_09').val(b[11]); jQuery('#TotalSoft_GV_FG_10').val(b[12]); jQuery('#TotalSoft_GV_FG_11').val(b[13]); jQuery('#TotalSoft_GV_FG_12').val(b[14]); jQuery('#TotalSoft_GV_FG_13').val(b[15]); jQuery('#TotalSoft_GV_FG_14').val(b[16]); jQuery('#TotalSoft_GV_FG_15').val(b[17]); jQuery('#TotalSoft_GV_FG_16').val(b[18]); jQuery('#TotalSoft_GV_FG_17').val(b[19]); jQuery('#TotalSoft_GV_FG_18').val(b[20]); jQuery('#TotalSoft_GV_FG_19').val(b[21]); jQuery('#TotalSoft_GV_FG_20').val(b[22]); jQuery('#TotalSoft_GV_FG_21').val(b[23]); jQuery('#TotalSoft_GV_FG_22').val(b[24]); jQuery('#TotalSoft_GV_FG_23').val(b[25]); jQuery('#TotalSoft_GV_FG_24').val(b[26]); jQuery('#TotalSoft_GV_FG_25').val(b[27]); jQuery('#TotalSoft_GV_FG_26').val(b[28]); jQuery('#TotalSoft_GV_FG_27').val(b[29]); jQuery('#TotalSoft_GV_FG_28').val(b[30]); jQuery('#TotalSoft_GV_FG_29').val(b[31]); jQuery('#TotalSoft_GV_FG_30').val(b[32]); jQuery('#TotalSoft_GV_FG_31').val(b[33]); jQuery('#TotalSoft_GV_FG_32').val(b[34]); jQuery('#TotalSoft_GV_FG_33').val(b[35]); jQuery('#TotalSoft_GV_FG_34').val(b[36]); jQuery('#TotalSoft_GV_FG_35').val(b[37]); jQuery('#TotalSoft_GV_FG_36').val(b[38]); jQuery('#TotalSoft_GV_FG_37').val(b[39]); jQuery('#TotalSoft_GV_FG_38').val(b[40]); jQuery('#TotalSoft_GV_FG_39').val(b[41]);
			} 
			else if(b[2]=='Parallax Engine')
			{
				if(b[17]=='true'){ b[17]=true; }else{ b[17]=false; }
				if(b[22]=='true'){ b[22]=true; }else{ b[22]=false; }
				if(b[29]=='true'){ b[29]=true; }else{ b[29]=false; }

				jQuery('#TotalSoft_GV_PE_01').val(b[3]); jQuery('#TotalSoft_GV_PE_02').val(b[4]); jQuery('#TotalSoft_GV_PE_03').val(b[5]); jQuery('#TotalSoft_GV_PE_04').val(b[6]); jQuery('#TotalSoft_GV_PE_05').val(b[7]); jQuery('#TotalSoft_GV_PE_06').val(b[8]); jQuery('#TotalSoft_GV_PE_07').val(b[9]); jQuery('#TotalSoft_GV_PE_08').val(b[10]); jQuery('#TotalSoft_GV_PE_09').val(b[11]); jQuery('#TotalSoft_GV_PE_10').val(b[12]); jQuery('#TotalSoft_GV_PE_11').val(b[13]); jQuery('#TotalSoft_GV_PE_12').val(b[14]); jQuery('#TotalSoft_GV_PE_13').val(b[15]); jQuery('#TotalSoft_GV_PE_14').val(b[16]); jQuery('#TotalSoft_GV_PE_15').attr('checked', b[17]); jQuery('#TotalSoft_GV_PE_16').val(b[18]); jQuery('#TotalSoft_GV_PE_17').val(b[19]); jQuery('#TotalSoft_GV_PE_18').val(b[20]); jQuery('#TotalSoft_GV_PE_19').val(b[21]); jQuery('#TotalSoft_GV_PE_20').attr('checked', b[22]); jQuery('#TotalSoft_GV_PE_21').val(b[23]); jQuery('#TotalSoft_GV_PE_22').val(b[24]); jQuery('#TotalSoft_GV_PE_23').val(b[25]); jQuery('#TotalSoft_GV_PE_24').val(b[26]); jQuery('#TotalSoft_GV_PE_25').val(b[27]); jQuery('#TotalSoft_GV_PE_26').val(b[28]); jQuery('#TotalSoft_GV_PE_27').attr('checked', b[29]); jQuery('#TotalSoft_GV_PE_28').val(b[30]); jQuery('#TotalSoft_GV_PE_29').val(b[31]); jQuery('#TotalSoft_GV_PE_30').val(b[32]); jQuery('#TotalSoft_GV_PE_31').val(b[33]); jQuery('#TotalSoft_GV_PE_32').val(b[34]); jQuery('#TotalSoft_GV_PE_33').val(b[35]); jQuery('#TotalSoft_GV_PE_34').val(b[36]); jQuery('#TotalSoft_GV_PE_35').val(b[37]); jQuery('#TotalSoft_GV_PE_36').val(b[38]); jQuery('#TotalSoft_GV_PE_37').val(b[39]); jQuery('#TotalSoft_GV_PE_38').val(b[40]); jQuery('#TotalSoft_GV_PE_39').val(b[41]);
			}
			else if(b[2]=='Classic Gallery')
			{
				if(b[21]=='true'){ b[21]=true; }else{ b[21]=false; }
				if(b[26]=='true'){ b[26]=true; }else{ b[26]=false; }

				jQuery('#TotalSoft_GV_CG_01').val(b[3]); jQuery('#TotalSoft_GV_CG_02').val(b[4]); jQuery('#TotalSoft_GV_CG_03').val(b[5]); jQuery('#TotalSoft_GV_CG_04').val(b[6]); jQuery('#TotalSoft_GV_CG_05').val(b[7]); jQuery('#TotalSoft_GV_CG_06').val(b[8]); jQuery('#TotalSoft_GV_CG_07').val(b[9]); jQuery('#TotalSoft_GV_CG_08').val(b[10]); jQuery('#TotalSoft_GV_CG_09').val(b[11]); jQuery('#TotalSoft_GV_CG_10').val(b[12]); jQuery('#TotalSoft_GV_CG_11').val(b[13]); jQuery('#TotalSoft_GV_CG_12').val(b[14]); jQuery('#TotalSoft_GV_CG_13').val(b[15]); jQuery('#TotalSoft_GV_CG_14').val(b[16]); jQuery('#TotalSoft_GV_CG_15').val(b[17]); jQuery('#TotalSoft_GV_CG_16').val(b[18]); jQuery('#TotalSoft_GV_CG_17').val(b[19]); jQuery('#TotalSoft_GV_CG_18').val(b[20]); jQuery('#TotalSoft_GV_CG_19').attr('checked', b[21]); jQuery('#TotalSoft_GV_CG_20').val(b[22]); jQuery('#TotalSoft_GV_CG_21').val(b[23]); jQuery('#TotalSoft_GV_CG_22').val(b[24]); jQuery('#TotalSoft_GV_CG_23').val(b[25]); jQuery('#TotalSoft_GV_CG_24').attr('checked', b[26]); jQuery('#TotalSoft_GV_CG_25').val(b[27]); jQuery('#TotalSoft_GV_CG_26').val(b[28]); jQuery('#TotalSoft_GV_CG_27').val(b[29]); jQuery('#TotalSoft_GV_CG_28').val(b[30]); jQuery('#TotalSoft_GV_CG_29').val(b[31]); jQuery('#TotalSoft_GV_CG_30').val(b[32]); jQuery('#TotalSoft_GV_CG_31').val(b[33]); jQuery('#TotalSoft_GV_CG_32').val(b[34]); jQuery('#TotalSoft_GV_CG_33').val(b[35]); jQuery('#TotalSoft_GV_CG_34').val(b[36]); jQuery('#TotalSoft_GV_CG_35').val(b[37]); jQuery('#TotalSoft_GV_CG_36').val(b[38]); jQuery('#TotalSoft_GV_CG_37').val(b[39]); jQuery('#TotalSoft_GV_CG_38').val(b[40]); jQuery('#TotalSoft_GV_CG_39').val(b[41]);
			}
			TotalSoft_VGallery_Out();			
			jQuery('.Total_Soft_VGallery_Color').alphaColorPicker();
			jQuery('.wp-picker-holder').addClass('alpha-picker-holder');
		},500)
	})

	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_VideoOpt_Edit1', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: Gallery_Video_OptID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=3;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();
		jQuery('.Total_Soft_Gallery_Video_AMD2').hide(500);
		jQuery('.Total_Soft_AMMTable').hide(500);
		jQuery('.Total_Soft_AMOTable').hide(500);
		jQuery('.Total_Soft_Gallery_Video_Update_Option').show(500);
		jQuery('#TotalSoftGalleryV_SetType').hide(500);		
		setTimeout(function(){
			if(b[2]=='Grid Video Gallery')
			{
				if(b[24]=='true'){ b[24]=true; }else{ b[24]=false; }
				if(b[25]=='true'){ b[25]=true; }else{ b[25]=false; }
				jQuery('#TotalSoft_GV_GG_40').val(b[3]); jQuery('#TotalSoft_GV_GG_41').val(b[4]); jQuery('#TotalSoft_GV_GG_42').val(b[5]); jQuery('#TotalSoft_GV_GG_43').val(b[6]); jQuery('#TotalSoft_GV_GG_44').val(b[7]); jQuery('#TotalSoft_GV_GG_45').val(b[8]); jQuery('#TotalSoft_GV_GG_46').val(b[9]); jQuery('#TotalSoft_GV_GG_47').val(b[10]); jQuery('#TotalSoft_GV_GG_48').val(b[11]); jQuery('#TotalSoft_GV_GG_49').val(b[12]); jQuery('#TotalSoft_GV_GG_50').val(b[13]); jQuery('#TotalSoft_GV_GG_51').val(b[14]); jQuery('#TotalSoft_GV_GG_52').val(b[15]); jQuery('#TotalSoft_GV_GG_53').val(b[16]); jQuery('#TotalSoft_GV_GG_54').val(b[17]); jQuery('#TotalSoft_GV_GG_55').val(b[18]); jQuery('#TotalSoft_GV_GG_56').val(b[19]); jQuery('#TotalSoft_GV_GG_57').val(b[20]); jQuery('#TotalSoft_GV_GG_58').val(b[21]); jQuery('#TotalSoft_GV_GG_59').val(b[22]); jQuery('#TotalSoft_GV_GG_60').val(b[23]); jQuery('#TotalSoft_GV_GG_61').attr('checked', b[24]); jQuery('#TotalSoft_GV_GG_62').attr('checked', b[25]); jQuery('#TotalSoft_GV_GG_63').val(b[26]); jQuery('#TotalSoft_GV_GG_64').val(b[27]);

				jQuery('#Total_Soft_AMSetTable_1').show(500);
			} 
			else if(b[2]=='LightBox Video Gallery')
			{
				jQuery('#TotalSoft_GV_LG_40').val(b[3]); jQuery('#TotalSoft_GV_LG_41').val(b[4]); jQuery('#TotalSoft_GV_LG_42').val(b[5]); jQuery('#TotalSoft_GV_LG_43').val(b[6]); jQuery('#TotalSoft_GV_LG_44').val(b[7]); jQuery('#TotalSoft_GV_LG_45').val(b[8]); jQuery('#TotalSoft_GV_LG_46').val(b[9]); jQuery('#TotalSoft_GV_LG_47').val(b[10]); jQuery('#TotalSoft_GV_LG_48').val(b[11]); jQuery('#TotalSoft_GV_LG_49').val(b[12]); jQuery('#TotalSoft_GV_LG_50').val(b[13]); jQuery('#TotalSoft_GV_LG_51').val(b[14]); jQuery('#TotalSoft_GV_LG_52').val(b[15]); jQuery('#TotalSoft_GV_LG_53').val(b[16]); jQuery('#TotalSoft_GV_LG_54').val(b[17]); jQuery('#TotalSoft_GV_LG_55').val(b[18]); jQuery('#TotalSoft_GV_LG_56').val(b[19]); jQuery('#TotalSoft_GV_LG_57').val(b[20]); jQuery('#TotalSoft_GV_LG_58').val(b[21]); jQuery('#TotalSoft_GV_LG_59').val(b[22]); jQuery('#TotalSoft_GV_LG_60').val(b[23]); jQuery('#TotalSoft_GV_LG_61').val(b[24]); jQuery('#TotalSoft_GV_LG_62').val(b[25]); jQuery('#TotalSoft_GV_LG_63').val(b[26]); jQuery('#TotalSoft_GV_LG_64').val(b[27]); jQuery('#TotalSoft_GV_LG_65').val(b[28]); jQuery('#TotalSoft_GV_LG_66').val(b[29]); jQuery('#TotalSoft_GV_LG_67').val(b[30]); jQuery('#TotalSoft_GV_LG_68').val(b[31]); jQuery('#TotalSoft_GV_LG_69').val(b[32]); jQuery('#TotalSoft_GV_LG_70').val(b[33]); jQuery('#TotalSoft_GV_LG_71').val(b[34]); jQuery('#TotalSoft_GV_LG_72').val(b[35]); jQuery('#TotalSoft_GV_LG_73').val(b[36]);
				
				jQuery('#Total_Soft_AMSetTable_2').show(500);
			} 
			else if(b[2]=='Thumbnails Video')
			{
				jQuery('#TotalSoft_GV_TV_40').val(b[3]); jQuery('#TotalSoft_GV_TV_41').val(b[4]); jQuery('#TotalSoft_GV_TV_42').val(b[5]); jQuery('#TotalSoft_GV_TV_43').val(b[6]); jQuery('#TotalSoft_GV_TV_44').val(b[7]); jQuery('#TotalSoft_GV_TV_45').val(b[8]); jQuery('#TotalSoft_GV_TV_46').val(b[9]); jQuery('#TotalSoft_GV_TV_47').val(b[10]); jQuery('#TotalSoft_GV_TV_48').val(b[11]); jQuery('#TotalSoft_GV_TV_49').val(b[12]); jQuery('#TotalSoft_GV_TV_50').val(b[13]); jQuery('#TotalSoft_GV_TV_51').val(b[14]); jQuery('#TotalSoft_GV_TV_52').val(b[15]); jQuery('#TotalSoft_GV_TV_53').val(b[16]); 

				jQuery('#Total_Soft_AMSetTable_3').show(500);
			} 
			else if(b[2]=='Content Popup')
			{
				if(b[34]=='true'){ b[34]=true; }else{ b[34]=false; }
				jQuery('#TotalSoft_GV_CP_40').val(b[3]); jQuery('#TotalSoft_GV_CP_41').val(b[4]); jQuery('#TotalSoft_GV_CP_42').val(b[5]); jQuery('#TotalSoft_GV_CP_43').val(b[6]); jQuery('#TotalSoft_GV_CP_44').val(b[7]); jQuery('#TotalSoft_GV_CP_45').val(b[8]); jQuery('#TotalSoft_GV_CP_46').val(b[9]); jQuery('#TotalSoft_GV_CP_47').val(b[10]); jQuery('#TotalSoft_GV_CP_48').val(b[11]); jQuery('#TotalSoft_GV_CP_49').val(b[12]); jQuery('#TotalSoft_GV_CP_50').val(b[13]); jQuery('#TotalSoft_GV_CP_51').val(b[14]); jQuery('#TotalSoft_GV_CP_52').val(b[15]); jQuery('#TotalSoft_GV_CP_53').val(b[16]); jQuery('#TotalSoft_GV_CP_54').val(b[17]); jQuery('#TotalSoft_GV_CP_55').val(b[18]); jQuery('#TotalSoft_GV_CP_56').val(b[19]); jQuery('#TotalSoft_GV_CP_57').val(b[20]); jQuery('#TotalSoft_GV_CP_58').val(b[21]); jQuery('#TotalSoft_GV_CP_59').val(b[22]); jQuery('#TotalSoft_GV_CP_60').val(b[23]); jQuery('#TotalSoft_GV_CP_61').val(b[24]); jQuery('#TotalSoft_GV_CP_62').val(b[25]); jQuery('#TotalSoft_GV_CP_63').val(b[26]); jQuery('#TotalSoft_GV_CP_64').val(b[27]); jQuery('#TotalSoft_GV_CP_65').val(b[28]); jQuery('#TotalSoft_GV_CP_66').val(b[29]); jQuery('#TotalSoft_GV_CP_67').val(b[30]); jQuery('#TotalSoft_GV_CP_68').val(b[31]); jQuery('#TotalSoft_GV_CP_69').val(b[32]); jQuery('#TotalSoft_GV_CP_70').val(b[33]); jQuery('#TotalSoft_GV_CP_71').attr('checked', b[34]); 
				
				jQuery('#Total_Soft_AMSetTable_4').show(500);
			} 
			else if(b[2]=='Elastic Gallery')
			{
				jQuery('#TotalSoft_GV_EG_40').val(b[3]); jQuery('#TotalSoft_GV_EG_41').val(b[4]); jQuery('#TotalSoft_GV_EG_42').val(b[5]); jQuery('#TotalSoft_GV_EG_43').val(b[6]); jQuery('#TotalSoft_GV_EG_44').val(b[7]); jQuery('#TotalSoft_GV_EG_45').val(b[8]); jQuery('#TotalSoft_GV_EG_46').val(b[9]); jQuery('#TotalSoft_GV_EG_47').val(b[10]); jQuery('#TotalSoft_GV_EG_48').val(b[11]); jQuery('#TotalSoft_GV_EG_49').val(b[12]); jQuery('#TotalSoft_GV_EG_50').val(b[13]); jQuery('#TotalSoft_GV_EG_51').val(b[14]); jQuery('#TotalSoft_GV_EG_52').val(b[15]); jQuery('#TotalSoft_GV_EG_53').val(b[16]); jQuery('#TotalSoft_GV_EG_54').val(b[17]); jQuery('#TotalSoft_GV_EG_55').val(b[18]); 
				
				jQuery('#Total_Soft_AMSetTable_5').show(500);
			} 
			else if(b[2]=='Fancy Gallery')
			{
				if(b[11]=='true'){ b[11]=true; }else{ b[11]=false; }
				if(b[12]=='true'){ b[12]=true; }else{ b[12]=false; }
				if(b[13]=='true'){ b[13]=true; }else{ b[13]=false; }
				if(b[14]=='true'){ b[14]=true; }else{ b[14]=false; }
				jQuery('#TotalSoft_GV_FG_40').val(b[3]); jQuery('#TotalSoft_GV_FG_41').val(b[4]); jQuery('#TotalSoft_GV_FG_42').val(b[5]); jQuery('#TotalSoft_GV_FG_43').val(b[6]); jQuery('#TotalSoft_GV_FG_44').val(b[7]); jQuery('#TotalSoft_GV_FG_45').val(b[8]); jQuery('#TotalSoft_GV_FG_46').val(b[9]); jQuery('#TotalSoft_GV_FG_47').val(b[10]); jQuery('#TotalSoft_GV_FG_48').attr('checked', b[11]); jQuery('#TotalSoft_GV_FG_49').attr('checked', b[12]); jQuery('#TotalSoft_GV_FG_50').attr('checked', b[13]); jQuery('#TotalSoft_GV_FG_51').attr('checked', b[14]); jQuery('#TotalSoft_GV_FG_52').val(b[15]); jQuery('#TotalSoft_GV_FG_53').val(b[16]); jQuery('#TotalSoft_GV_FG_54').val(b[17]); jQuery('#TotalSoft_GV_FG_55').val(b[18]); jQuery('#TotalSoft_GV_FG_56').val(b[19]); jQuery('#TotalSoft_GV_FG_57').val(b[20]); jQuery('#TotalSoft_GV_FG_58').val(b[21]); jQuery('#TotalSoft_GV_FG_59').val(b[22]); jQuery('#TotalSoft_GV_FG_60').val(b[23]); jQuery('#TotalSoft_GV_FG_61').val(b[24]); jQuery('#TotalSoft_GV_FG_62').val(b[25]); jQuery('#TotalSoft_GV_FG_63').val(b[26]); jQuery('#TotalSoft_GV_FG_64').val(b[27]);

				jQuery('#Total_Soft_AMSetTable_6').show(500);
			} 
			else if(b[2]=='Parallax Engine')
			{
				jQuery('#TotalSoft_GV_PE_40').val(b[3]); jQuery('#TotalSoft_GV_PE_41').val(b[4]); jQuery('#TotalSoft_GV_PE_42').val(b[5]); jQuery('#TotalSoft_GV_PE_43').val(b[6]); jQuery('#TotalSoft_GV_PE_44').val(b[7]); jQuery('#TotalSoft_GV_PE_45').val(b[8]); jQuery('#TotalSoft_GV_PE_46').val(b[9]); jQuery('#TotalSoft_GV_PE_47').val(b[10]); jQuery('#TotalSoft_GV_PE_48').val(b[11]); jQuery('#TotalSoft_GV_PE_49').val(b[12]); jQuery('#TotalSoft_GV_PE_50').val(b[13]); jQuery('#TotalSoft_GV_PE_51').val(b[14]); jQuery('#TotalSoft_GV_PE_52').val(b[15]); jQuery('#TotalSoft_GV_PE_53').val(b[16]); jQuery('#TotalSoft_GV_PE_54').val(b[17]); jQuery('#TotalSoft_GV_PE_55').val(b[18]); jQuery('#TotalSoft_GV_PE_56').val(b[19]);

				jQuery('#Total_Soft_AMSetTable_7').show(500);
			}
			else if(b[2]=='Classic Gallery')
			{
				jQuery('#TotalSoft_GV_CG_40').val(b[3]); jQuery('#TotalSoft_GV_CG_41').val(b[4]); jQuery('#TotalSoft_GV_CG_42').val(b[5]); jQuery('#TotalSoft_GV_CG_43').val(b[6]); jQuery('#TotalSoft_GV_CG_44').val(b[7]); jQuery('#TotalSoft_GV_CG_45').val(b[8]); jQuery('#TotalSoft_GV_CG_46').val(b[9]); jQuery('#TotalSoft_GV_CG_47').val(b[10]); jQuery('#TotalSoft_GV_CG_48').val(b[11]); jQuery('#TotalSoft_GV_CG_49').val(b[12]); jQuery('#TotalSoft_GV_CG_50').val(b[13]); jQuery('#TotalSoft_GV_CG_51').val(b[14]); jQuery('#TotalSoft_GV_CG_52').val(b[15]); jQuery('#TotalSoft_GV_CG_53').val(b[16]); jQuery('#TotalSoft_GV_CG_54').val(b[17]); jQuery('#TotalSoft_GV_CG_55').val(b[18]); jQuery('#TotalSoft_GV_CG_56').val(b[19]); jQuery('#TotalSoft_GV_CG_57').val(b[20]);
				
				jQuery('#Total_Soft_AMSetTable_8').show(500);
			}
			TotalSoft_VGallery_Out();
			jQuery('.Total_Soft_Gallery_Video_AMD3').show(500);
			jQuery('.Total_Soft_AMSet_Table').show(500);
			jQuery('.Total_Soft_VGallery_Color1').alphaColorPicker();
			jQuery('.wp-picker-holder').addClass('alpha-picker-holder');
		},500)
	})
}
function TotalSoft_VGallery_Out()
{
	jQuery('.TotalSoft_VG_Range').each(function(){
		if(jQuery(this).hasClass('TotalSoft_VG_Rangeper'))
		{
			jQuery('#'+jQuery(this).attr('id')+'_Output').html(jQuery(this).val()+'%');
		}
		else if(jQuery(this).hasClass('TotalSoft_VG_Rangepx'))
		{			
			jQuery('#'+jQuery(this).attr('id')+'_Output').html(jQuery(this).val()+'px');
		}
		else if(jQuery(this).hasClass('TotalSoft_VG_Rangesec'))
		{
			jQuery('#'+jQuery(this).attr('id')+'_Output').html(jQuery(this).val()+'s');
		}
		else if(jQuery(this).hasClass('TotalSoft_VG_Rangemsec'))
		{			
			jQuery('#'+jQuery(this).attr('id')+'_Output').html(jQuery(this).val()+'ms');
		}
		else
		{
			jQuery('#'+jQuery(this).attr('id')+'_Output').html(jQuery(this).val());
		}
	})
}