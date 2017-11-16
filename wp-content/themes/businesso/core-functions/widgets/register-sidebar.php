<?php	
add_action( 'widgets_init', 'businesso_widgets');
function businesso_widgets() {

/*sidebar*/
register_sidebar( array(
		'name' => __( 'Sidebar Data', 'businesso' ),
		'id' => 'sidebar-data',
		'description' => __( 'The primary widget area', 'businesso' ),
		'before_widget' => '<div class="sm-right-sidebar" data-aos="fade-up"  data-aos-duration="1500">',
		'after_widget' => '</div>',
		'before_title' => '<div class="sm-widget-title"><h3>',
		'after_title' => '</h3></div><div class="sm-sidebar-widget" data-aos="fade-up"  data-aos-duration="1000">
						<ul class="post-content">',
	) );

register_sidebar( array(
		'name' => __( 'Footer Widget Area', 'businesso' ),
		'id' => 'footer-widget-area',
		'description' => __( 'footer widget area', 'businesso' ),
		'before_widget' => '<div class="col-md-3" data-aos="fade-up"  data-aos-duration="1500">
							<div class="footer-widget clearfix">',
		'after_widget' => '</div></div>',
		'before_title' => '<h4>',
		'after_title' => '</h4>',
	) );
	
}	                     
?>