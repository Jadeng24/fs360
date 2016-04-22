"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Loader = _interopRequire(require("react-loader"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var PostPage = (function (Component) {
	function PostPage(props, context) {
		_classCallCheck(this, PostPage);

		_get(Object.getPrototypeOf(PostPage.prototype), "constructor", this).call(this, props, context);
		this.state = {
			showLoader: false };
	}

	_inherits(PostPage, Component);

	_prototypeProperties(PostPage, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				var url = "/api/post?slug=" + this.props.slug;
				api.handleGet(url, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					console.log(JSON.stringify(response));
					store.dispatch(actions.postsRecieved(response.posts));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var find = "\n";
				var re = new RegExp(find, "g");
				var postHTML = this.props.post.text.replace(re, "<br />");

				return React.createElement(
					"div",
					{ style: { background: "#f5f5f5" } },
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap", style: { background: "#f5f5f5" } },
							React.createElement(
								"div",
								{ className: "entry clearfix" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"div",
										{ className: "heading-block center" },
										React.createElement(
											"h1",
											null,
											this.props.post.title
										),
										React.createElement("img", { style: { border: "1px solid #ddd", background: "#fff", marginTop: 12 }, src: "https://media-service.appspot.com/site/images/" + this.props.post.image + "?crop=260", alt: "FullStack 360" })
									),
									React.createElement(
										"div",
										{ className: "entry-c" },
										React.createElement(
											"ul",
											{ className: "entry-meta clearfix" },
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement("i", { className: "icon-user" }),
													" ",
													this.props.post.profile.name
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
													this.props.post.numReplies,
													" comments"
												)
											)
										),
										React.createElement("br", null),
										React.createElement(
											"div",
											{ className: "entry-content" },
											React.createElement(
												"div",
												{ className: "panel panel-default" },
												React.createElement("div", { dangerouslySetInnerHTML: { __html: postHTML }, style: { padding: 16 }, className: "panel-body" })
											)
										)
									)
								)
							)
						)
					),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return PostPage;
})(Component);

var stateToProps = function (state) {
	var posts = state.postReducer.postsArray;

	return {
		currentUser: state.profileReducer.currentUser,
		post: posts.length == 0 ? state.postReducer.emptyPost : posts[0],
		loaderOptions: state.staticReducer.loaderConfig
	};
};

module.exports = connect(stateToProps)(PostPage);