(function() {
	tinymce.create('tinymce.plugins.d12mla', {
		init : function (ed, url) {
			ed.addButton('d12-mla-button', {
				title:'Add MLA-style citations',
				type:'menubutton',
				image: url + '/d12-mla-mce-button.png',
				menu: [
					{
						text: 'Begin the citation section',
						value: 'begin',
						icon : 'icon d12mla-begin',
						onclick: function() {
							ed.selection.setContent('[mla-start]');
						}
					},
					{
						text: 'Cite a book',
						value: 'Support',
						icon : 'icon d12mla-book',
						onclick: function() {
							ed.windowManager.open( {
								title: 'Please enter the citation information for this book',
								body: [
								{
									type: 'container',
									html: 'To ensure your citation is properly formatted when your post is published,<br />include only <span style="font-weight:bold;">internal</span> punctuation. Do not include any formatting (italics,<br />bold, etc.) or <span style="font-weight:bold;">end</span> punctuation.',
								},
								{
									type: 'textbox',
									name: 'author',
									label: 'Author(s)'
								},
								{
									type: 'textbox',
									name: 'title',
									label: 'Title'
								},
								{
									type: 'textbox',
									name: 'city',
									label: 'City'
								},
								{
									type: 'textbox',
									name: 'publisher',
									label: 'Publisher'
								},
								{
									type: 'textbox',
									name: 'year',
									label: 'Year'
								},
								{
									type: 'textbox',
									name: 'medium',
									label: 'Medium'
								},
								{
									type: 'container',
									html: '<span style="display: block; border-top: solid 1px #ccc; font-style: italic; font-size: 90%; margin: 10px 0 -10px;">You may use html, such &lt;i&gt; and &lt;b&gt;, in this box:<span>'
								},
								{
									type: 'textbox',
									name: 'additional',
									minHeight: 100,
									minWidth: 400,
									multiline: 'true',
									label: 'Additional Information'
								}
								],
								onsubmit: function( book ) {
									ed.selection.setContent('[mlabook author="' + book.data.author + '" title="' + book.data.title + '" city="' + book.data.city + '" publisher="' + book.data.publisher + '" year="' + book.data.year +'" medium="' +book.data.medium +'" addt="' + book.data.additional + '"]');
								}
							});
						}
					}, // End of "Book" 
					{
						text: 'Cite a journal article',
						value: 'Journal',
						icon : 'icon d12mla-journal',
						onclick: function() {
							ed.windowManager.open( {
								title: 'Please enter the citation information for this journal',
								body: [
								{
									type: 'container',
									html: 'To ensure your citation is properly formatted when your post is published,<br />include only <span style="font-weight:bold;">internal</span> punctuation. Do not include any formatting (italics,<br />bold, etc.) or <span style="font-weight:bold;">end</span> punctuation.',
								},
								{
									type: 'textbox',
									name: 'author',
									label: 'Author(s)'
								},
								{
									type: 'textbox',
									name: 'title',
									label: 'Title of Article'
								},
								{
									type: 'textbox',
									name: 'journal',
									label: 'Name of Journal'
								},
								{
									type: 'textbox',
									name: 'volume',
									label: 'Volume'
								},
								{
									type: 'textbox',
									name: 'issue',
									label: 'Issue'
								},
								{
									type: 'textbox',
									name: 'year',
									label: 'Year'
								},
								{
									type: 'textbox',
									name: 'pages',
									label: 'Pages'
								},
								{
									type: 'textbox',
									name: 'medium',
									label: 'Medium'
								},
								{
									type: 'container',
									html: '<span style="display: block; border-top: solid 1px #ccc; font-style: italic; font-size: 90%; margin: 10px 0 -10px;">You may use html, such &lt;i&gt; and &lt;b&gt;, in this box:<span>'
								},
								{
									type: 'textbox',
									name: 'additional',
									minHeight: 100,
									minWidth: 400,
									multiline: 'true',
									label: 'Additional Information'
								}
								],
								onsubmit: function( journal ) {
									ed.selection.setContent('[mlajournal author="' + journal.data.author + '" title="' + journal.data.title + '" journal="' + journal.data.journal + '" volume="' + journal.data.volume + '" issue="' + journal.data.issue + '" year="' + journal.data.year +'" pages="' + journal.data.pages +'" medium="' +journal.data.medium +'" addt="' + journal.data.additional + '"]');
								}
							});
						}
					}, // End of "Journal" 
					{
						text: 'Cite a magazine article',
						value: 'Magazine',
						icon : 'icon d12mla-magazine',
						onclick: function() {
							ed.windowManager.open( {
								title: 'Please enter the citation information for this magazine',
								body: [
								{
									type: 'container',
									html: 'To ensure your citation is properly formatted when your post is published,<br />include only <span style="font-weight:bold;">internal</span> punctuation. Do not include any formatting (italics,<br />bold, etc.) or <span style="font-weight:bold;">end</span> punctuation.',
								},
								{
									type: 'textbox',
									name: 'author',
									label: 'Author(s)'
								},
								{
									type: 'textbox',
									name: 'title',
									label: 'Title of Article'
								},
								{
									type: 'textbox',
									name: 'magazine',
									label: 'Name of Magazine'
								},
								{
									type: 'textbox',
									name: 'date',
									label: 'Date'
								},
								{
									type: 'textbox',
									name: 'pages',
									label: 'Pages'
								},
								{
									type: 'textbox',
									name: 'medium',
									label: 'Medium'
								},
								{
									type: 'container',
									html: '<span style="display: block; border-top: solid 1px #ccc; font-style: italic; font-size: 90%; margin: 10px 0 -10px;">You may use html, such &lt;i&gt; and &lt;b&gt;, in this box:<span>'
								},
								{
									type: 'textbox',
									name: 'additional',
									minHeight: 100,
									minWidth: 400,
									multiline: 'true',
									label: 'Additional Information'
								}
								],
								onsubmit: function( magazine ) {
									ed.selection.setContent('[mlamagazine author="' + magazine.data.author + '" title="' + magazine.data.title + '" magazine="' + magazine.data.magazine + '" date="' + magazine.data.date + '" pages="' + magazine.data.pages +'" medium="' + magazine.data.medium +'" addt="' + magazine.data.additional + '"]');
								}
							});
						}
					}, // End of "Magazine" 
					{
						text: 'Add a note to a citation',
						value: 'Note',
						icon : 'icon d12mla-note',
						onclick: function() {
							ed.windowManager.open( {
								title: 'Please enter a note for the above citation',
								body: [
								{
									type: 'container',
									html: '<span style="font-style: italic; font-size: 90%; margin: 10px 0 -10px;">You may use html, such &lt;i&gt; and &lt;b&gt;, in this box:<span>'
								},
								{
									type: 'textbox',
									name: 'note',
									minHeight: 200,
									minWidth: 400,
									multiline: 'true',
									label: 'Note'
								}
								],
								onsubmit: function( note ) {
									ed.selection.setContent('[note]' + note.data.note + '[/note]');
								}
							});
						}
					}, // End of "note" 
					{
						text: 'End the citation section',
						value: 'end',
						icon : 'icon d12mla-end',
						onclick: function() {
							ed.selection.setContent('[mla-end]');
						}
					}, // End of "end" 
					{
						text: 'Add a yellow highlight',
						value: 'yellow highlight',
						icon : 'icon d12mla-hly',
						onclick: function() {
							ed.selection.setContent('[hly]' + ed.selection.getContent() + '[/hly]');
						}
					}, // End of "yellow highlight" 
					{
						text: 'Make text superscript',
						value: 'small sup',
						icon : 'icon d12mla-sup',
						onclick: function() {
							ed.selection.setContent('[sup]' + ed.selection.getContent() + '[/sup]');
						}
					}, // End of "text smaller" 
					{
						text: 'Make text smaller',
						value: 'small text',
						icon : 'icon d12mla-smalltext',
						onclick: function() {
							ed.selection.setContent('[small]' + ed.selection.getContent() + '[/small]');
						}
					}, // End of "text smaller" 
					{
						text: 'Clear all floats',
						value: 'end',
						icon : 'icon d12mla-clearboth',
						onclick: function() {
							ed.selection.setContent('[clear]');
						}
					}, // End of "clear all floats" 
					{
						text: 'Clear left float',
						value: 'end',
						icon : 'icon d12mla-clearleft',
						onclick: function() {
							ed.selection.setContent('[clearleft]');
						}
					}, // End of "clear left float" 
					{
						text: 'Clear right float',
						value: 'end',
						icon : 'icon d12mla-clearright',
						onclick: function() {
							ed.selection.setContent('[clearright]');
						}
					} // End of "clear right float" 
			]}); // end of ed.addButton
		},
		createControl : function(n, cm) {
			return null;
		},
	}); // end of tinymce.create()
	tinymce.PluginManager.add( 'd12mla', tinymce.plugins.d12mla );
})(); // closes the first line
