<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package The Best
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
		
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'the-best' ); ?></a>

	<?php if(get_theme_mod('the_bestsocia_activate') or has_nav_menu( 'menu-2' )) { ?>
	<div class="tb-top">
	<?php } ?>
		<?php if ( has_nav_menu( 'menu-2' ) ) { ?>	
			<nav id="site-navigation" class="main-navigation nav-ico" role="navigation">
			
				<a href="#" class="menu-icon">	
				
					<span class="menu-button"> </span>
					
					<span class="menu-button"> </span>
					
					<span class="menu-button"> </span>
					
				</a>		
			
				<?php wp_nav_menu( array( 'theme_location' => 'menu-2', 'menu_id' => 'top-menu' ) ); ?>
			</nav><!-- #site-navigation -->	
		<?php } ?>
		
		<div class="tb-social">
				<?php if(get_theme_mod('the_bestsocia_activate')) { echo the_best_social_section (); } ?>
		</div>
	<?php if(get_theme_mod('the_bestsocia_activate') or has_nav_menu( 'menu-2' )) { ?>		
	</div>
	<div class="tb-hr"></div>
	<?php } ?>	
	<header id="masthead" class="site-header" role="banner">
	
		<div class="site-branding">
			<?php
			if ( is_front_page() or is_home() ) : ?>
			
			<?php if (get_theme_mod('header_logo_image')) : ?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php echo get_theme_mod('header_logo_image'); ?>"/></a></h1>
				<?php else : ?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>	
			<?php endif; ?>	
				
			<?php else : ?>
			
				<?php if (get_theme_mod('header_logo_image')) : ?>	
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php echo get_theme_mod('header_logo_image'); ?>"/></a></p>
				<?php else : ?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php
			endif;	endif;

			$description = get_bloginfo( 'description', 'display' );
			if ( $description || is_customize_preview() ) : ?>
				<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
			<?php
			endif; ?>
		</div><!-- .site-branding -->
		
			<nav id="site-navigation" class="main-navigation nav-ico" role="navigation">
			
				<a href="#" class="menu-icon">	
				
					<span class="menu-button"> </span>
					
					<span class="menu-button"> </span>
					
					<span class="menu-button"> </span>
					
				</a>		
			
				<?php wp_nav_menu( array( 'theme_location' => 'menu-1', 'menu_id' => 'primary-menu' ) ); ?>
		
	</header><!-- #masthead -->
	
	<?php if (get_theme_mod('the_bestad_top')) { ?>
		<div class="banner-db">
			<a href="<?php echo get_theme_mod('the_bestad_top_url'); ?>">
				<img src="<?php echo get_theme_mod('the_bestad_top'); ?>" alt="baner-top">
			</a>
		</div>
	<?php } ?>
	
	<?php if (( is_front_page() or is_home()) and (get_theme_mod('custom_header_position') == 'home' and has_header_image())) { ?>
		
			<div class="tb-header-image" style="background-image: url('<?php header_image(); ?>'); min-height:48vw;">

				<div class="dotted">
					<?php if(get_theme_mod('button_2')) { ?>
					<div class="button_2"><a href="<?php echo (get_theme_mod('button_url_2')); ?>"><?php echo (get_theme_mod('button_2')); ?></a></div>
					<?php } ?>
					
				<?php if(get_theme_mod('button_1')) { ?>
					<div class="button_1"><a href="<?php echo (get_theme_mod('button_url')); ?>"><?php echo (get_theme_mod('button_1')); ?></a></div>
				<?php } ?>					
				</div>	
				

				
			</div>	
		
	<?php  } ?>

	<?php if (has_header_image() and get_theme_mod('custom_header_position') == 'all') { ?>
		
			<div class="tb-header-image" style="background-image: url('<?php header_image(); ?>'); min-height:48vw;">

				<div class="dotted">
					<?php if(get_theme_mod('button_2')) { ?>
					<div class="button_2"><a href="<?php echo (get_theme_mod('button_url_2')); ?>"><?php echo (get_theme_mod('button_2')); ?></a></div>
					<?php } ?>
					
				<?php if(get_theme_mod('button_1')) { ?>
					<div class="button_1"><a href="<?php echo (get_theme_mod('button_url')); ?>"><?php echo (get_theme_mod('button_1')); ?></a></div>
				<?php } ?>					
				</div>	
				

				
			</div>	
		
	<?php }  ?>

		<?php if  (( is_front_page() or is_home()) and (((get_theme_mod('custom_header_position') != "all" and get_theme_mod('custom_header_position') != "home" and get_theme_mod('custom_header_position') != 'deactivate') and has_header_image())) ) { ?>
		
			<div class="tb-header-image" style="background-image: url('<?php echo get_template_directory_uri() . '/images/header2.jpg'; ?>'); min-height:48vw;">

				<div class="dotted">
					<?php if(get_theme_mod('button_2')) { ?>
					<div class="button_2"><a href="<?php echo (get_theme_mod('button_url_2')); ?>"><?php echo (get_theme_mod('button_2')); ?></a></div>
					<?php } ?>
					
				<?php if(get_theme_mod('button_1')) { ?>
					<div class="button_1"><a href="<?php echo (get_theme_mod('button_url')); ?>"><?php echo (get_theme_mod('button_1')); ?></a></div>
				<?php } ?>					
				</div>	
				

				
			</div>	
		
		<?php  } ?>
		
		<div id="content" class="site-content">
		