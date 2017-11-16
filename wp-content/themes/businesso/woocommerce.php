<?php get_header(); ?>
<div class="clearfix"></div>
<!-- Page Title Section -->
<?php asiathemes_breadcrumbs(); ?>
<!-- /Page Title Section -->
<!---------Blog-Section------------------------------>
<section class="blog-section">
  <div class="container">
     <div class="row">
	 <!---------Blog Area------------->
	    <div class="<?php if( is_active_sidebar('sidebar-data')) { echo "col-md-9"; }  else { echo "col-md-12"; } ?>">
		  <div class="row blog-item" id="post-<?php the_ID(); ?>" <?php post_class(); ?> >
	<div class="blog-page-section animate" data-anim-type="fadeInUp" data-anim-delay="400">
		 <?php woocommerce_content(); ?>			
	</div>
</div>			
		</div>
		<!-----Right Sidebar------------>
		<?php //get_sidebar();?> 	
	 </div>
  </div>
</section>
<div class="clearfix"></div>
<!-- Footer -->
<?php get_footer(); ?>