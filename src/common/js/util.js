/* 解析url参数 */
/* @example ?id=12345&a=b */
/* @return Object {id:12345, a:b} */

export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b'] arr
    if (arr) {
        arr.forEach((item) => {
            /* 干掉第一个字符，？和& */
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};