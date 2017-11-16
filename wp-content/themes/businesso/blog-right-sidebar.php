<?php
//Template Name:Blog-right-sidebar
get_header();
$businesso_option=theme_default_data(); 
$post_options = wp_parse_args(  get_option( 'businesso_option', array() ), $businesso_option ); ?>
<div class="clearfix"></div>
<!-- Page Title Section -->
<?php asiathemes_breadcrumbs(); ?> 
<!-- /Page Title Section -->
<!---------Blog-Section------------------------------>
<section class="blog-section">
  <div class="container">
     <div class="row">
	    <div class="col-md-9">
		  <div class="row blog-item" id="post-<?php the_ID(); ?>" <?php post_class(); ?> >
	    <div class="blog-page-section">
		 <?php
		 if($post_options['blog_banner_enabled'] == 1 ) { 
		 get_template_part('blog','slider'); }
		 $args=array('post_type'=>'post', 'posts_per_page'=>-1);
			$post_type=new WP_Query($args);
			if($post_type->have_posts()) :
			while($post_type->have_posts()) :
			$post_type->the_post();
			get_template_part( 'template-parts/content', get_post_format() );
 endwhile; endif; ?>			
	</div>             
 </div>       
			   
			<div class="blog-pagination animate" data-anim-type="fadeInLeft">	   
			  <?php echo paginate_links( 
				array( 
                'show_all' => true,
                'prev_text' => '<<', 
                'next_text' => '>>', )); ?>
			</div> 			
		</div>
		<?php get_sidebar();?> 	
	 </div>
  </div>
</section>

<div class="clearfix"></div>
<?php
get_footer();
?>
 