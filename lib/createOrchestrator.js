Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/createOrchestrator.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

function makeStackFromPathname(pathname){
var pathArray=pathname.split('/');
if(pathArray.length>1)pathArray.shift(); // Remove first blank ""
return pathArray;}exports.default=


function(component){
var ComposedComponent=component;

// Handle stateless components
if(!ComposedComponent.render&&!ComposedComponent.prototype.render){
ComposedComponent=function(_Component){_inherits(ComposedComponent,_Component);function ComposedComponent(){_classCallCheck(this,ComposedComponent);return _possibleConstructorReturn(this,Object.getPrototypeOf(ComposedComponent).apply(this,arguments));}_createClass(ComposedComponent,[{key:'render',value:function render()
{
return component(this.props,this.context);}}]);return ComposedComponent;}(_react.Component);}var 




Route=function(_Component2){_inherits(Route,_Component2); // eslint-disable-line react/no-multi-comp
function Route(props,context){_classCallCheck(this,Route);var _this2=_possibleConstructorReturn(this,Object.getPrototypeOf(Route).call(this,
props,context));
(0,_invariant2.default)(context.store,
'Couldn\'t find the store on the context. '+
'Make sure you have a redux <Provider> at the top '+
'of your app.');

(0,_invariant2.default)(context.store.getState().navigation,
'Couldn\'t find the navigation reducer on the store. '+
'Make sure you have react-stack-nav\'s reducer on '+
'your root reducer.');


_this2.updateFromStore();return _this2;}_createClass(Route,[{key:'getChildContext',value:function getChildContext()


{
return {navigationStack:this.navigationStack.slice(1,this.navigationStack.length)};}},{key:'componentDidMount',value:function componentDidMount()


{var _this3=this;
// Reset navigation stack when store changes
this.context.store.subscribe(function(){return _this3.updateFromStore(true);});}},{key:'updateFromStore',value:function updateFromStore(


forceUpdate){
var state=this.context.store.getState();
this.index=state.navigation.index;
// Default to redux store for stack if this is the first
// route and the navStack hasn't been set yet
this.navigationStack=
this.context.navigationStack||
makeStackFromPathname(state.navigation.history[this.index].url);

forceUpdate&&this.forceUpdate();}},{key:'render',value:function render()


{
return (
_react2.default.createElement(ComposedComponent,_extends({},
this.props,{
routeFragment:this.navigationStack[0],__source:{fileName:_jsxFileName,lineNumber:62}})));}}]);return Route;}(_react.Component);




Route.displayName='Orchestrator('+(
_react.Component.displayName||_react.Component.name||'Component')+')';

Route.contextTypes=_extends({},
Route.contextTypes,{
store:_react.PropTypes.object,
navigationStack:_react.PropTypes.array});


Route.childContextTypes=_extends({},
Route.childContextTypes,{
navigationStack:_react.PropTypes.array});


return Route;};module.exports=exports['default'];