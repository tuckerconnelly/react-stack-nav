Object.defineProperty(exports,"__esModule",{value:true});exports.default=




attachHistoryModifiers;var _navigation=require('./navigation'); // HACK global.__BUNDLE_START_TIME__ is only present in React Native
var __WEB__=!global.__BUNDLE_START_TIME__&&window.location.pathname;function attachHistoryModifiers(_ref){var BackAndroid=_ref.BackAndroid;return function(createStore){return function(reducer,preloadedState,enhancer){
var store=createStore(reducer,preloadedState,enhancer);var 
dispatch=store.dispatch;var getState=store.getState;

if(__WEB__){
window.onpopstate=function(_ref2){var state=_ref2.state;
var newIndex=getState().navigation.history.
map(function(s){return s.index;}).
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



return store;};};}module.exports=exports['default'];