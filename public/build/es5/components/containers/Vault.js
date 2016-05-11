"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Dropzone = _interopRequire(require("react-dropzone"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseCard = _interopRequire(require("../../components/CourseCard"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Vault = (function (Component) {
	function Vault(props, context) {
		_classCallCheck(this, Vault);

		_get(Object.getPrototypeOf(Vault.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.updateSample = this.updateSample.bind(this);
		this.createSample = this.createSample.bind(this);
		this.state = {
			showModal: false,
			sample: {
				title: "",
				image: "",
				url: "",
				description: "",
				tagString: ""
			}
		};
	}

	_inherits(Vault, Component);

	_prototypeProperties(Vault, null, {
		openModal: {
			value: function openModal() {
				this.setState({
					showModal: true
				});
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({
					showModal: false
				});
			},
			writable: true,
			configurable: true
		},
		updateSample: {
			value: function updateSample(event) {
				event.preventDefault();

				var updatedSample = Object.assign({}, this.state.sample);
				updatedSample[event.target.id] = event.target.value;
				this.setState({
					sample: updatedSample
				});
			},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				var endpoint = "/api/sample";
				api.handleGet(endpoint, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.dispatch(actions.samplesRecieved(response.samples));
				});
			},
			writable: true,
			configurable: true
		},
		createSample: {
			value: function createSample(event) {
				event.preventDefault();
				this.setState({
					showModal: false
				});

				var endpoint = "/api/sample";
				api.handlePost(endpoint, this.state.sample, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.dispatch(actions.sampleCreated(response.sample));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var list = this.props.samples.map(function (sample, i) {
					return React.createElement(
						"div",
						{ key: sample.id, className: "col-sm-6 col-md-4" },
						React.createElement(
							"div",
							{ className: "thumbnail", style: { padding: 12 } },
							React.createElement("img", { alt: "FullStack 360", src: "/images/apple-2.jpg", style: { display: "block" } }),
							React.createElement(
								"div",
								{ className: "caption" },
								React.createElement(
									"h3",
									{ style: { marginBottom: 6 } },
									sample.title
								),
								React.createElement("hr", { style: { marginTop: 0 } }),
								React.createElement(
									"p",
									null,
									sample.description
								),
								React.createElement(
									"a",
									{ href: sample.url, className: "btn btn-primary", role: "button" },
									"Download"
								)
							)
						)
					);
				});

				var btnAddsample = this.props.currentUser.id == null ? null : React.createElement(
					"button",
					{ onClick: this.openModal, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit" },
					"Add Code Sample"
				);


				return React.createElement(
					"div",
					{ style: { background: "#f5f5f5" } },
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap", style: { background: "#f5f5f5" } },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin col_last" },
									React.createElement(
										"div",
										{ className: "entry clearfix" },
										React.createElement(
											"div",
											{ className: "entry-content" },
											React.createElement(
												"div",
												{ className: "col_half" },
												React.createElement(
													"h2",
													{ style: { marginBottom: 16 } },
													"Code Vault"
												),
												btnAddsample
											)
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										list
									)
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal, bsSize: "large" },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h3",
								null,
								"Project"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("input", { onChange: this.updateSample, id: "title", value: this.state.sample.title, className: "form-control", type: "text", placeholder: "Title" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateSample, id: "url", value: this.state.sample.url, className: "form-control", type: "text", placeholder: "http://" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateSample, id: "tagString", value: this.state.sample.tagString, className: "form-control", type: "text", placeholder: "Python, iOS, JavaScript, etc." }),
									React.createElement("br", null),
									React.createElement(
										Dropzone,
										{ style: { width: 100 + "%", marginBottom: 24, background: "#fff", border: "1px dotted #ddd" }, onDrop: this.uploadImage },
										React.createElement(
											"div",
											{ style: { padding: 24 } },
											this.state.sample.image.length == 0 ? null : React.createElement("img", { style: { width: 64, border: "1px solid #ddd", marginRight: 6 }, src: "https://media-service.appspot.com/site/images/" + this.state.sample.image + "?crop=120" }),
											"Drop file here, or click to select image to upload."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("textarea", { onChange: this.updateSample, id: "description", value: this.state.sample.description, className: "form-control", placeholder: "Text", style: { minHeight: 260 } }),
									React.createElement("br", null)
								)
							)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.createSample, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
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

	return Vault;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state.sampleReducer.samplesArray));

	return {
		currentUser: state.profileReducer.currentUser,
		samples: state.sampleReducer.samplesArray
	};
};


module.exports = connect(stateToProps)(Vault);