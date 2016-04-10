"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var CourseCard = (function (Component) {
	function CourseCard() {
		_classCallCheck(this, CourseCard);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(CourseCard, Component);

	_prototypeProperties(CourseCard, null, {
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "entry clearfix", style: { background: "#fff", border: "1px solid #ddd", marginBottom: 24 } },
					React.createElement(
						"div",
						{ className: "entry-image" },
						React.createElement("img", { src: "/images/events/thumbs/1.jpg", alt: "Inventore voluptates velit totam ipsa tenetur" })
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
									"iOS Development Course"
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
									React.createElement("i", { className: "icon-time" }),
									" 11:00 - 19:00"
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("i", { className: "icon-map-marker2" }),
									" Melbourne, Australia"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "entry-content" },
							React.createElement(
								"p",
								null,
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, voluptatem, dolorem animi nisi autem blanditiis enim culpa reiciendis et explicabo tenetur voluptate rerum molestiae eaque possimus exercitationem eligendi fuga."
							),
							React.createElement(
								"a",
								{ href: "/course/first-course", className: "btn btn-danger" },
								"Learn More"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return CourseCard;
})(Component);

module.exports = CourseCard;