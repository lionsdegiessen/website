<div class="col-md-3">
	<div class="sm-right-sidebar animate" data-anim-type="fadeInUp" data-anim-delay="500">
		<?php if ( is_active_sidebar( 'sidebar-data' ) )
				{ dynamic_sidebar( 'sidebar-data' );	} else  { 
						$args = array(
						'before_widget' => '<div class="sm-right-sidebar animate" data-anim-type="fadeInUp" data-anim-delay="500">',
						'after_widget' => '</div>',
						'before_title' => '<div class="sm-widget-title"><h3>',
						'after_title' => '</h3></div><div class="sm-sidebar-widget animate" data-anim-type="fadeInUp" data-anim-delay="600">
						<ul class="post-content">',	);
						
						the_widget('WP_Widget_Search', 'title=Search', $args);
						the_widget('WP_Widget_Calendar', 'title=Calendar', $args);
						the_widget('WP_Widget_Archives', null, $args);
						the_widget('WP_Widget_Recent_Posts', null, $args);
						the_widget('WP_Widget_Categories', null, $args);
						the_widget('WP_Widget_Tag_Cloud', null, $args);
						 }

				if ( is_active_sidebar( 'woocommerce-sidebar' ) )
				{ dynamic_sidebar( 'woocommerce-sidebar' );	}

						 ?>
	</div>
</div> 