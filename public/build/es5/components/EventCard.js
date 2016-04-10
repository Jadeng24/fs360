"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var EventCard = (function (Component) {
	function EventCard(props, context) {
		_classCallCheck(this, EventCard);

		_get(Object.getPrototypeOf(EventCard.prototype), "constructor", this).call(this, props, context);
		this.selectEvent = this.selectEvent.bind(this);
	}

	_inherits(EventCard, Component);

	_prototypeProperties(EventCard, null, {
		selectEvent: {
			value: function selectEvent(event) {
				event.preventDefault();
				var cbk = this.props.click;
				cbk(event);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "entry clearfix", style: { marginBottom: 24, border: "1px solid #ddd" } },
					React.createElement(
						"div",
						{ className: "entry-image" },
						React.createElement("img", { style: { border: "1px solid #ddd", background: "#fff" }, src: "/images/" + this.props.event.image, alt: this.props.event.subject })
					),
					React.createElement(
						"div",
						{ className: "entry-c" },
						React.createElement(
							"div",
							{ className: "entry-title" },
							React.createElement(
								"h2",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									this.props.event.subject
								)
							)
						),
						React.createElement(
							"ul",
							{ className: "entry-meta clearfix" },
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("i", { className: "icon-calendar" }),
									" ",
									this.props.event.date
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("i", { className: "icon-time" }),
									" ",
									this.props.event.time
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("i", { className: "icon-map-marker2" }),
									" 27 East 28th Street, NYC"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "entry-content" },
							this.props.event.description,
							React.createElement("br", null),
							React.createElement("br", null),
							React.createElement(
								"a",
								{ id: this.props.event.id, onClick: this.selectEvent, href: "#", className: "btn btn-success" },
								"RSVP"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return EventCard;
})(Component);

module.exports = EventCard;