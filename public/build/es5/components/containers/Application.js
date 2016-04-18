"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var store = _interopRequire(require("../../stores/store"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var api = _interopRequire(require("../../api/api"));

var Loader = _interopRequire(require("react-loader"));

var Application = (function (Component) {
	function Application(props, context) {
		_classCallCheck(this, Application);

		_get(Object.getPrototypeOf(Application.prototype), "constructor", this).call(this, props, context);
		this.updateApplication = this.updateApplication.bind(this);
		this.submitApplication = this.submitApplication.bind(this);
		this.state = {
			showLoader: false,
			application: {
				name: "",
				email: "",
				phone: "",
				course: "ios intensive",
				goal: "",
				history: ""
			}
		};
	}

	_inherits(Application, Component);

	_prototypeProperties(Application, null, {
		updateApplication: {
			value: function updateApplication(event) {
				console.log("updateUserApplication: " + event.target.id);
				event.preventDefault();


				var updatedApplication = Object.assign({}, this.state.application);
				updatedApplication[event.target.id] = event.target.value;
				this.setState({
					application: updatedApplication
				});
			},
			writable: true,
			configurable: true
		},
		submitApplication: {
			value: function submitApplication(event) {
				event.preventDefault();
				console.log("submitApplication: " + JSON.stringify(this.state.application));

				this.setState({
					showLoader: true
				});

				var _this = this;
				api.handlePost("/api/application", this.state.application, function (err, response) {
					//			console.log('RESPONSE: '+JSON.stringify(response));
					_this.setState({
						showLoader: false
					});

					if (err) {
						alert(err.message);
						return;
					}

					alert(response.message);
				});

			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Sidebar, null),
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(
						"section",
						{ id: "content", style: { background: "#f9f9f9" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent bothsidebar nobottommargin" },
									React.createElement(
										"h3",
										null,
										"Application"
									),
									React.createElement("hr", null),
									React.createElement(
										"div",
										{ className: "contact-widget" },
										React.createElement("div", { className: "contact-form-result" }),
										React.createElement(
											"form",
											{ className: "nobottommargin", id: "template-contactform", name: "template-contactform", action: "", method: "post" },
											React.createElement("div", { className: "form-process" }),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-name" },
													"Name"
												),
												React.createElement("input", { type: "text", onChange: this.updateApplication, id: "name", value: this.state.application.name, name: "template-contactform-name", className: "sm-form-control required" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-email" },
													"Email"
												),
												React.createElement("input", { type: "email", onChange: this.updateApplication, id: "email", value: this.state.application.email, name: "template-contactform-email", className: "required email sm-form-control" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-phone" },
													"Phone"
												),
												React.createElement("input", { type: "text", onChange: this.updateApplication, id: "phone", value: this.state.application.phone, name: "template-contactform-phone", className: "sm-form-control" })
											),
											React.createElement("div", { className: "clear" }),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-subject" },
													"Course"
												),
												React.createElement(
													"select",
													{ onChange: this.updateApplication, value: this.state.application.course, id: "course", className: "form-control input-lg not-dark" },
													React.createElement(
														"option",
														{ value: "ios intensive" },
														"iOS Intensive"
													),
													React.createElement(
														"option",
														{ value: "web intensive" },
														"Web Intensive"
													),
													React.createElement(
														"option",
														{ value: "ios hs course" },
														"iOS HS Course"
													),
													React.createElement(
														"option",
														{ value: "web hs course" },
														"Web HS Course"
													),
													React.createElement(
														"option",
														{ value: "ios bootcamp" },
														"iOS Bootcamp"
													),
													React.createElement(
														"option",
														{ value: "web bootcamp" },
														"Web Bootcamp"
													)
												)
											),
											React.createElement("div", { className: "clear" }),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-message" },
													"What is your goal in technology for the next 6 to 12 months?"
												),
												React.createElement("textarea", { onChange: this.updateApplication, value: this.state.application.goal, className: "required sm-form-control", id: "goal", name: "template-contactform-message", rows: "6", cols: "30" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-message" },
													"What have your worked on so far? (GitHub, side projects, etc.)"
												),
												React.createElement("textarea", { onChange: this.updateApplication, value: this.state.application.history, className: "required sm-form-control", id: "history", name: "template-contactform-message", rows: "6", cols: "30" })
											),
											React.createElement(
												"div",
												{ className: "col_full hidden" },
												React.createElement("input", { type: "text", id: "template-contactform-botcheck", name: "template-contactform-botcheck", value: "", className: "sm-form-control" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"a",
													{ onClick: this.submitApplication, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
													"Submit"
												)
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

	return Application;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));

	return {
		currentUser: state.profileReducer.currentUser,
		loaderOptions: state.staticReducer.loaderConfig
	};
};


module.exports = connect(stateToProps)(Application);