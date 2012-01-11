/**
 * Knockout Raty Binding
 * Raty: http://www.wbotelhos.com/raty/
 *
 */
(function($, ko) {
	var isObject = function(obj) { return (typeof obj === typeof {}); };
	var isFunction = function(func) { return (Object.prototype.toString.call(func) === "[object Function]"); };

	ko.bindingHandlers['raty'] = {
		'init': function(element, valueAccessor)
		{
			var options = {};
			var value = valueAccessor();

			value = isObject(value) ? value : {};


			if('rating' in value)
			{
				var rating = value['rating'];
				var click = !!value['click'] ? value['click'] : function(score, evt){};
				var start = !!value['start'] ? value['start'] : ko.utils.unwrapObservable(rating);
				
				value['start'] = start;
				value['click'] = !ko.isWriteableObservable(rating) ? click : function(score, evt)
				{
					rating(score);
					click.call(this, score, evt)
				};
			}

			for(key in value)
			{
				val = value[key];
				options[key] = ko.utils.unwrapObservable(val);
			};

			$(element).raty(options);
		},

		'update': function(element, valueAccessor)
		{
			var value = valueAccessor();

			if('rating' in value)
				$(element).raty('click', ko.utils.unwrapObservable(value['rating']));

			if('readOnly' in value)
				$(element).raty('readOnly', ko.utils.unwrapObservable(value['readOnly']));
		}
	};
})($, ko);