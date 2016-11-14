Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createOrchestrator=require('./createOrchestrator');Object.defineProperty(exports,'createOrchestrator',{enumerable:true,get:function get(){return _interopRequireDefault(_createOrchestrator).



default;}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}} // HACK global.__BUNDLE_START_TIME__ is only present in
// React Native
var __WEB__=!global.__BUNDLE_START_TIME__&&window.location.pathname;var push=exports.push=function push(fragment){return {type:'NAV_PUSH',fragment:fragment};};
var pop=exports.pop=function pop(){return {type:'NAV_POP'};};
var replace=exports.replace=function replace(fragment){return {type:'NAV_REPLACE',fragment:fragment};};
var reset=exports.reset=function reset(stack){return {type:'NAV_RESET',stack:stack};};
var back=exports.back=function back(reduxOnly){return {type:'NAV_BACK',reduxOnly:reduxOnly};};
var forward=exports.forward=function forward(reduxOnly){return {type:'NAV_FORWARD',reduxOnly:reduxOnly};};

var attachHistoryModifiers=exports.attachHistoryModifiers=function attachHistoryModifiers(_ref,_ref2){var getState=_ref.getState;var dispatch=_ref.dispatch;var BackAndroid=_ref2.BackAndroid;
if(__WEB__){
window.onpopstate=function(_ref3){var state=_ref3.state;
var newIndex=state&&state.index||0;
var lastIndex=getState().navigation.index;
if(newIndex<=lastIndex)dispatch(back(true));
if(newIndex>lastIndex)dispatch(forward(true));};}


if(BackAndroid){
BackAndroid.addEventListener('hardwareBackPress',function(){var 
index=getState().navigation.index;
if(index===0)return false;
dispatch(back());
return true;});}};




function makeStackFromPathname(pathname){
var pathArray=pathname.split('/');
pathArray.shift();
pathArray[pathArray.length-1]===''&&pathArray.pop();
return pathArray;}


var initialState={history:[[]],index:0};
if(__WEB__)initialState.history[0]=makeStackFromPathname(location.pathname);exports.default=

function(){var state=arguments.length<=0||arguments[0]===undefined?initialState:arguments[0];var action=arguments[1];
var stack=state.history[state.index];
var nextStack=void 0;
switch(action.type){
case 'NAV_PUSH':nextStack=[].concat(_toConsumableArray(stack),[action.fragment]);break;
case 'NAV_POP':nextStack=stack.slice(0,stack.length-1);break;
case 'NAV_REPLACE':nextStack=state.splice(stack.length-1,1,action.fragment);break;
case 'NAV_RESET':nextStack=action.stack||[];break;

case 'NAV_BACK':
// If action.stateOnly is set, don't call history.back()
if(__WEB__&&!action.reduxOnly)history.back();
// If we're at index 0 and there's still pushstate history in the browser
if(__WEB__&&state.index===0){
var newHistory=[].concat(_toConsumableArray(state.history));
newHistory.splice(0,0,makeStackFromPathname(location.pathname));
return {index:0,history:newHistory};}

if(state.index===0)return state;
return _extends({},state,{index:state.index-1});
case 'NAV_FORWARD':
if(__WEB__&&!action.reduxOnly)history.forward();
// If we're at the last index and there's still pushstate history in the browser
if(__WEB__&&state.index===state.history.length-1){
var _newHistory=state.history.concat([makeStackFromPathname(location.pathname)]);
return {index:state.index+1,history:_newHistory};}

if(state.index===state.history.length-1)return state;
return _extends({},state,{index:state.index+1});
default:return state;}


var nextState={
index:state.index+1,
history:state.history.slice(0,state.index+1).concat([nextStack])};


__WEB__&&history.pushState(nextState,null,nextStack.join('/'));
return nextState;};