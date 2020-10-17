/*
 *  lightsoff - v2.0.2
 *  jQuery-based plugin that provides a cinema-like experience while watching a video on a page
 *  https://github.com/migueldemoura/lightsoff
 *
 *  Made by Miguel de Moura
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

    var options, defaults = {
        color: 'black',
        opacity: 0.95,
        zIndex: 999,
        switchSelectors: [],
        durationLightsOff: 400,
        durationLightsOn: 400,
        allowScrolling: true
    };

    var $body = $('body'), $head = $('head');
    var overlayClass = 'lightsOffOverlay';
    var overlaySelector = '.' + overlayClass;
    var videos = [], currentVideo;
    var isInitialized = false;

    // Public methods
    var pluginApi = {
        init: function(publicOptions) {
            var i;

            options = $.extend(true, {}, defaults, publicOptions);

            this.each(function() {
                videos.push($(this));
            });

            // Create Overlay Skeleton
            $('<style>' +
                   overlaySelector + ' {' +
                       'position: absolute;' +
                       'display: none;' +
                       'background: '+ options.color + ';' +
                       'opacity: ' + options.opacity + ';' +
                       'z-index: ' + options.zIndex + ';' +
                   '}' +
              '</style>').appendTo($head);

            for (i = 0; i < 8; ++i) {
                // Add overlay chunk to body
                $('<div />').attr({'id' : overlayClass + i, 'class' : overlayClass}).appendTo($body);
            }

            // Handlers
            for (i = 0; i < options.switchSelectors.length; ++i) {
                // Don't add event handler to empty selector
                if (options.switchSelectors[i] !== '') {
                    $body.on('click', options.switchSelectors[i], {id : i}, attachEventSwitch);
                }
            }
            $body.on('click', overlaySelector, function() {
                pluginApi.hide.apply(currentVideo, arguments);
            });

            // Recalculates chunk positions on window resize
            $(window).on('resize', function() {
                var overlay = $(overlaySelector);
                if (overlay.is(':visible')) {
                    overlay.hide(); // Prevents incorrect dimensions when downsizing window
                    overlayCalc(currentVideo);
                    overlay.show();
                }
            });

            isInitialized = true;

            return this;
        },
        show: function() {
            overlayCalc(this);
            overlayState(this, true);
            return this;
        },
        hide: function() {
            overlayState(this, false);
            return this;
        }
    };

    // Private Methods
    var overlayCalc = function (video)  {
        var offset = video.offset();
        var $document = $(document);

        var vh = video.height(),
            vw = video.width(),
            vax = offset.left,
            vay = offset.top,
            vbx = vax + vw,
            vby = vay + vh,
            dhs = $document.height() - vby,
            dws = $document.width() - vbx;

        var chunkData = [
            [0, vay, vby, 0, vby, 0, vay, vby], //top
            [0, 0, 0, vax, vax, vbx, vbx, vbx], //left
            [vay, vh, dhs, vay, dhs, vay, vh, dhs], //height
            [vax, vax, vax, vw, vw, dws, dws, dws] //width
        ];

        for (var id = 0; id < 8; ++id) {
            $('#' + overlayClass + id).css({
                top: chunkData[0][id],
                left: chunkData[1][id],
                right: 0,
                height: chunkData[2][id],
                width: chunkData[3][id]
            });
        }
    };
    var overlayState = function (video, state) {
        var overlay = $(overlaySelector);
        var isVisible = overlay.is(':visible');

        if (state && !isVisible || !state && isVisible) {
            var fireEvent = true;
            overlay[state ? 'fadeIn' : 'fadeOut']
            (state ? options.durationLightsOff : options.durationLightsOn, function() {
                if (!options.allowScrolling) {
                    $body.css('overflow', state ? 'hidden' : 'auto');
                }
                if (fireEvent) { // Called once per chunk but trigger the event just one time
                    fireEvent = false;
                    $.event.trigger(state ? 'lightsOff' : 'lightsOn', video);

                    // Update current video
                    currentVideo = (state) ? video : null;
                }
            });
        }
    };
    var attachEventSwitch = function(e) {
        pluginApi.show.apply(videos[e.data.id], arguments);
    };

    // Attach plugin to jQuery namespace
    $.fn.lightsOff = function(method) {
        if (pluginApi[method]) {
            if (isInitialized) {
                return pluginApi[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                $.error('LightsOff must be initialized before using method ' + method + '.');
            }
        }
        else if (typeof method === 'object' || !method) {
            return pluginApi.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + 'does not exist in lightsoff.');
        }
    };
}(jQuery, window, document));