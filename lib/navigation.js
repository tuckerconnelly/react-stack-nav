Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; // HACK global.__BUNDLE_START_TIME__ is only present in React Native
var __WEB__=!global.__BUNDLE_START_TIME__&&window.location.pathname;

var removeTrailingSlashFromUrl=function removeTrailingSlashFromUrl(url){
var urlParts=url.split('?');
urlParts[0]=urlParts[0].replace(/\/$/,'');
return urlParts.join('?');};


var pushState=exports.pushState=function pushState(stateObj,title,url){return {
type:'HISTORY_PUSH_STATE',
payload:{stateObj:stateObj||{},title:title||'',url:removeTrailingSlashFromUrl(url)}};};

var replaceState=exports.replaceState=function replaceState(stateObj,title,url){return {
type:'HISTORY_REPLACE_STATE',
payload:{stateObj:stateObj||{},title:title||'',url:removeTrailingSlashFromUrl(url)}};};

var back=exports.back=function back(reduxOnly){return {
type:'HISTORY_BACK',
payload:{reduxOnly:reduxOnly}};};

var forward=exports.forward=function forward(reduxOnly){return {
type:'HISTORY_FORWARD',
payload:{reduxOnly:reduxOnly}};};


var initialState={
index:0,
history:[{stateObj:{index:0},title:'',url:''}]};


if(__WEB__){
initialState.history[0].url=removeTrailingSlashFromUrl(location.pathname);
history.replaceState(
initialState.history[0].stateObj,
initialState.history[0].title,
initialState.history[0].url);}exports.default=



function(){var state=arguments.length<=0||arguments[0]===undefined?initialState:arguments[0];var action=arguments[1];
switch(action.type){
case 'HISTORY_PUSH_STATE':{var _action$payload=
action.payload;var stateObj=_action$payload.stateObj;var title=_action$payload.title;var url=_action$payload.url;

if(url===state.history[state.index].url)return state;

var stateObjWithIndex=_extends({},stateObj,{index:state.index+1});

if(__WEB__)history.pushState(stateObjWithIndex,title,url.length?url:'/');
return {
index:state.index+1,
history:state.history.
slice(0,state.index+1).
concat([{stateObj:stateObjWithIndex,title:title,url:url}])};}


case 'HISTORY_REPLACE_STATE':{var _action$payload2=
action.payload;var _stateObj=_action$payload2.stateObj;var _title=_action$payload2.title;var _url=_action$payload2.url;

if(_url===state.history[state.index].url)return state;

var _stateObjWithIndex=_extends({},_stateObj,{index:state.index});

if(__WEB__)history.replaceState(_stateObj,_title,_url.length?_url:'/');
return {
index:state.index,
history:state.history.
slice(0,state.index).
concat([{stateObj:_stateObjWithIndex,title:_title,url:_url}])};}


case 'HISTORY_BACK':
if(state.index===0)return state;

if(__WEB__&&!action.payload.reduxOnly)history.back();
return _extends({},state,{index:state.index-1});

case 'HISTORY_FORWARD':
if(state.index===state.history.length-1)return state;

if(__WEB__&&!action.payload.reduxOnly)history.forward();
return _extends({},state,{index:state.index+1});

default:return state;}};