/**
 * plugin.js
 *
 * Copyright, Antoine Hurkmans
 * This is part of the Football Pool WordPress plugin.
 * See https://wordpress.org/plugins/football-pool/ for details and license.
 */

tinymce.PluginManager.add( 'footballpool', function( editor, url ) {
	// Create menu with shortcodes
	function createMenu() {
		var names = FootballPoolTinyMCE.names.split( '|' );
		var shortcodes = FootballPoolTinyMCE.shortcodes.split( '|' );
		var menu = [];
		
		for ( var i = 0; i < names.length; i++ ) {
			menu.push( {
				text: names[i],
				content: shortcodes[i],
				onclick: function() {
					editor.insertContent( this.settings.content );
				}
			} );
		}
		
		return menu;
	}
	
	// Add a button that opens a window
	editor.addButton( 'footballpool', {
		type: 'splitbutton',
		// text: FootballPoolTinyMCE.text,
		icon: false,
		image: url + '/footballpool-tinymce-16.png',
		tooltip: FootballPoolTinyMCE.tooltip,
		onclick: function() {
			window.open( 'admin.php?page=footballpool-help#shortcodes', '_blank' );
		},
		menu: createMenu(),
	} );
	
	return {
		// Return the getMetadata object for the help plugin. Not really needed, but hey, it was in the example plugin :P
		getMetadata: function () {
			return	{
				title: "Football Pool shortcodes",
				url: "https://wordpress.org/plugins/football-pool/"
			};
		}
	};
} );
