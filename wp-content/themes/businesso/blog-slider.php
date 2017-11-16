 <!-- Post Slider Section -->
 <div class="blog-area home-gallery-col" data-aos="fade-up"  data-aos-duration="1500">       
 <div class="main-slider">		
	<div id="post-slider1" class="carousel slide" data-ride="carousel" data-interval="3000">
		<div class="carousel-inner" role="listbox">
		<?php 
			$t=true;
			$i=1;
			$args = array('post_type' => 'post', 'posts_per_page' => -1, 'post__not_in'=>get_option('sticky_posts')); 	
			$post_slider = new WP_Query( $args ); 
			if( $post_slider->have_posts() )
			{ while ( $post_slider->have_posts() ) { $post_slider->the_post(); ?>
			<div class="item <?php if($t==true){echo 'active';}$t=false; ?>">
				<?php $default_arg =array('class' => 'img-responsive');
						if(has_post_thumbnail()) { 
						the_post_thumbnail('',$default_arg); 
				} else { ?>
							<?php echo '<img alt="" src="'. get_template_directory_uri() . '/images/slide/slider.jpg' .'">';
							} ?>
			</div>
			<?php $i++; } } ?>
	    </div>
		 <ul class="carou-direction-nav">
				<li><a class="carou-prev" href="#post-slider1" data-slide="prev"></a></li>
				<li><a class="carou-next" href="#post-slider1" data-slide="next"></a></li>
			</ul>
     </div>
</div>
				<div class="clearfix"></div>
				    
   
 </div>  
<!-- /Post Slider Section -->