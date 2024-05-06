/**
 * Lloyds Banking Group : Galaxy IB Mobile : Global JS
 * @version 1.0
 */
/*jslint bitwise: true, eqeqeq: true, passfail: false, nomen: false, plusplus: false, undef: true, evil: true */
/*global window, document, DI */

/**
 * @namespace Root namespace for holding all objects created for LBG.
 */
var LBGM = window.LBGM || {};

/**
 * @namespace Browser feature detection for touch
 */

LBGM.browserFeatures = window.LBGM.browserFeatures || {};

    LBGM.browserFeatures.touchSupported = false;

    LBGM.browserFeatures.advanceSniff   = function () {
        if ('ontouchstart' in window) {
            LBGM.browserFeatures.touchSupported = true;
        }
    };

LBGM.tools = window.LBGM.tools || {};

    // Add class to body to identify presence of JS
    LBGM.tools.addTouchClass = function () {
        this.addClass(document.querySelector('body'), 'touch');
    };

    /* Mapping event to device & patforms */
    // Desktop by default for testing only
    LBGM.tools.startEvent   = 'mousedown';
    LBGM.tools.moveEvent    = 'mousemove';
    LBGM.tools.endEvent     = 'mouseup';
    LBGM.tools.clickEvent   = 'click';
    LBGM.tools.resizeEvent  = 'resize';

    // Change to has touch event to windows phone 8 or iOS/Android
    LBGM.tools.setTouchEventObjects = function () {
        if (window.navigator.msPointerEnabled) {
            LBGM.tools.updateMSPointerEventObjects();
        }
        else {
            LBGM.tools.updateWebKitEventObjects();
        }
    };

    // Android & iOS
    LBGM.tools.updateWebKitEventObjects = function () {
        LBGM.tools.startEvent  =   'touchstart';
        LBGM.tools.moveEvent   =   'touchmove';
        LBGM.tools.endEvent    =   'touchend';
        LBGM.tools.clickEvent  =   'touchend';
        LBGM.tools.resizeEvent =   'orientationchange';
    };

    // Windows phone 8
    LBGM.tools.updateMSPointerEventObjects = function () {
        LBGM.tools.startEvent  = 'MSPointerDown';
        LBGM.tools.moveEvent   = 'MSPointerMove';
        LBGM.tools.endEvent    = 'MSPointerUp';
        LBGM.tools.clickEvent  = 'MSPointerUp';
    };


/**
 * @namespace Swipe navigation
 */
LBGM.swipeNavigation = {
    init : function() {
        var swipeNavigationContainers = document.querySelectorAll('div.swipeNavigation'),
            swipeNavigationContainerLength = swipeNavigationContainers.length;

        for( var i = 0 ; i < swipeNavigationContainerLength; i++){
            LBGM.swipeNavigationItem().createSwipeNavigation(swipeNavigationContainers[i]);
        }
    }
};

/**
 * @namespace Swipe navigation for individual menu items
 */
LBGM.swipeNavigationItem = function() {

    return {

        createSwipeNavigation: function (element) {
            // element references
            this.wrapper        = element;
            this.form           = null;
            this.select         = null;
            this.options        = null;
            this.optionsLength  = null;
            // injected element references
            this.scroller       = null;
            this.buttonPrev     = null;
            this.buttonNext     = null;
            // scroller unorder list items
            this.items          = null;
            this.itemsLength    = null;
            this.itemsIndex     = null;
            // scrolling bounds
            this.boundsLeft     = null;
            this.boundsRight    = null;
            // starting touch x location, the current scroller position, the event start time
            // and slide animation interval timer for the scrolling events
            this.startPageX     = null;
            this.startPosX      = null;
            this.startTime      = null;
            this.endPageX       = null;

            // if the wrapper has been found, start dom injection
            if (this.wrapper) {
                this.injectScroller();
            }
        },

        getTouch: function (e) {
            return (e.type.indexOf('touch') !== -1) ? e.touches[0] : e;
        },

        getCenter: function (elm) {
            return this.getWidth(elm) / 2;
        },

        getWidth: function (elm) {
            return elm.offsetWidth;
        },

        getLeft: function (elm) {
            return elm.offsetLeft;
        },

        handlerTouchStart: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var touch = this.getTouch(e),
                left;

            // store the starting touch x location, the current scroller position and the event start time (as a number)
            this.startPageX = touch.pageX;
            this.endPageX   = touch.pageX;
            this.startPosX  = this.scroller.offsetLeft;
            this.startTime  = Number(new Date());
            left = this.startPosX + (touch.pageX - this.startPageX);

            this.scroller.style.cssText = 'left:' + left + 'px';

            // bind events to the document to allow for touch detection outside of the wrapper bounding box
            this.wrapper.addEventListener(LBGM.tools.moveEvent, this.handlerTouchMove.bind(this), false);
            this.wrapper.addEventListener(LBGM.tools.endEvent, this.handlerTouchEnd.bind(this), false);

            return false;
        },

        handlerTouchMove: function (e) {
            e.preventDefault();

            var touch   = this.getTouch(e),
                left    = this.startPosX + (touch.pageX - this.startPageX);
            this.endPageX = touch.pageX;

            this.scroller.style.cssText = 'left:' + left + 'px';

            return false;
        },

        handlerTouchEnd: function (e) {
            e.preventDefault();

            var left = parseInt(this.scroller.style.left, 10),
                endTime = Number(new Date()),
                speed = (this.startPageX - this.endPageX) / (this.startTime - endTime);

            if (Math.abs(speed) > 0.25 || (left > this.boundsLeft || left < this.boundsRight)) {
                this.move(this.scroller, speed);
            }

            // remove the bound scroll events from the document
            this.wrapper.removeEventListener(LBGM.tools.moveEvent, this.handlerTouchMove.bind(this), false);
            this.wrapper.removeEventListener(LBGM.tools.endEvent, this.handlerTouchEnd.bind(this), false);

            return false;
        },

        handlerSubmitAction: function (e) {
            e.preventDefault();

            if (this.startPageX === this.endPageX) {
                this.select.selectedIndex = this.getAttribute('data-optionIndex');
                LBGM.events.trigger('submit', this.form);
            }
        },

        move: function (obj, speed) {
            var left = this.getLeft(obj),
                time = 400,
                target = left + (speed * time);

            if (target > this.boundsLeft) {
                target = this.boundsLeft;
            }
            if (target < this.boundsRight) {
                target = this.boundsRight;
            }

            var def = time + 'ms left ease-out; left:' + target + 'px;';
            obj.style.cssText = '-webkit-transition: ' + def + '-moz-transition' + def + '-ms-transition' + def + 'transition' + def;
        },

        // update global vars - scrolling bounds
        getBounds: function () {
            this.boundsLeft  = this.getCenter(this.wrapper) - this.getCenter(this.items[0]);
            this.boundsRight = this.getWidth(this.wrapper) - this.getWidth(this.scroller) - this.getCenter(this.wrapper) + this.getCenter(this.items[this.itemsLength - 1]);
        },

        injectScroller: function () {
            var item, link, hiddenField, submitAction, i;

            // update global vars - dom elements
            this.form           = this.wrapper.querySelector('form');
            this.select         = this.wrapper.querySelector('select');
            this.options        = this.select.querySelectorAll('option');
            this.optionsLength  = this.options.length;
            submitAction        = this.wrapper.querySelector('input.submitAction');

            // Create a hiidden field with the sumbit values
            hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('value', submitAction.getAttribute('value'));
            hiddenField.setAttribute('name', submitAction.getAttribute('name'));

            // update global vars - dom injection elements;
            this.scroller = document.createElement('ul');
            this.buttonPrev = document.createElement('span');
            this.buttonNext = document.createElement('span');

            // loop to create a new list item and link for each option in the select
            for (i = 0; i < this.optionsLength; i++) {
                item = document.createElement('li');
                link = document.createElement('a');

                // if the option is pre-selected, add the 'current'	class to the list item
                if (this.options[i].getAttribute('selected')) {
                    item.setAttribute('class', 'current');
                }

                // update the related option link (store the index of the option - used to update the form select before submit)
                link.innerHTML = this.options[i].text;
                link.setAttribute('data-optionIndex', i);
                link.addEventListener(LBGM.tools.clickEvent, this.handlerSubmitAction.bind(this), false);

                // add the link to the list item, and the list item to the scrollers unordered list
                item.appendChild(link);
                this.scroller.appendChild(item);
            }

            // add the scrollers unordered list to the form element
            this.form.appendChild(this.scroller);
            this.form.appendChild(hiddenField);


            // only add the navigation controls if there's more than 1 option available
            if (this.optionsLength > 1) {
                // create the previous button
                this.buttonPrev.setAttribute('class', 'scrollLeft');
                // create the next button
                this.buttonNext.setAttribute('class', 'scrollRight');
                // add the next and previous buttons to the form element
                this.form.appendChild(this.buttonPrev);
                this.form.appendChild(this.buttonNext);
            }

            // set up the scrolling functionality
            this.setupScroller();
        },

        setupScroller: function () {
            var item, left, i;

            // update global vars - scroller unorder list items
            this.items = this.scroller.querySelectorAll('li');
            this.itemsLength = this.items.length;
            this.itemsIndex = 0;

            this.getBounds();

            // set the start position of the scroller to the list item with the current class
            for (i = 0; i < this.itemsLength; i++) {

                if (LBGM.tools.hasClass(this.items[i], 'current')) {
                    this.itemsIndex = i;
                    break;
                }
            }

            item = this.items[this.itemsIndex];

            // workaround for android bug - http://code.google.com/p/android/issues/detail?id=12455
            // set position for item?
            window.setTimeout(function(ctx) { return function () {
                left = ctx.getCenter(ctx.wrapper) - ctx.getCenter(item) - item.offsetLeft;
                ctx.scroller.style.left = left + 'px';
            }}(this), 30);

            // bind events only if there's more than 1 option available
            if (this.optionsLength > 1) {
                this.wrapper.addEventListener(LBGM.tools.startEvent, this.handlerTouchStart.bind(this), false);
                window.addEventListener(LBGM.tools.resizeEvent, this.getBounds.bind(this), false);
            }
        }
    }
};

/**
 * @namespace Get JSON data
 */
LBGM.ajax = {
    _create: function(dataUrl, requestType, successCallback, failureCallback) {
        var action = requestType || 'GET',
            xhr = new window.XMLHttpRequest(),
            data;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    data = /^\s*$/.test(xhr.responseText) ? null : xhr.responseText;
                    successCallback(data, xhr.status, xhr);
                }
                else {
                    failureCallback(data, xhr.status, xhr);
                }
            }
        };

        xhr.open(action, dataUrl, true);
        xhr.send(null);
    },
    get: function(dataUrl, successCallback, failureCallback) {
        LBGM.ajax._create(dataUrl, 'get', function(data, status, xhr) {
            if (typeof successCallback !== 'undefined') {
                successCallback(data, status, xhr);
            }
        }, function(data, status, xhr) {
            if (typeof failureCallback !== 'undefined') {
                failureCallback(data, status, xhr);
            }
        });
    },
    post: function(dataUrl, successCallback, failureCallback) {
        LBGM.ajax._create(dataUrl, 'post', function(data, status, xhr) {
            if (typeof successCallback !== 'undefined') {
                successCallback(data, status, xhr);
            }
        }, function(data, status, xhr) {
            if (typeof failureCallback !== 'undefined') {
                failureCallback(data, status, xhr);
            }
        });
    },
    getJSON: function(dataUrl, successCallback, failureCallback) {
        LBGM.ajax._create(dataUrl, 'get', function(data, status, xhr) {
            if (typeof successCallback !== 'undefined') {
                if(data !== null) {
                    successCallback(JSON.parse(data), status, xhr);
                    return;
                }

                if (typeof failureCallback !== 'undefined') {
                    failureCallback(data, status, xhr);
                }
            }
        }, function(data, status, xhr) {
            if (typeof failureCallback !== 'undefined') {
                failureCallback(data, status, xhr);
            }
        });
    }
};

/**
 * @namespace To display and activation Smart Rewards Offers
 */
LBGM.offerManipulation = {

    init: function () {
        var srOffersContainer   = document.querySelector('.smartRewardsOffers'),
            srBalanceDetails    = document.querySelector('.rewardAccountItem'),
            statementContainer  = document.querySelector('.statement');

        /* Get offer date if offer class is in page */
        if (srOffersContainer) {
            LBGM.offerManipulation.getOfferData();
        }
        /* Get offer balance details on account overview page */
        if (srBalanceDetails) {
            LBGM.offerManipulation.getOfferBalanceDetails();
        }
    },
    activationCounter: 0,
    getOfferData: function () {
        LBGM.ajax.getJSON(
            DI.lang.smartReward.miniStatement.ajax.url,
            LBGM.offerManipulation.getOffers
        );
    },
    getOfferBalanceDetails: function ()  {
        LBGM.ajax.getJSON(
            DI.lang.accountOverview.ajax.url,
            LBGM.offerManipulation.showOfferBalanceDetails,
            LBGM.offerManipulation.getOfferBalanceDetailsError
        );
    },
    showOfferBalanceDetails: function (data, status, element)  {
        var earnedContainer     = document.createElement('p'),
            offerMessageEnd     = document.createElement('strong'),
            cashbackContainer   = document.querySelector('.rewardAccountItem p.cashback'),
            numberEarning       = data.cashbackAvailableOffers.earning,
            messageEarning      = DI.lang.accountOverview.ajax.messages.earned,
            numberOffers        = data.cashbackAvailableOffers.availableOffers;

        /* Check if cashback paragraph exist */
        if (cashbackContainer) {
            /* Create earning html & add cashback value */
            if (numberEarning.length !== 0 && messageEarning.length !== 0) {
                offerMessageEnd.innerHTML = numberEarning;
                earnedContainer.innerHTML = messageEarning + ' ';
                earnedContainer.appendChild(offerMessageEnd);
                cashbackContainer.parentNode.appendChild(earnedContainer);
            }

            /* Insert number of cashback to cashback paragraph */
            if (numberOffers !== 0) {
                cashbackContainer.querySelector('a').insertAdjacentHTML( 'afterBegin', numberOffers + ' ');
            }
        }
    },
    getOfferBalanceDetailsError: function ()  {
        var errorContainer  = document.createElement('div'),
            errorMsg        = document.createElement('p');

        /* Building Error html elemnet */
        errorMsg.innerHTML = DI.lang.accountOverview.ajax.messages.error;
        errorMsg.setAttribute('class', 'msgP');
        errorContainer.appendChild(errorMsg);
        errorContainer.setAttribute('class', 'msgInfo');
        document.querySelector('.rewardAccountItem div').appendChild(errorContainer);
    },
    addOfferActivationError: function (element, errorWrapper, offerList, errorMsg) {
        var errorP          = document.createElement('p'),
            offerListLength = offerList.length,
            elementList     = element.parentNode.parentNode,
            listItemParent  = elementList.parentNode,
            errorID         = document.getElementById('offerActivatedErrorMessage');

        /* Remove error li if it exists */
        if (errorID) { errorID.parentNode.removeChild(errorID);  }

        /* Create error li */
        errorP.innerHTML = errorMsg;
        errorWrapper.setAttribute('id', 'offerActivatedErrorMessage');
        errorWrapper.setAttribute('class', 'offerError');
        errorWrapper.appendChild(errorP);

        /* Loop thought the offer list and add error before selected offer */
        for (var i = 0; i < offerListLength; i += 1) {
            if (offerList[i] === elementList) {
                listItemParent.insertBefore(errorWrapper, offerList[i]);
                break;
            }
        }
    },
    getOffers: function (data){
        var offerObj         = data.cashbackOfferData,
            creditList       = document.querySelectorAll('p.credit, p.creditCC, p.debit, p.debitCC'),
            creditListLength = creditList.length,
            dateText         = DI.lang.smartReward.miniStatement.ajax.messages.datePre + ' ';

        for (var i = 0; i < creditListLength; i += 1) {
            /* Loop thought the offer list to find offer ID's */
            var offerID = creditList[i].getElementsByTagName('input').length
                        ? creditList[i].getElementsByTagName('input')[0].value
                        : null;
            
            if (offerID) {
                if (offerObj[offerID]) {
                    var offerData = offerObj[offerID],
                    hasExpiryActual     = typeof offerData.expiryDate.actual === 'string' && offerData.expiryDate.actual !== '',
                    hasExpiryRemaining  = typeof offerData.expiryDate.remaining === 'string' && offerData.expiryDate.remaining !== '',
                    isAngelDelight      = offerData.offerType && typeof offerData.offerType === 'string' && offerData.offerType == 'ANGELDELIGHT',
                    offerWrapper        = document.createElement('div'),
                    offerMessage        = document.createElement('p'),
                    offerUrl            = offerData.offerUrl,
                    offerExpiryWrapper,
                    offerExpiryButton,
                    offerStatusClassName = 'offer ' + offerData.status + 'Icon';

                    // Create offers wrapper
                    offerWrapper.setAttribute('data-offer-id', offerID);
                    offerWrapper.setAttribute('data-link-href', offerUrl); /* Add show detail link */
                    offerWrapper.setAttribute('class', offerStatusClassName);

                    /* Add click event, link to show detail page */
                    if (offerData.status !== 'new') {
                        offerWrapper.addEventListener('click', LBGM.sectionHotspot.standardActivation, false);
                    }

                    // create the offer message
                    offerMessage.innerHTML = offerData.message.pre;
                    offerWrapper.appendChild(offerMessage);

                    // append the expiry date (actual or remaining)
                    if ((offerData.status === 'new' || offerData.status === 'active') && (hasExpiryActual || hasExpiryRemaining)) {
                        offerExpiryWrapper = document.createElement('p');

                        // add use offer button
                        if (offerData.status === 'new') {
                            offerExpiryButton = document.createElement('a');
                            offerExpiryButton.setAttribute('href', offerData.activationUrl);
                            offerExpiryButton.setAttribute('class', 'lnkLev1 activate');
                            offerExpiryButton.innerHTML = offerData.message.button;
                            offerExpiryWrapper.appendChild(offerExpiryButton);
                        }

                        if (!isAngelDelight) {
                            if (hasExpiryActual) {
                                offerExpiryWrapper.innerHTML += ' ' + dateText + '<strong>' + offerData.expiryDate.actual + '</strong>';
                            } else if (hasExpiryRemaining) {
                                offerExpiryWrapper.setAttribute('class', 'expiring');
                                offerExpiryWrapper.innerHTML += ' ' + offerData.expiryDate.remaining;
                            }
                        }

                        offerWrapper.appendChild(offerExpiryWrapper);
                    }

                    LBGM.tools.insertAfter(creditList[i], offerWrapper);
                    LBGM.offerManipulation.addEventsStatementOffers();
                }
            }
        }
    },
    addEventsStatementOffers: function () {
        this.offerList       = document.querySelectorAll('.smartRewardsOffers .offer  a.activate');
        this.offerListLength = this.offerList.length;

        if(this.offerListLength > 0) {
            for (var i = 0; i < this.offerListLength; i++) {
               this.offerList[i].setAttribute('data-index', i);
            }
        }
    },
    
    statementOfferActivatedSuccess: function (data, status, element) {
        if (data.isSucceed === 'true') {
            var parentContainter = element.parentNode.parentNode,
                errorID          = document.getElementById('offerActivatedErrorMessage');

            /* Remove error li if it exists */
            if (errorID) { errorID.parentNode.removeChild(errorID);  }

            /* Change the icon to show offer is activated */
            LBGM.tools.removeClass(parentContainter, 'newIcon');
            LBGM.tools.addClass(parentContainter, 'activeIcon');
            element.parentNode.removeChild(element);

            /* Add click event this links to show detail page */
            parentContainter.addEventListener('click', LBGM.sectionHotspot.standardActivation, false);
        }
        else {
            LBGM.offerManipulation.statementOfferActivationError(status, element);
        }
    },
    statementOfferActivationError: function (status, element) {
        var errorWrapper    = document.createElement('div'),
            offerList       = document.querySelectorAll('.smartRewardsOffers .offer'),
            errorMsg        = DI.lang.smartReward.miniStatement.ajax.messages.error;

        LBGM.offerManipulation.addOfferActivationError(element, errorWrapper, offerList, errorMsg);
    }
};

// ensure we have support for 'addEventListener' 
if (document.addEventListener) {
    // To Add extra feature checks
    LBGM.browserFeatures.advanceSniff();

    // add the following to the LBGM.ready listeners array (only if required features are supported)
    // note: the LBGM.browserFeatures checker is run from the 'global.js'
    if (LBGM.browserFeatures.supported) {
        LBGM.ready.addListener(function () {
            LBGM.tools.setTouchEventObjects();

            if (LBGM.browserFeatures.touchSupported) {
                LBGM.tools.addTouchClass();
                LBGM.swipeNavigation.init();
            }
            LBGM.offerManipulation.init();
        });
    }
}