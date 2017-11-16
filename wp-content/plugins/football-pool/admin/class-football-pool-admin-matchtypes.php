<?php
class Football_Pool_Admin_Match_Types extends Football_Pool_Admin {
	public function __construct() {}
	
	public static function help() {
		$help_tabs = array(
					array(
						'id' => 'overview',
						'title' => __( 'Overview', 'football-pool' ),
						'content' => __( '<p>On this page you can add, change or delete match types.</p><p>Match types are used to group matches together on the match schedule screen (e.g. Group Phase, Quarter Finals).</p>', 'football-pool' )
					),
				);
		$help_sidebar = '';
	
		self::add_help_tabs( $help_tabs, $help_sidebar );
	}
	
	public static function admin() {
		self::admin_header( __( 'Match Types', 'football-pool' ), '', 'add new' );
		
		$item_id = Football_Pool_Utils::request_int( 'item_id', 0 );
		$bulk_ids = Football_Pool_Utils::post_int_array( 'itemcheck', array() );
		$action = Football_Pool_Utils::request_string( 'action', 'list' );
		
		if ( count( $bulk_ids ) > 0 && $action == '-1' )
			$action = Football_Pool_Utils::request_string( 'action2', 'list' );
		
		switch ( $action ) {
			case 'visible':
			case 'invisible':
				check_admin_referer( FOOTBALLPOOL_NONCE_ADMIN );
				if ( $item_id > 0 ) {
					self::change_visibility( $user_id, $action );
					if ( $action == 'visible' )
						$notice = __( 'Match type %d is visible.', 'football-pool' );
					else
						$notice = __( 'Match type %d is invisible.', 'football-pool' );
					
					$nr = $item_id;
				}
				if ( count( $bulk_ids) > 0 ) {
					self::change_visibility( $bulk_ids, $action );
					if ( $action == 'visible' )
						$notice = __( '%d match types made visible.', 'football-pool' );
					else
						$notice = __( '%d match types made invisible.', 'football-pool' );
					
					$nr = count( $bulk_ids );
				}
				
				if ( $notice != '' ) self::notice( sprintf( $notice, $nr ) );
				self::view();
				break;
			case 'save':
				check_admin_referer( FOOTBALLPOOL_NONCE_ADMIN );
				// new or updated match type
				$item_id = self::update( $item_id );
				self::notice( __( 'Match type saved.', 'football-pool' ) );
				if ( Football_Pool_Utils::post_str( 'submit' ) == __( 'Save & Close', 'football-pool' ) ) {
					self::view();
					break;
				}
			case 'edit':
				self::edit( $item_id );
				break;
			case 'delete':
				check_admin_referer( FOOTBALLPOOL_NONCE_ADMIN );
				if ( $item_id > 0 ) {
					self::delete( $item_id );
					self::notice( sprintf( __( 'Match type id:%s deleted.', 'football-pool' ), $item_id ) );
				}
				if ( count( $bulk_ids) > 0 ) {
					self::delete( $bulk_ids );
					self::notice( sprintf( __( '%s match types deleted.', 'football-pool' ), count( $bulk_ids ) ) );
				}
			default:
				self::view();
		}
		
		self::admin_footer();
	}
	
	private static function edit( $id ) {
		$values = array(
						'name' => '',
						'visible' => 1,
					);
		
		$match_type = self::get_match_type( $id );
		if ( $match_type && $id > 0 ) {
			$values = $match_type;
		}
		$cols = array(
					array( 'text', __( 'name', 'football-pool' ), 'name', $values['name'], '' ),
					array( 'checkbox', __( 'visible on the website', 'football-pool' ), 'visible', $values['visible'], '' ),
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
	
	private static function get_match_type( $id ) {
		$matches = new Football_Pool_Matches;
		$match_type = $matches->get_match_type_by_id( $id );
		if ( is_object( $match_type ) ) {
			$output = array(
							'name' => $match_type->name,
							'visible' => $match_type->visibility,
							);
		} else {
			$output = null;
		}
		
		return $output;
	}
	
	private static function get_match_types() {
		$matches = new Football_Pool_Matches;
		$match_types = $matches->get_match_types();
		$output = array();
		foreach ( $match_types as $match_type ) {
			$output[] = array(
							'id' => $match_type->id, 
							'name' => $match_type->name,
							'visible' => $match_type->visibility,
						);
		}
		return $output;
	}
	
	private static function view() {
		$items = self::get_match_types();
		
		$cols = array(
					array( 'text', __( 'match type', 'football-pool' ), 'name', '' ),
					array( 'integer', __( 'id', 'football-pool' ), 'id', '' ),
					array( 'boolean', __( 'visible', 'football-pool' ), 'visible', '' ),
				);
		
		$rows = array();
		foreach( $items as $item ) {
			$rows[] = array(
						$item['name'], 
						$item['id'],
						$item['visible'], 
						$item['id'],
					);
		}
		
		$bulkactions[] = array( 'delete', __( 'Delete' ), __( 'You are about to delete one or more match types.', 'football-pool' ) . ' ' . __( 'Are you sure? `OK` to delete, `Cancel` to stop.', 'football-pool' ) );
		$bulkactions[] = array( 'visible', __( 'Make visible', 'football-pool' ), __( 'You are about to make one or more match types visible.', 'football-pool' ) . ' ' . __( 'Are you sure? `OK` to continue, `Cancel` to stop.', 'football-pool' ) );
		$bulkactions[] = array( 'invisible', __( 'Make invisible', 'football-pool' ), __( 'You are about to make one or more match types invisible.', 'football-pool' ) . ' ' . __( 'Are you sure? `OK` to continue, `Cancel` to stop.', 'football-pool' ) );
		self::list_table( $cols, $rows, $bulkactions );
	}
	
	private static function update( $item_id ) {
		$item = array(
						$item_id,
						Football_Pool_Utils::post_string( 'name' ),
						Football_Pool_Utils::post_int( 'visible' ),
					);
		
		$id = self::update_item( $item );
		return $id;
	}
	
	private static function delete( $item_id ) {
		if ( is_array( $item_id ) ) {
			foreach ( $item_id as $id ) self::delete_item( $id );
		} else {
			self::delete_item( $item_id );
		}
	}
	
	private static function delete_item( $id ) {
		global $wpdb;
		$prefix = FOOTBALLPOOL_DB_PREFIX;
		
		$sql = $wpdb->prepare( "DELETE FROM {$prefix}matchtypes WHERE id = %d", $id );
		$wpdb->query( $sql );
	}
	
	private static function update_item( $input ) {
		global $wpdb;
		$prefix = FOOTBALLPOOL_DB_PREFIX;
		
		$id = $input[0];
		$name = $input[1];
		$visible = $input[2];
		
		if ( $id == 0 ) {
			$sql = $wpdb->prepare( "INSERT INTO {$prefix}matchtypes ( name, visibility )
									VALUES ( %s, %d )",
									$name, $visible
								);
		} else {
			$sql = $wpdb->prepare( "UPDATE {$prefix}matchtypes SET
										name = %s,
										visibility = %d
									WHERE id = %d",
									$name, $visible, $id
								);
		}
		
		$wpdb->query( $sql );
		
		return ( $id == 0 ) ? $wpdb->insert_id : $id;
	}

	private static function change_visibility( $item_id, $visible = 'visible' ) {
		if ( is_array( $item_id ) ) {
			foreach ( $item_id as $id ) self::change_visibility_matchtype( $id, $visible );
		} else {
			self::change_visibility_matchtype( $item_id, $visible );
		}
	}

	private static function change_visibility_matchtype( $id, $visible = 'visible' ) {
		global $wpdb;
		$prefix = FOOTBALLPOOL_DB_PREFIX;
		
		$visible = ( $visible == 'visible' ) ? 1 : 0;
		$sql = $wpdb->prepare( "UPDATE {$prefix}matchtypes SET visibility = %d WHERE id = %d"
								, $visible, $id );
		$wpdb->query( $sql );
	}
}
