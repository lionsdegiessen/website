<!--Blog Post Slider Section -->
<?php $businesso_option=theme_default_data(); 
$post_slider_options = wp_parse_args(  get_option( 'businesso_option', array() ), $businesso_option );?>
 <div class="main-slider">		
	<div id="home-slider" class="carousel slide " data-ride="carousel" <?php //if($slider_setting['slider_transition_delay'] != '') { ?> data-interval="3000">
	<?php 	$t=true; ?>
		<div class="carousel-inner" role="listbox">
		<?php 
			$t=true;
			$i=1;
						$count_post= esc_attr($post_slider_options['home_blog_slider_post_count']);
						$args = array('post_type' => 'post', 'posts_per_page' => $count_post, 'post__not_in'=>get_option('sticky_posts')); 	
						$post_slider = new WP_Query( $args ); 
						if( $post_slider->have_posts() )
						{ while ( $post_slider->have_posts() ) { $post_slider->the_post(); ?>
				<div class="item <?php if($t==true){echo 'active';}$t=false; ?>">
				<?php $default_arg =array('class' => 'img-responsive');
						if(has_post_thumbnail()) { ?>
				<?php the_post_thumbnail('',$default_arg); ?>
				<?php } else { ?>
							<?php echo '<img alt="" src="'. get_template_directory_uri() . '/images/slide/slider.jpg' .'">';
							} ?>
							
                  <div class="carousel-caption">
                    <h1 data-animation="animated zoomInLeft"><?php the_title(); ?></h1>
					
                    <p data-animation="animated bounceInLeft"><?php echo get_slider_excerpt(); ?></p>
				
					<a data-animation="animated zoomInUp" class="main-btn btn-1 btn-1b" href="<?php the_permalink(); ?>"><?php _e('Read More','businesso'); ?></a>
					
                </div>			
			</div>
			<?php $i++; } } ?>
<!-- /Slider Section -->
<?php  if($i>1){ ?>
		<ul class="carou-direction-nav">
				<li><a class="carou-prev" href="#home-slider" data-slide="prev"></a></li>
				<li><a class="carou-next" href="#home-slider" data-slide="next"></a></li>
		</ul>
			<?php } ?>
    </div>
</div>
<!-- /Slider Section -->