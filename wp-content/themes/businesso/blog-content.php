<?php
$businesso_options=theme_default_data(); 
$home_latest_post_option = wp_parse_args(  get_option( 'businesso_option', array() ), $businesso_options );
		global $i; $norecord=1;
					$k=1;
				$count_posts= esc_attr($home_latest_post_option['post_display_count']);
				if(have_posts()) :
				$args = array('post_type' => 'post' ,'posts_per_page'=>$count_posts, 'post__not_in'=>get_option('sticky_posts'));
				$blog_default = new WP_Query($args);
				while($blog_default->have_posts()):
					$blog_default->the_post();?>
		  <div class="item <?php if($k==1){echo 'active';} ?>">
		    <div class="col-md-4 col-sm-6 col-xs-12 pull-left video-post-sm">
			   
				
					
					<?php get_template_part( 'template-parts/content', get_post_format() ); ?>
				 
	        
		 </div>	
        </div>	
			<?php $k++;  endwhile; endif;  ?>