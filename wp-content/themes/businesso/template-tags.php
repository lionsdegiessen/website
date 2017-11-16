<?php
/*
***** Businesso Template Tags
	* Add Class Gravtar
*/
if(! function_exists('businesso_gravatar_class')) :
	add_filter('get_avatar','businesso_gravatar_class');
	function businesso_gravatar_class($class) {
    $class = str_replace("class='avatar", "class='comment_img", $class);
    return $class;
	}
 endif;
 
 /*
 * Businesso Archive Title
 */
 if ( ! function_exists( 'businesso_archive_title' ) ) :
function businesso_archive_title( $before = '<h1 class="pagetitle white animate" data-anim-type="fadeInLeft">', $after = '</h1>' ) {
	if( is_archive() )
	{
	
	if ( is_category() ) {
		$title = sprintf( __( 'Category Archives: %s', 'businesso' ), '<span>' . single_cat_title( '', false ) . '</span>' );
	} elseif ( is_tag() ) {
		$title = sprintf( __( 'Tag Archives: %s', 'businesso' ), '<span>' . single_tag_title( '', false ) . '</span>' ); 
	} elseif ( is_author() ) {
		$title = sprintf( __( 'Author Archives: %s', 'businesso' ), '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( "ID" ) ) ) . '" title="' . esc_attr( get_the_author() ) . '" rel="me">' . get_the_author() . '</a>' ); 
	} elseif ( is_year() ) {
		$title = sprintf( __( 'Yearly Archives: %s', 'businesso' ), get_the_date( _x( 'Y', 'yearly archives date format', 'businesso' ) ) );
	} elseif ( is_month() ) {
		$title = sprintf( __( 'Monthly Archives: %s', 'businesso' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'businesso' ) ) );
	} elseif ( is_day() ) {
		$title = sprintf( __( 'Daily Archives: %s', 'businesso' ), get_the_date( _x( 'F j, Y', 'daily archives date format', 'businesso' ) ) );
	}  elseif ( is_post_type_archive() ) {
		$title = sprintf( __( 'Archives: %s', 'businesso' ), post_type_archive_title( '', false ) );
	}
	} elseif( is_search() )
	{
		$title = sprintf( __( 'Search Results for : %s', 'businesso' ), get_search_query() );
	}
	elseif( is_404() )
	{
		$title = sprintf( __( 'Error 404  : Page Not Found', 'businesso' ) );
	}
	else
	{
		echo '<h1 class="pagetitle white animate" data-anim-type="fadeInLeft">'.get_the_title().'</h1>';
	}	
	/**
	 * Filter the archive title.
	 *
	 * @param string $title Archive title to be displayed.
	 */
	//$title = apply_filters( 'get_the_archive_title', $title );

	if ( ! empty( $title ) ) {
		echo $before . $title . $after;
	}
}
endif;


// Site Footer Function
// Contains the closing of the #content div and all content after
function businesso_wp_footer () { ?>
	<footer class="footer">
 <div class="footer-inner">
	<div class="container">
			<div class="row" data-aos="fade-up"  data-aos-duration="1500">
				<?php
			$businesso_options=theme_default_data(); 
			$footer_setting = wp_parse_args(  get_option( 'businesso_option', array() ), $businesso_options );
			global $k;
			$k=1;
		if ( is_active_sidebar( 'footer-widget-area' ) )
			{?>
				<?php dynamic_sidebar( 'footer-widget-area' ); ?>
				
			<?php } else {
						$footer_widget=array(
							'name' => __( 'Footer Widget Area', 'businesso' ),
							'id' => 'footer-widget-area',
							'description' => __( 'footer widget area', 'businesso' ),
							'before_widget' => '<div class="col-md-3">
												<div class="footer-widget clearfix">',
							'after_widget' => '</div></div>',
							'before_title' => '<h4>',
							'after_title' => '</h4>', );
							
							the_widget('WP_Widget_Tag_Cloud', 'title=Tags', $footer_widget);
							the_widget('WP_Widget_Categories', null, $footer_widget);
							the_widget('WP_Widget_Pages', null, $footer_widget);
							the_widget('WP_Widget_Archives', null, $footer_widget);

			 }  ?>
				
			</div>
		</div>
		<div class="footer-bottom">
		  <div class="container">
			<div class="row">
				<div class="col-md-12">
            <p class="copyright"><?php if($footer_setting['footer_customization_text'] !='') { echo esc_attr($footer_setting['footer_customization_text']); }?></p>
			<div class="clearfix"></div>
        </div>
      </div>
    </div>
</div> 
	</div>
</footer>
</body>
</html>	
<!--Scroll To Top--> 
    <a href="#" class="hc_scrollup"><i class="fa fa-chevron-up"></i></a>
<!--/Scroll To Top--> 
</div>
<!--/Scroll To Top-->
<?php
} // end of businesso_wp_footer

if ( ! function_exists( 'asiathemes_content_nav' ) ) :
/**
 * Display navigation to next/previous pages when applicable
 */
function asiathemes_content_nav( $nav_id ) {
	global $wp_query, $post;

	// Don't print empty markup on single pages if there's nowhere to navigate.
	if ( is_single() ) {
		$previous = ( is_attachment() ) ? get_post( $post->post_parent ) : get_adjacent_post( false, '', true );
		$next = get_adjacent_post( false, '', false );

		if ( ! $next && ! $previous )
			return;
	}

	// Don't print empty markup in archives if there's only one page.
	if ( $wp_query->max_num_pages < 2 && ( is_home() || is_archive() || is_search() ) )
		return;

	$nav_class = ( is_single() ) ? 'post-navigation' : 'paging-navigation';
	?>
	<nav role="navigation" id="<?php echo esc_attr( $nav_id ); ?>" class="<?php echo $nav_class; ?>">
		<h1 class="screen-reader-text"><?php _e( 'Post navigation', 'businesso' ); ?></h1>

	<?php if ( is_single() ) : // navigation links for single posts ?>

		<?php previous_post_link( '<div class="nav-previous">%link</div>', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'businesso' ) . '</span> %title' ); ?>
		<?php next_post_link( '<div class="nav-next">%link</div>', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'businesso' ) . '</span>' ); ?>

	<?php elseif ( $wp_query->max_num_pages > 1 && ( is_home() || is_archive() || is_search() ) ) : // navigation links for home, archive, and search pages ?>

		<?php if ( get_next_posts_link() ) : ?>
		<div class="nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts', 'businesso' ) ); ?></div>
		<?php endif; ?>

		<?php if ( get_previous_posts_link() ) : ?>
		<div class="nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&rarr;</span>', 'businesso' ) ); ?></div>
		<?php endif; ?>

	<?php endif; ?>
		<div class="clear"></div>
	</nav><!-- #<?php echo esc_html( $nav_id ); ?> -->
	<?php
}
endif; // businesso_content_nav

	// code to change length of service two column excerpt
function get_slider_excerpt(){
	global $post;
	$excerpt = get_the_content();
	$excerpt = preg_replace(" (\[.*?\])",'',$excerpt);
	$excerpt = strip_shortcodes($excerpt);
	$excerpt = strip_tags($excerpt);
	$original_len = strlen($excerpt);
	$excerpt = substr($excerpt, 0, 100);
	$excerpt = substr($excerpt, 0, strripos($excerpt, " "));
	$excerpt = trim(preg_replace( '/\s+/', ' ', $excerpt));
	$len=strlen($excerpt);
	 return $excerpt;
}
?>