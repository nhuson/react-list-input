export default (function (name, obj) {
  console.groupCollapsed(name);
  console.log(obj);
  console.groupEnd();
});