//?----------fecha---------------------------------
function fecha_Actual() {
  //?generador de fecha */
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let milsec = date.getMilliseconds();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  this.hoyNormal = year + "-" + month + "-" + day;
  this.hoyMySQL = day + "-" + month + "-" + year;
  this.hora = hour + ":" + min;
}
//?-------------------------------------------------

function fechaActual_dd_mm_yyyy() {
  let fecha = new fecha_Actual();
  return fecha.hoyNormal;
}

function fechaActual_yyyy_mm_dd() {
  let fecha = new fecha_Actual();
  return fecha.hoyMySQL;
}
function fecha_dd_mm_yyyy(datex) {
  let day = datex.getUTCDate();
  let month = datex.getUTCMonth() + 1;
  let year = datex.getUTCFullYear();
  day < 10 ? (day = "0" + day) : null;
  month < 10 ? (month = "0" + month) : null;
  return day + "-" + month + "-" + year;
}
function fecha_yyyy_mm_dd(datex) {
  let day = datex.getUTCDate();
  let month = datex.getUTCMonth() + 1;
  let year = datex.getUTCFullYear();
  day < 10 ? (day = "0" + day) : null;
  month < 10 ? (month = "0" + month) : null;
  return year + "-" + month + "-" + day;
}

function fecha_yyyy_mm_dd_hh(datex) {
  let day = datex.getUTCDate();
  let month = datex.getUTCMonth() + 1;
  let year = datex.getUTCFullYear();
  let hour = datex.getUTCHours();
  let min = datex.getUTCMinutes();
  let sec = datex.getUTCSeconds();
  day < 10 ? (day = "0" + day) : null;
  month < 10 ? (month = "0" + month) : null;
  hour < 10 ? (hour = "0" + hour) : null;
  min < 10 ? (min = "0" + min) : null;
  sec < 10 ? (sec = "0" + sec) : null;
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}
function fecha_dd_mm_yyyy_hh(datex) {
  let day = datex.getUTCDate();
  let month = datex.getUTCMonth() + 1;
  let year = datex.getUTCFullYear();
  let hour = datex.getUTCHours();
  let min = datex.getUTCMinutes();
  let sec = datex.getUTCSeconds();
  day < 10 ? (day = "0" + day) : null;
  month < 10 ? (month = "0" + month) : null;
  hour < 10 ? (hour = "0" + hour) : null;
  min < 10 ? (min = "0" + min) : null;
  sec < 10 ? (sec = "0" + sec) : null;
  return day + "-" + month + "-" + year + " " + hour + ":" + min + ":" + sec;
}
module.exports = {
  fechaActual_dd_mm_yyyy,
  fechaActual_yyyy_mm_dd,
  fecha_dd_mm_yyyy,
  fecha_yyyy_mm_dd,
  fecha_dd_mm_yyyy_hh,
  fecha_yyyy_mm_dd_hh,
};
