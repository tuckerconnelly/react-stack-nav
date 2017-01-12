Object.defineProperty(exports,"__esModule",{value:true});exports.default=






attachHistoryModifiers;var _urlParse=require('url-parse');var _urlParse2=_interopRequireDefault(_urlParse);var _navigation=require('./navigation');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};} // HACK global.__BUNDLE_START_TIME__ is only present in React Native
var __WEB__=!global.__BUNDLE_START_TIME__&&window.location.pathname;function attachHistoryModifiers(){var _ref=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var BackAndroid=_ref.BackAndroid;var Linking=_ref.Linking;return function(createStore){return function(reducer,preloadedState,enhancer){
var store=createStore(reducer,preloadedState,enhancer);var 
dispatch=store.dispatch;var getState=store.getState;

if(__WEB__){
window.onpopstate=function(_ref2){var state=_ref2.state;
var newIndex=getState().navigation.history.
map(function(s){return s.stateObj.index;}).
indexOf(state.index);
var lastIndex=getState().navigation.index;

if(newIndex<=lastIndex)dispatch((0,_navigation.back)(true));
if(newIndex>lastIndex)dispatch((0,_navigation.forward)(true));};}


if(BackAndroid){
BackAndroid.addEventListener('hardwareBackPress',function(){var 
index=store.getState().navigation.index;
if(index===0)return false;
dispatch((0,_navigation.back)());
return true;});}


if(Linking){
Linking.addEventListener('url',function(_ref3){var url=_ref3.url;var _ref4=
new _urlParse2.default(url);var pathname=_ref4.pathname;var query=_ref4.query;var hash=_ref4.hash;
dispatch((0,_navigation.replaceState)(0,0,''+pathname+query+hash));});}



return store;};};}module.exports=exports['default'];