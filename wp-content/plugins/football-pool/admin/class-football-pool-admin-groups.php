<?php
class Football_Pool_Admin_Groups extends Football_Pool_Admin {
	public function __construct() {}
	
	public static function help() {
		$help_tabs = array(
					array(
						'id' => 'overview',
						'title' => __( 'Overview', 'football-pool' ),
						'content' => __( '<p>On this page you can add, change or delete groups.</p><p>Groups are used in a typical tournament setting to group teams for a group phase. After the group phase some teams advance to the final rounds.</p>', 'football-pool' )
					),
				);
		$help_sidebar = sprintf( '<a href="?page=footballpool-help#teams-groups-and-matches">%s</a>'
							, __( 'Help section about groups', 'football-pool' )
					);

		self::add_help_tabs( $help_tabs, $help_sidebar );
	}
	
	public static function admin() {
		self::admin_header( __( 'Groups', 'football-pool' ), '', 'add new' );
		
		$item_id = Football_Pool_Utils::request_int( 'item_id', 0 );
		$bulk_ids = Football_Pool_Utils::post_int_array( 'itemcheck', array() );
		$action = Football_Pool_Utils::request_string( 'action', 'list' );
		
		if ( count( $bulk_ids ) > 0 && $action == '-1' )
			$action = Football_Pool_Utils::request_string( 'action2', 'list' );
		
		switch ( $action ) {
			case 'save':
				check_admin_referer( FOOTBALLPOOL_NONCE_ADMIN );
				// new or updated group
				$item_id = self::update( $item_id );
				self::notice( __( 'Group saved.', 'football-pool' ) );
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
					self::notice( sprintf( __( 'Group id:%d deleted.', 'football-pool' ), $item_id ) );
				}
				if ( count( $bulk_ids) > 0 ) {
					self::delete( $bulk_ids );
					self::notice( sprintf( __( '%d groups deleted.', 'football-pool' ), count( $bulk_ids ) ) );
				}
			default:
				self::view();
		}
		
		self::admin_footer();
	}
	
	private static function edit( $id ) {
		$values = array(
						'name' => '',
						);
		
		$group = Football_Pool_Groups::get_group_by_id( $id );
		if ( $id > 0 && is_object( $group ) && $group->id != 0 ) {
			$values = (array) $group;
		}
		
		$cols = array(
					array( 'text', __( 'name', 'football-pool' ), 'name', $values['name'], '' ),
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
	
	private static function view() {
		$items = self::get_items();
		
		$cols = array(
					array( 'text', __( 'group', 'football-pool' ), 'group', '' ),
				);
		
		$rows = array();
		foreach( $items as $item ) {
			$rows[] = array(
						$item['name'], 
						$item['id'],
					);
		}
		
		$bulkactions[] = array( 'delete', __( 'Delete' ), __( 'You are about to delete one or more groups.', 'football-pool' ) . ' ' . __( 'Are you sure? `OK` to delete, `Cancel` to stop.', 'football-pool' ) );
		self::list_table( $cols, $rows, $bulkactions );
	}
	
	private static function update( $item_id ) {
		$name = Football_Pool_Utils::post_string( 'name' );
		return Football_Pool_Groups::update( $item_id, $name );
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
		// update all teams in the given group (reset to default)
		$sql = $wpdb->prepare( "UPDATE {$prefix}teams SET group_id = 0 WHERE group_id = %d", $id );
		$wpdb->query( $sql );
		$sql = $wpdb->prepare( "DELETE FROM {$prefix}groups WHERE id = %d", $id );
		$wpdb->query( $sql );
	}
	
	private static function get_items() {
		$groups = Football_Pool_Groups::get_groups();
		$output = array();
		foreach ( $groups as $group ) {
			$output[] = array(
							'id' => $group->id, 
							'name' => $group->name, 
						);
		}
		
		return $output;
	}
	
}
