/**
 * Toggle Class
 *
 * toggls class from elements
 * add the attribute data-class-toggle="class to toggle"
 * add the attribute data-class-toggle-target="button class" if you want
 * the class to be toggled from an external element
 *
 * @version 1.0.0
 * @author Hypermetron (Minas Antonios)
 * @copyright Copyright (c) 2016, Minas Antonios
 * @license http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 */
(function($) {
    "use strict";

    var scriptValues = {};

    // On ready, init
    $(function() {

        scriptValues.$toggleElements = $("[data-class-toggle]"); // elements to be toggled
        scriptValues.$body = $("body");

        var counter = 0;

        scriptValues.$toggleElements.each(function() {

            var bindClassName = 'js-toggle-class-bind-' + counter;
            var bindEvent = typeof $(this).attr('data-class-toggle-event') != 'undefined' ? $(this).attr('data-class-toggle-event') : 'click';

            if (typeof $(this).attr('data-class-toggle-target') != 'undefined') {
                // the click event should be bound to the data-class-toggle-target

                // add a unique class name to the element that will be toggled
                $(this).addClass(bindClassName);

                // find the class toggle targets
                var $classToggleTarget = $($(this).attr('data-class-toggle-target'));

                // add the parent element as a new attribute to the toggle targets
                $classToggleTarget.attr('data-class-toggle-element', '.' + bindClassName);

                // toggle target on click event
                $classToggleTarget.on(bindEvent, function(e) {

                    // if target contains the excluded attribute, return
                    if (typeof $(e.target).attr('data-class-toggle-exclude') !== 'undefined') {
                        return;
                    }

                    // find the element to toggle
                    scriptValues.$parentElement = $(this).closest($(this).attr('data-class-toggle-element'));

                    if (scriptValues.$parentElement.length === 0) {
                        // if closest didnt yield any results, then search the whole body
                        scriptValues.$parentElement = scriptValues.$body.find($(this).attr('data-class-toggle-element'));
                    }

                    // check if default behavior should be prevented
                    if (typeof scriptValues.$parentElement.attr('data-class-toggle-default') != 'undefined' &&
                        $(scriptValues.$parentElement).attr('data-class-toggle-default') == 'false') {
                        e.preventDefault();
                    }

                    // toggle the class
                    if (scriptValues.$parentElement.hasClass(scriptValues.$parentElement.attr('data-class-toggle'))) {

                        if (scriptValues.$parentElement.attr('data-class-single-toggle-only') != 'true') {
                            scriptValues.$parentElement.removeClass(scriptValues.$parentElement.attr('data-class-toggle'));
                        }

                    } else {
                        // if data class single is set to true, only one element will have the class
                        if (typeof scriptValues.$parentElement.attr('data-class-single') != 'undefined' &&
                            scriptValues.$parentElement.attr('data-class-single') == 'true') {
                            $('.' + scriptValues.$parentElement.attr('data-class-toggle')).removeClass(scriptValues.$parentElement.attr('data-class-toggle'));
                        }

                        scriptValues.$parentElement.addClass(scriptValues.$parentElement.attr('data-class-toggle'));
                    }

                });

            } else {

                $(this).on(bindEvent, function(e) {
                    // the click event should be binded to $(this)

                    // if target contains the excluded attribute, return
                    if (typeof $(e.target).attr('data-class-toggle-exclude') !== 'undefined') {
                        return;
                    }

                    // check if default behavior should be prevented
                    if (typeof $(this).attr('data-class-toggle-default') != 'undefined' &&
                        $(this).attr('data-class-toggle-default') == 'false') {
                        e.preventDefault();
                    }

                    if ($(this).hasClass($(this).attr('data-class-toggle'))) {

                        if ($(this).attr('data-class-single-toggle-only') != 'true') {
                            $(this).removeClass($(this).attr('data-class-toggle'));
                        }

                    } else {
                        if (typeof $(this).attr('data-class-single') != 'undefined' &&
                            $(this).attr('data-class-single') == 'true') {
                            $("." + $(this).attr('data-class-toggle')).removeClass($(this).attr('data-class-toggle'));
                        }

                        $(this).addClass($(this).attr('data-class-toggle'));
                    }

                });
            }

            counter++;
        });
    });

})(jQuery);