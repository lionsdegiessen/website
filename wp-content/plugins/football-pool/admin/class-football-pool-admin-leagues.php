<?php
class Football_Pool_Admin_Leagues extends Football_Pool_Admin {
	public function __construct() {}
	
	public static function help() {
		$help_tabs = array(
					array(
						'id' => 'overview',
						'title' => __( 'Overview', 'football-pool' ),
						'content' => __( '<p>On this page you can add, change or delete leagues.</p>', 'football-pool' )
					),
				);
		$help_sidebar = '<a href="?page=footballpool-help#leagues">Help section about leagues</a></p><p><a href="?page=footballpool-help#players">Help section about players</a>';
		self::add_help_tabs( $help_tabs, $help_sidebar );
	}
	
	public static function admin() {
		self::admin_header( __( 'Leagues', 'football-pool' ), '', 'add new' );
		
		$league_id = Football_Pool_Utils::request_int( 'item_id', 0 );
		$bulk_ids = Football_Pool_Utils::post_int_array( 'itemcheck', array() );
		$action = Football_Pool_Utils::request_string( 'action', 'list' );
		
		if ( count( $bulk_ids ) > 0 && $action == '-1' )
			$action = Football_Pool_Utils::request_string( 'action2', 'list' );
		
		switch ( $action ) {
			case 'save':
				check_admin_referer( FOOTBALLPOOL_NONCE_ADMIN );
				// new or updated league
				$league_id = self::update( $league_id );
				self::notice( __( 'League saved.', 'football-pool' ) );
				if ( Football_Pool_Utils::post_str('submit') == __( 'Save & Close', 'football-pool' ) ) {
					self::view();
					break;
				}
			case 'edit':
				self::edit( $league_id );
				break;
			case 'delete':
				check_admin_referer( FOOTBALLPOOL_NONCE_ADMIN );
				if ( $league_id > 0 ) {
					self::delete( $league_id );
					self::notice( sprintf( __("League id:%s deleted.", 'football-pool' ), $league_id ) );
				}
				if ( count( $bulk_ids) > 0 ) {
					self::delete( $bulk_ids );
					self::notice( sprintf( __( '%s leagues deleted.', 'football-pool' ), count( $bulk_ids ) ) );
				}
			default:
				self::view();
		}
		
		self::admin_footer();
	}
	
	private static function edit( $id ) {
		$values = array(
						'name' => '',
						'image' => ''
						);
		
		$league = self::get_league( $id );
		if ( $league && $id > 0 ) {
			$values = $league;
		}
		$cols = array(
					array( 'text', __( 'league', 'football-pool' ), 'name', $values['name'], '' ),
					array( 'image', __( 'image', 'football-pool' ), 'image', $values['image'], sprintf( __( 'Image path must be a full URL to the image. Or a path relative to the football pool upload directory (%s)', 'football-pool' ), trailingslashit( FOOTBALLPOOL_UPLOAD_URL . 'leagues' ) ) ),
					array( 'hidden', '', 'item_id', $id ),
					array( 'hidden', '', 'action', 'save' )
				);
		self::value_form( $cols );
		echo '<p class="submit">';
		submit_button( __( 'Save & Close', 'football-pool' ), 'primary', 'submit', false );
		submit_button( null, 'secondary', 'save', false );
		self::cancel_button();
		echo '</p>';
	}
	
	private static function get_league( $id ) {
		$pool = new Football_Pool_Pool();
		$leagues = $pool->leagues;
		if ( array_key_exists( $id, $leagues ) ) {
			$output = array(
							'name' => $leagues[$id]['league_name'],
							'image' => $leagues[$id]['image']
							);
		} else {
			$output = null;
		}
		
		return $output;
	}
	
	private static function get_leagues() {
		$pool = new Football_Pool_Pool();
		$leagues = $pool->get_leagues( true );
		$output = array();
		foreach ( $leagues as $league ) {
			$output[] = array(
							'id' => $league['league_id'], 
							'name' => $league['league_name'], 
							'image' => $league['image']
						);
		}
		return $output;
	}
	
	private static function view() {
		$pool = new Football_Pool_Pool();
		if ( ! $pool->has_leagues ) {
			self::notice( __( '<strong>Important:</strong> at this moment you are not using leagues. This may be caused by the fact that you didn\'t add any leagues in the admin, or because you changed this setting in the <a href="?page=footballpool-options">plugin options</a>.', 'football-pool' ), 'important' );
		}
		
		$leagues = self::get_leagues();
		
		$cols = array(
					array( 'text', __( 'league', 'football-pool' ), 'league', '' ),
					array( 'text', __( 'image', 'football-pool' ), 'image', '' ),
					array( 'text', __( 'league nr', 'football-pool' ), 'nr', '' ),
				);
		
		$rows = array();
		foreach( $leagues as $league ) {
			$rows[] = array(
						$league['name'],
						self::league_image( $league['image'] ),
						$league['id'],
						$league['id'],
					);
		}
		
		$bulkactions[] = array( 'delete', __( 'Delete' ), __( 'You are about to delete one or more leagues.', 'football-pool' ) . ' ' . __( 'Are you sure? `OK` to delete, `Cancel` to stop.', 'football-pool' ) );
		self::list_table( $cols, $rows, $bulkactions );
	}
	
	private static function league_image( $img ) {
		if ( $img != '' ) {
			$path = '';
			if ( stripos( $img, 'http://' ) !== 0 && stripos( $img, 'https://' ) !== 0 ) {
				$path = trailingslashit( FOOTBALLPOOL_UPLOAD_URL . 'leagues' );
			}
			$img = sprintf( '<img src="%s" alt="" / class="league-image" >', $path.$img );
		} else {
			$img = '';
		}
		return $img;
	}
	
	private static function update( $league_id ) {
		$league = array(
						$league_id,
						Football_Pool_Utils::post_string( 'name' ),
						Football_Pool_Utils::post_string( 'image' )
					);
		
		$id = self::update_league( $league );
		return $id;
	}
	
	private static function delete( $league_id ) {
		if ( is_array( $league_id ) ) {
			foreach ( $league_id as $id ) self::delete_league( $id );
		} else {
			self::delete_league( $league_id );
		}
	}
	
	private static function delete_league( $id ) {
		global $wpdb;
		$prefix = FOOTBALLPOOL_DB_PREFIX;
		
		$sql = $wpdb->prepare( "DELETE FROM {$prefix}league_users WHERE league_id = %d", $id );
		$wpdb->query( $sql );
		$sql = $wpdb->prepare( "DELETE FROM {$prefix}leagues WHERE id = %d", $id );
		$wpdb->query( $sql );
		wp_cache_delete( FOOTBALLPOOL_CACHE_LEAGUES_ALL );
		wp_cache_delete( FOOTBALLPOOL_CACHE_LEAGUES_USERDEFINED );
	}
	
	private static function update_league( $input ) {
		global $wpdb;
		$prefix = FOOTBALLPOOL_DB_PREFIX;
		
		$id = $input[0];
		$name = $input[1];
		$image = $input[2];
		$user_defined = 1;
		
		if ( $id == 0 ) {
			$sql = $wpdb->prepare( "INSERT INTO {$prefix}leagues ( name, user_defined, image )
									VALUES (%s, %d, %s)",
									$name, $user_defined, $image
								);
		} else {
			$sql = $wpdb->prepare( "UPDATE {$prefix}leagues SET
										name = %s,
										user_defined = %d,
										image = %s
									WHERE id = %d",
									$name, $user_defined, $image, $id
								);
		}
		
		$wpdb->query( $sql );
		wp_cache_delete( FOOTBALLPOOL_CACHE_LEAGUES_ALL );
		wp_cache_delete( FOOTBALLPOOL_CACHE_LEAGUES_USERDEFINED );
		
		return ( $id == 0 ) ? $wpdb->insert_id : $id;
	}

}
