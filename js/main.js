window.d = console.log;
jQuery(document).ready( function($) {
	$('.cd-morph-dropdown').morphDrop();
});

$.fn.morphDrop = function() {
	// Initialize the Active Drop Down variable here so i can access it in any sub-function
	var $activeDropDown;

	// Define key DOM elements
	const $DOM = {
		container: this,
		main : $(this).find('.main-nav'),
		allItems: $(this).find('li'),
		items: $(this).find('.has-dropdown'),
		dropDownList: $(this).find('.dropdown-list'),
		dropDownBg: $(this).find('.bg-layer'),
		navToggle: $(this).find('.nav-trigger')
	}
	
	// Define key classes
	const classes = {
		active: 'active',
		isDropdownVisible: 'is-dropdown-visible',
		navOpen: 'nav-open'
	}
	
	// Define all event handlers
	const eventHandlers = () => {
		// Show when entering list items
		$DOM.items.on('mouseenter', showDropDown );

		// Hide when leaving list item or dropdown item
		$DOM.allItems.on('mouseleave', hideDropDown );
		$DOM.dropDownList.on('mouseleave', hideDropDown );


		// Mobile Toggler
		$DOM.navToggle.on('click', toggleNav );

		// Resize function, for mobile
		$(window).on('resize', clearStyle );
	}
	
	// Show the dropdown
	function showDropDown( ) {
		// Get selector of dropdown to show
		const dropDownId = $(this).data('content');
		
		// Set acitve drop down variable
		$activeDropDown = $(`#${dropDownId}`);
		
		// Get dimension of this dropdown
		const width = $activeDropDown.find('.content').outerWidth();
		const dimensions = {
			width,
			height: $activeDropDown.outerHeight(),
			left: $(this).offset().left + $(this).innerWidth()/2 - width/2
		}

		// Update Dropdown holder Dimensions & Position
		updateDropDown( dimensions);

		//Remove active class from Active dropdown siblings
		$activeDropDown.siblings().removeClass(classes.active);

		// Add active classes to the active dropdown
		$activeDropDown.addClass(classes.active);
		$DOM.container.addClass(classes.isDropdownVisible);
	}

	// Hide Dropdown
	const hideDropDown = () => {
		// Do nothing if we are hovering anywhere over the container
		if( $DOM.container.find(':hover').length > 0 ) return false;
		// if( $DOM.items.find(':hover').length > 0 ) return false;

		// Otherwise, remove the visible class
		$activeDropDown.removeClass(classes.active);
		$DOM.container.removeClass(classes.isDropdownVisible);
	}

	// Update Dropdown Dimensions & Position
	const updateDropDown = ( {left,width,height} ) => {
		// Set size & position of the list holder
		$DOM.dropDownList.css({
			'transform': `translateX(${left}px)`,
			'width': `${width}px`,
			'height': `${height}px`
		 });

		 // Set size of background
		 $DOM.dropDownBg.css({
			'transform': `scaleX(${width}) scaleY(${height})`
		 });
	}

	/* MOBILE NAV SECION */
	/* ***************** */

	// Mobile Nav Toggler
	const toggleNav = (e) => {
		clearStyle();
		e.preventDefault();

		// Toggle the visibility of the nav
		$DOM.container.toggleClass(classes.navOpen);
	}
	
	// Clear style on the dropdown list (For mobile view)
	const clearStyle = () => $DOM.dropDownList.removeAttr('style');
	
	/* INITIALIZATION */
	/* ************** */
	// NOTE: called at the end because functions must be defined first
	eventHandlers();
}