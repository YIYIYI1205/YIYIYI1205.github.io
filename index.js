var o = { prop: 37 }
function independent() {
  return this.prop
}
o.f = independent
console.log(o.f()) // logs 37
o.b = {
  g: independent,
  prop: 42
}
console.log(o.b.g()) // logs 42
