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
	    <div class="col-md-9">
		 <?php get_template_part('content',get_post_format()); ?>
		 
		<div class="blog-pagination animate" data-anim-type="fadeInLeft">	   
			  <?php echo paginate_links( 
        array( 
                'show_all' => true,
                'prev_text' => '<<', 
                'next_text' => '>>',
                )
        ); ?> </div> 			
		</div>
		<!-----Right Sidebar------------>
		<?php get_sidebar();?> 	
	 </div>
  </div>
</section>
<div class="clearfix"></div>
<!-- Footer -->
<?php get_footer(); ?>