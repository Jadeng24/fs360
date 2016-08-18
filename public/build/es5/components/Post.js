"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../utils");

var TextUtils = _utils.TextUtils;
var DateUtils = _utils.DateUtils;
var Post = (function (Component) {
	function Post(props, context) {
		_classCallCheck(this, Post);

		_get(Object.getPrototypeOf(Post.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Post, Component);

	_prototypeProperties(Post, null, {
		render: {
			value: function render() {
				var post = this.props.post;
				var timestamp = new Date(post.timestamp);
				var date = DateUtils.formattedDate(timestamp);
				var image = post.image.indexOf("http") == -1 ? "https://media-service.appspot.com/site/images/" + post.image + "?crop=260" : post.image;
				var link = post.link.length == 0 ? React.createElement(
					"a",
					{ href: "/post/" + post.slug },
					post.title
				) : React.createElement(
					"a",
					{ target: "_blank", href: post.link },
					post.title
				);

				return React.createElement(
					"div",
					{ className: "entry clearfix" },
					React.createElement(
						"div",
						{ className: "entry-image" },
						React.createElement("img", { style: { border: "1px solid #ddd", background: "#fff", width: 220 }, className: "image_fade", src: image, alt: "Velocity 360" })
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
								link
							)
						),
						React.createElement(
							"ul",
							{ className: "entry-meta clearfix" },
							React.createElement(
								"li",
								null,
								React.createElement("i", { className: "icon-calendar3" }),
								" ",
								date
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("i", { className: "icon-user" }),
									" ",
									post.profile.name
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "blog-single.html#comments" },
									React.createElement("i", { className: "icon-comments" }),
									" ",
									post.numReplies,
									" comments"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "entry-content" },
							React.createElement(
								"div",
								{ className: "panel panel-default" },
								React.createElement(
									"div",
									{ style: { padding: 16 }, className: "panel-body" },
									TextUtils.truncateText(post.text, 260)
								)
							)
						)
					),
					React.createElement("hr", { style: { padding: 12 } })
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Post;
})(Component);

module.exports = Post;