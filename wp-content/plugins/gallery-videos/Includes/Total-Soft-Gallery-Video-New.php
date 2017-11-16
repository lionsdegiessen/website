<?php
	if(!current_user_can('manage_options'))
	{
		die('Access Denied');
	}
	global $wpdb;

	require_once('Total-Soft-Gallery-Video-Install.php');

	$table_name1 = $wpdb->prefix . "totalsoft_galleryv_id";
	$table_name2 = $wpdb->prefix . "totalsoft_galleryv_manager";
	$table_name3 = $wpdb->prefix . "totalsoft_galleryv_videos";
	$table_name4 = $wpdb->prefix . "totalsoft_galleryv_dbt";

	wp_enqueue_media();
	wp_enqueue_script( 'custom-header' );
	add_filter( 'upload_size_limit', 'PBP_increase_upload' );
	function PBP_increase_upload(  )
	{
	 	return 20480000; // 20MB
	}

	if($_SERVER["REQUEST_METHOD"]=="POST")
	{
		if(check_admin_referer( 'edit-menu_'.$comment_id, 'TS_VGallery_Nonce' ))
		{
			$TotalSoftGallery_Video_Gallery_Title=sanitize_text_field($_POST['TotalSoftGallery_Video_Gallery_Title']);
			$TotalSoftGallery_Video_Option=sanitize_text_field($_POST['TotalSoftGallery_Video_Option']);
			$TotalSoftGallery_Video_ShowType=sanitize_text_field($_POST['TotalSoftGallery_Video_ShowType']);
			$TotalSoftGallery_Video_PerPage=sanitize_text_field($_POST['TotalSoftGallery_Video_PerPage']);
			$TotalSoftGallery_LoadMore=sanitize_text_field($_POST['TotalSoftGallery_LoadMore']);

			$TotalSoftGallery_Video_VT=array();
			$TotalSoftGallery_Video_VDesc=array();
			$TotalSoftGallery_Video_VLink=array();
			$TotalSoftGallery_Video_VONT=array();
			$TotalSoftGallery_Video_VURL=array();
			$TotalSoftGallery_Video_IURL=array();
			$TotalSoftGallery_Video_Video=array();

			$TotalSoftGVHidNum=sanitize_text_field($_POST['TotalSoftGVHidNum']);

			for($j=1;$j<=$TotalSoftGVHidNum;$j++)
			{
				$TotalSoftGallery_Video_VT[$j]=sanitize_text_field($_POST['TotalSoftGallery_Video_VT_' . $j]);
				$TotalSoftGallery_Video_VDesc[$j]=str_replace("\&","&", sanitize_text_field(esc_html($_POST['TotalSoftGallery_Video_VDesc_' . $j])));
				$TotalSoftGallery_Video_VLink[$j]=sanitize_text_field($_POST['TotalSoftGallery_Video_VLink_' . $j]);
				$TotalSoftGallery_Video_VONT[$j]=sanitize_text_field($_POST['TotalSoftGallery_Video_VONT_' . $j]);
				$TotalSoftGallery_Video_VURL[$j]=sanitize_text_field($_POST['TotalSoftGallery_Video_VURL_' . $j]);
				$TotalSoftGallery_Video_IURL[$j]=sanitize_text_field($_POST['TotalSoftGallery_Video_IURL_' . $j]);
				$TotalSoftGallery_Video_Video[$j]=sanitize_text_field($_POST['TotalSoftGallery_Video_RVideo_' . $j]);
			}

			if(isset($_POST['Total_Soft_Gallery_Video_Save']))
			{
				$wpdb->query($wpdb->prepare("INSERT INTO $table_name2 (id, TotalSoftGallery_Video_Gallery_Title, TotalSoftGallery_Video_Option, TotalSoftGallery_Video_ShowType, TotalSoftGallery_Video_PerPage, TotalSoftGallery_LoadMore) VALUES (%d, %s, %s, %s, %s, %s)", '', $TotalSoftGallery_Video_Gallery_Title, $TotalSoftGallery_Video_Option, $TotalSoftGallery_Video_ShowType, $TotalSoftGallery_Video_PerPage, $TotalSoftGallery_LoadMore));

				$New_GalleryV_ID=$wpdb->get_results($wpdb->prepare("SELECT * FROM $table_name1 WHERE id>%d order by id desc limit 1",0));
				$New_Total_SoftGVID=$New_GalleryV_ID[0]->GalleryV_ID + 1;
				$wpdb->query($wpdb->prepare("INSERT INTO $table_name1 (id, GalleryV_ID) VALUES (%d, %s)", '', $New_Total_SoftGVID));

				for($j=1;$j<=$TotalSoftGVHidNum;$j++)
				{
					$wpdb->query($wpdb->prepare("INSERT INTO $table_name3 (id, TotalSoftGallery_Video_VT, TotalSoftGallery_Video_VDesc, TotalSoftGallery_Video_VLink, TotalSoftGallery_Video_VONT, TotalSoftGallery_Video_VURL, TotalSoftGallery_Video_IURL, TotalSoftGallery_Video_Video, GalleryV_ID) VALUES (%d, %s, %s, %s, %s, %s, %s, %s, %s)", '', $TotalSoftGallery_Video_VT[$j], $TotalSoftGallery_Video_VDesc[$j], $TotalSoftGallery_Video_VLink[$j], $TotalSoftGallery_Video_VONT[$j], $TotalSoftGallery_Video_VURL[$j], $TotalSoftGallery_Video_IURL[$j], $TotalSoftGallery_Video_Video[$j], $New_Total_SoftGVID));
				}
			}
			else if(isset($_POST['Total_Soft_Gallery_Video_Update']))
			{
				$Total_SoftGallery_Video_Update=sanitize_text_field($_POST['Total_SoftGallery_Video_Update']);

				$wpdb->query($wpdb->prepare("UPDATE $table_name2 set TotalSoftGallery_Video_Gallery_Title=%s, TotalSoftGallery_Video_Option=%s, TotalSoftGallery_Video_ShowType=%s, TotalSoftGallery_Video_PerPage=%s, TotalSoftGallery_LoadMore=%s WHERE id=%d", $TotalSoftGallery_Video_Gallery_Title, $TotalSoftGallery_Video_Option, $TotalSoftGallery_Video_ShowType, $TotalSoftGallery_Video_PerPage, $TotalSoftGallery_LoadMore, $Total_SoftGallery_Video_Update));

				$wpdb->query($wpdb->prepare("DELETE FROM $table_name3 WHERE GalleryV_ID=%s", $Total_SoftGallery_Video_Update));

				for($j=1;$j<=$TotalSoftGVHidNum;$j++)
				{
					$wpdb->query($wpdb->prepare("INSERT INTO $table_name3 (id, TotalSoftGallery_Video_VT, TotalSoftGallery_Video_VDesc, TotalSoftGallery_Video_VLink, TotalSoftGallery_Video_VONT, TotalSoftGallery_Video_VURL, TotalSoftGallery_Video_IURL, TotalSoftGallery_Video_Video, GalleryV_ID) VALUES (%d, %s, %s, %s, %s, %s, %s, %s, %s)", '', $TotalSoftGallery_Video_VT[$j], $TotalSoftGallery_Video_VDesc[$j], $TotalSoftGallery_Video_VLink[$j], $TotalSoftGallery_Video_VONT[$j], $TotalSoftGallery_Video_VURL[$j], $TotalSoftGallery_Video_IURL[$j], $TotalSoftGallery_Video_Video[$j], $Total_SoftGallery_Video_Update));
				}
			}
		}
	    else
	    {
	        wp_die('Security check fail'); 
	    }
	}

	$TotalSoftGalleryVOptions=$wpdb->get_results($wpdb->prepare("SELECT * FROM $table_name4 WHERE id>%d", 0));
	$TotalSoftGalleryV=$wpdb->get_results($wpdb->prepare("SELECT * FROM $table_name2 WHERE id>%d", 0));
	$TotalSoftGalleryVShortID=$wpdb->get_results($wpdb->prepare("SELECT * FROM $table_name1 WHERE id>%d order by id desc limit 1",0));
?>
<link rel="stylesheet" type="text/css" href="<?php echo plugins_url('../CSS/totalsoft.css',__FILE__);?>">
<form method="POST" enctype="multipart/form-data">
	<script src='<?php echo plugins_url('../JS/tinymce.js',__FILE__);?>'></script>
	<?php wp_nonce_field( 'edit-menu_'.$comment_id, 'TS_VGallery_Nonce' );?>
	<div class="Total_Soft_Gallery_Video_AMD">
		<a href="http://total-soft.pe.hu/gallery-video/" target="_blank" title="Click to Buy">
			<div class="Full_Version"><i class="totalsoft totalsoft-cart-arrow-down"></i> Get The Full Version</div>
		</a>
		<div class="Full_Version_Span">
			This is the free version of the plugin.
		</div>
		<div class="Support_Span">
			<a href="https://wordpress.org/support/plugin/gallery-videos/" target="_blank" title="Click Here to Ask">
				<i class="totalsoft totalsoft-comments-o"></i><span style="margin-left:5px;">If you have any questions click here to ask it to our support.</span>
			</a>
		</div>
		<div class="Total_Soft_Gallery_Video_AMD1"></div>
		<div class="Total_Soft_Gallery_Video_AMD2">
			<i class="Total_Soft_Help totalsoft totalsoft-question-circle-o" title="Click for Creating New Gallery Video"></i>
			<input type="button" name="" value="New Gallery Video" class="Total_Soft_Gallery_Video_AMD2_But" onclick="Total_Soft_Gallery_Video_AMD2_But1(<?php echo $TotalSoftGalleryVShortID[0]->GalleryV_ID+1;?>)">
		</div>
		<div class="Total_Soft_Gallery_Video_AMD3">
			<i class="Total_Soft_Help totalsoft totalsoft-question-circle-o" title="Click for Canceling"></i>
			<input type="button" value="Cancel" class="Total_Soft_Gallery_Video_AMD2_But" onclick='TotalSoft_Reload()'>
			<i class="Total_Soft_Gallery_Video_Save Total_Soft_Help totalsoft totalsoft-question-circle-o" title="Click for Saving Gallery"></i>
			<input type="submit" name="Total_Soft_Gallery_Video_Save" value="Save" class="Total_Soft_Gallery_Video_Save Total_Soft_Gallery_Video_AMD2_But">
			<i class="Total_Soft_Gallery_Video_Update Total_Soft_Help totalsoft totalsoft-question-circle-o" title="Click for Updating Gallery"></i>
			<input type="submit" name="Total_Soft_Gallery_Video_Update" value="Update" class="Total_Soft_Gallery_Video_Update Total_Soft_Gallery_Video_AMD2_But">
			<input type="text" style="display:none" name="Total_SoftGallery_Video_Update" id="Total_SoftGallery_Video_Update">
		</div>
	</div>
	<table class="Total_Soft_Gallery_VideoAMMTable">
		<tr class="Total_Soft_AMMTableFR">
			<td>No</td>
			<td>Gallery Video Name</td>
			<td>Gallery Video Option</td>
			<td>Videos Count</td>
			<td>Actions</td>
		</tr>
	</table>

	<table class="Total_Soft_Gallery_VideoAMOTable">
	 	<?php for($i=0;$i<count($TotalSoftGalleryV);$i++){
	 		$TotalSoftGallery_Videos=$wpdb->get_results($wpdb->prepare("SELECT * FROM $table_name3 WHERE GalleryV_ID=%s", $TotalSoftGalleryV[$i]->id));
	 		?> 
	 		<tr id="Total_Soft_Gallery_VideoAMOTable_tr_<?php echo $TotalSoftGalleryV[$i]->id;?>">
				<td><?php echo $i+1;?></td>
				<td><?php echo $TotalSoftGalleryV[$i]->TotalSoftGallery_Video_Gallery_Title;?></td>
				<td><?php echo $TotalSoftGalleryV[$i]->TotalSoftGallery_Video_Option;?></td>
				<td><?php echo count($TotalSoftGallery_Videos);?></td>
				<td><i class="Total_Soft_icon totalsoft totalsoft-file-text" onclick="TotalSoftGallery_Video_Clone(<?php echo $TotalSoftGalleryV[$i]->id;?>)"></i></td>
				<td><i class="Total_Soft_icon totalsoft totalsoft-pencil" onclick="TotalSoftGallery_Video_Edit(<?php echo $TotalSoftGalleryV[$i]->id;?>)"></i></td>
				<td>
					<i class="Total_Soft_icon totalsoft totalsoft-trash" onclick="TotalSoftGallery_Video_Del(<?php echo $TotalSoftGalleryV[$i]->id;?>)"></i>
					<span class="Total_Soft_GVideo_Del_Span">
						<i class="Total_Soft_GVideo_Del_Span_Yes totalsoft totalsoft-check" onclick="TotalSoftGallery_Video_Del_Yes(<?php echo $TotalSoftGalleryV[$i]->id;?>)"></i>
						<i class="Total_Soft_GVideo_Del_Span_No totalsoft totalsoft-times" onclick="TotalSoftGallery_Video_Del_No(<?php echo $TotalSoftGalleryV[$i]->id;?>)"></i>
					</span>
				</td>
			</tr>
	 	<?php }?> 
	</table>

	<table class="Total_Soft_GV_AMShortTable">
		<tr style="text-align:center">
			<td>Shortcode</td>
			<td>Templete Include</td>
		</tr>
		<tr>
			<td>Copy & paste the shortcode directly into any WordPress post or page.</td>
			<td>Copy & paste this code into a template file to include the gallery within your theme.</td>
		</tr>
		<tr style="text-align:center">
			<td class="Total_Soft_Gallery_Video_ID"></td>
			<td class="Total_Soft_Gallery_Video_TID"></td>
		</tr>
	</table>
	<table class="Total_Soft_AMTable">
		<tr>
			<td>Gallery Video Title <i class="Total_Soft_Help1 totalsoft totalsoft-question-circle-o" title="Enter the name for creating a gallery."></i></td>
			<td>Gallery Video Option <i class="Total_Soft_Help1 totalsoft totalsoft-question-circle-o" title=" Select your created effect in gallery option."></i></td>
			<td>Gallery Show Type/Videos Per Page <i class="Total_Soft_Help1 totalsoft totalsoft-question-circle-o" title="Here you Can write quantity how many videos you want to see in one page. Associated which version did you select."></i></td>
		</tr>
		<tr>
			<td><input type="text" name="TotalSoftGallery_Video_Gallery_Title" id="TotalSoftGallery_Video_Gallery_Title" class="Total_Soft_Select" required placeholder=" * Required"></td>
			<td>
				<select class="Total_Soft_Select" name="TotalSoftGallery_Video_Option" id="TotalSoftGallery_Video_Option">
					<?php for($i=0;$i<count($TotalSoftGalleryVOptions);$i++){?>
						<option value="<?php echo $TotalSoftGalleryVOptions[$i]->TotalSoftGalleryV_SetName;?>"><?php echo $TotalSoftGalleryVOptions[$i]->TotalSoftGalleryV_SetName;?></option>
					<?php }?>
				</select>
			</td>
			<td>
				<select name="TotalSoftGallery_Video_ShowType" id="TotalSoftGallery_Video_ShowType" onchange="TotalSoftGallery_Video_Show()">
					<option value="All">        Show All   </option>
					<option value="Pagination"> Pagination </option>
					<option value="Load">       Load More  </option>
				</select>
			</td>
		</tr>
		<tr>
			<td colspan="2"></td>
			<td>
				<select name="TotalSoftGallery_Video_PerPage" id="TotalSoftGallery_Video_PerPage">
					<?php for($i=1;$i<=20;$i++){ ?>
						<option value="<?php echo $i;?>"><?php echo $i;?></option>
					<?php } ?>
				</select>
			</td>
		</tr>
		<tr>
			<td colspan="2"></td>
			<td>
				<input type="text" name="TotalSoftGallery_LoadMore" id="TotalSoftGallery_LoadMore" class="Total_Soft_Select" value="Load More ...">
			</td>
		</tr>
		<tr>
			<td colspan="3">Add Video</td>
		</tr>
		<tr>
			<td>Video Title</td>
			<td colspan="2">
				<i class="Total_Soft_Help2 totalsoft totalsoft-question-circle-o" title="This section is mandatory. Each video must given a name."></i>
				<input type="text" name="TotalSoftGallery_Video_Title" id="TotalSoftGallery_Video_Title" class="Total_Soft_Select" placeholder=" * Required">
			</td>
		</tr>
		<tr>
			<td> 
				<div id="wp-content-media-buttons" class="wp-media-buttons" >													
					<a href="#" class="button insert-media add_media" style="border:1px solid #009491; color:#009491; background-color:#f4f4f4" data-editor="TotalSoftGallery_Video_URL_1" title="Add Video" id="TotalSoftGallery_Video_URL" onclick="TotalSoftGallery_Video_URL_Clicked()">
						<span class="wp-media-buttons-icon"></span>Add Video
					</a>
				</div>
				<input type="text" style="display:none;" id="TotalSoftGallery_Video_URL_1">	
				<input type="text" style="display:none;" id="TotalSoftGallery_Video_Video_1">	
			</td>
			<td colspan="2">
				<i class="Total_Soft_Help2 totalsoft totalsoft-question-circle-o" title="Click on 'Add Video' button to add videos from YouTube, Vimeo and Wistia."></i>
				<input type="text" id="TotalSoftGallery_Video_URL_2" class="Total_Soft_Select" readonly>
				<input type="text" id="TotalSoftGallery_VideoIm_URL_2" class="Total_Soft_Select" readonly style="display:none">
			</td>			
		</tr>
		<tr>
			<td></td>
			<td>Video Description <i class="Total_Soft_Help1 totalsoft totalsoft-question-circle-o" title="It is preferable to write a description in gallery. But it is not an essential condition. There are some options which do not appear the descriptions."></i></td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3">
				<textarea class="Total_Soft_Select Total_Soft_Desc" name="TotalSoftGallery_Video_Desc" id="TotalSoftGallery_Video_Desc"></textarea>
			</td>
		</tr>
		<tr>
			<td>External Link <i class="Total_Soft_Help1 totalsoft totalsoft-question-circle-o" title="You must complete this window if you want your videos has links."></i></td>
			<td><input type="text" name="TotalSoftGallery_Video_Link" id="TotalSoftGallery_Video_Link" class="Total_Soft_Select"></td>
			<td>New Tab <input type="checkbox" class="Total_Soft_Check" checked="check" id="TotalSoftGallery_Video_ONT" name="TotalSoftGallery_Video_ONT"></td>
		</tr>
		<tr>
			<td colspan="3">
				<input type="button" class="Total_Soft_Gallery_Video_But" onclick="Total_Soft_Gallery_Video_Res_Vid()" value="Reset">
				<input type="button" class="Total_Soft_Gallery_Video_But" id="Total_Soft_Gallery_Video_Sav" onclick="Total_Soft_Gallery_Video_Save_Vid()" value="Save Video">
				<input type="button" class="Total_Soft_Gallery_Video_But" id="Total_Soft_Gallery_Video_Upd" onclick="Total_Soft_Gallery_Video_Update_Vid()" value="Update Video">
				<input type="text" style="display:none;" id="TotalSoftGVHidNum" name="TotalSoftGVHidNum" value="0">
				<input type="text" style="display:none;" id="TotalSoftGVHidUpdate" value="0">
			</td>
		</tr>
	</table>

	<table class="Total_Soft_AMVideoTable">
		<tr>
			<td>No</td>
			<td>Video Title</td>
			<td>Video URL</td>
			<td>Video</td>
			<td>Edit</td>
			<td>Delete</td>
		</tr>		
	</table>
	
	<ul id="TotalSoftGallery_VideoUl" onclick="TotalSoftGallery_VideoUlSort()">
		
	</ul>	
</form>