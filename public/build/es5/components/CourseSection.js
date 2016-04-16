"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var CourseSection = (function (Component) {
	function CourseSection() {
		_classCallCheck(this, CourseSection);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(CourseSection, Component);

	_prototypeProperties(CourseSection, null, {
		render: {
			value: function render() {
				var videoThumb = null;
				if (this.props.course.type == "online") {
					if (this.props.unit.index < 1) {
						// always show first video
						videoThumb = React.createElement(
							"div",
							{ className: "wistia_embed wistia_async_" + this.props.unit.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
							" "
						);
					} else if (this.props.accountType == "premium") {
						// premium subscriber
						videoThumb = React.createElement(
							"div",
							{ className: "wistia_embed wistia_async_" + this.props.unit.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
							" "
						);
					} else if (this.props.accountType == "basic" || this.props.accountType == "") {
						videoThumb = React.createElement(
							"div",
							{ style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginTop: 12, marginBottom: 12 } },
							"To view this video, please ",
							React.createElement(
								"a",
								{ style: { color: "red" }, onClick: this.subscribeAction, href: "#" },
								"upgrade"
							),
							" your account to Premium"
						);
					} else {
						// not logged in
						videoThumb = React.createElement(
							"div",
							{ style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginTop: 12, marginBottom: 12 } },
							"Please log in or ",
							React.createElement(
								"a",
								{ style: { color: "red" }, href: "/#register" },
								"register"
							),
							" to view this video."
						);
					}
				}

				return React.createElement(
					"div",
					{ className: "entry clearfix" },
					React.createElement(
						"div",
						{ className: "entry-timeline" },
						"Unit",
						React.createElement(
							"span",
							null,
							this.props.unit.index + 1
						),
						React.createElement("div", { className: "timeline-divider" })
					),
					React.createElement(
						"div",
						{ className: "entry-image" },
						React.createElement(
							"div",
							{ className: "panel panel-default" },
							React.createElement(
								"div",
								{ className: "panel-body", style: { padding: 36 } },
								React.createElement(
									"h2",
									null,
									this.props.unit.topic
								),
								React.createElement("hr", null),
								this.props.unit.description,
								React.createElement("br", null),
								videoThumb
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return CourseSection;
})(Component);

module.exports = CourseSection;