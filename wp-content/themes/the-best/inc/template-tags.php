<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package The Best
 */

if ( ! function_exists( 'the_best_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function the_best_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<i class="fa fa-clock-o"></i>  <time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( 'Posted on %s', 'post date', 'the-best' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$byline = sprintf(
		esc_html_x( 'by %s', 'post author', 'the-best' ),
		'<span class="author vcard"> <i class="fa fa-male"></i>  <a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);

	echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

}
endif;

if ( ! function_exists( 'the_best_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function the_best_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' === get_post_type() ) {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( esc_html__( ', ', 'the-best' ) );
		if ( $categories_list && the_best_categorized_blog() ) {
			printf( '<i class="fa fa-folder-open"></i><span class="cat-links">' . esc_html__( ' Posted in %1$s ', 'the-best' ) . '</span>', $categories_list ); // WPCS: XSS OK.
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', esc_html__( ', ', 'the-best' ) );
		if ( $tags_list ) {
			printf( '<i class="fa fa-tags" aria-hidden="true"></i> <span class="tags-links">' . esc_html__( 'Tagged %1$s', 'the-best' ) . '</span>', $tags_list ); // WPCS: XSS OK.
		}
	}

	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo ' <i class="fa fa-comment"></i> <span class="comments-link">';
		/* translators: %s: post title */
		comments_popup_link( sprintf( wp_kses( __( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'the-best' ), array( 'span' => array( 'class' => array() ) ) ), get_the_title() ) );
		echo '</span>';
	}

	edit_post_link(
		sprintf(
			/* translators: %s: Name of current post */
			esc_html__( ' Edit %s', 'the-best' ),
			the_title( '<span class="screen-reader-text">"', '"</span>', false )
		),
		' <i class="fa fa-pencil-square" aria-hidden="true"></i> <span class="edit-link">',
		'</span>'
	);
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function the_best_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'the_best_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,
			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'the_best_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so the_best_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so the_best_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in the_best_categorized_blog.
 */
function the_best_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'the_best_categories' );
}
add_action( 'edit_category', 'the_best_category_transient_flusher' );
add_action( 'save_post',     'the_best_category_transient_flusher' );
