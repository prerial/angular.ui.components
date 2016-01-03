/**
 * @author Simon Tsvilik
 * @require jquery, bindable
 */
(function() {
	'use strict';
	/**
	 * PubSub - This Pubsub implementation is capable of triggering subscribers that attempt to
	 * subscribe to an event that has already happened (Past events) as well as events that will happen in the future.
	 */

	function Pubsub() {
		//Self instantiation (in case you forgot to use 'new' keyword)
		if (!(this instanceof Pubsub)) {
			return new Pubsub();
		}
		this.hub = $.bindable({}); //Make a bindable object (Yes it's heavy, I know)
		this.channels = {}; //Storage for past events
	}
	Pubsub.prototype = {
		/**
		 * Creates a subscriber
		 * @param  {String}   channel Name of the broadcast event
		 * @param  {Function} cb      Callback function
		 */
		subscribe: function(channel, cb) {
			//If event has already occured, then just execute the callback immediately
			if (this.channels[channel]) {
				this.channels[channel].done(cb);
			}
			//Bind to future events
			this.hub.bind(channel, cb);
			return this;
		},
		/**
		 * Publishes an event on speciffic channel
		 */
		publish: function() {
			var args = APS.apply(arguments),
				channel = args.slice(0, 1)[0],
				data = args.slice(1);
			//Save channel data for future subscriptions
			this.channels[channel] = $.Deferred().resolveWith(window, data).promise();
			//Trigger current subscriptions
			this.hub.trigger.apply(this.hub, arguments);
			return this;
		},
		unsubscribe: function(channel) {
			if (channel) {
				delete this.channels[channel];
			}
			this.hub.off.apply(this.hub, arguments);
		}
	};
	Pubsub.prototype.on = Pubsub.prototype.subscribe;
	Pubsub.prototype.off = Pubsub.prototype.unsubscribe;
	Pubsub.prototype.trigger = Pubsub.prototype.publish;

	$.Pubsub = $.Pubsub || Pubsub;
})();