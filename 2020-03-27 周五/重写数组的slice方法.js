/* 作业：
数组有一个slice方法  arr.slice(n,m)  可以从索引n开始，找到索引为m处（不包含m），找到的以新数组返回
特殊情况：
1. n/m只传递一个或者都不传递 √
2. n/m是负数               √
3. n/m是小数               √
4. n/m是非有效数字          √
5. n/m的大小超过最大长度     √
6. 如果m<=n咋办             √
....

把这些情况都考虑进来，然后重写内置的slice方法，实现自己的slice

就用最基本的for和if之类的 */

Array.prototype.mySlice = function mySlice(n, m) {

    // 处理不传参、传undefined以及非有效数字的情况：
    Number(n) ? n = Number(n) : n = 0; // n如果不传参，或为非有效数字时，赋值n=0。
    if (m == undefined) {
        m = this.length; // m不传参或传undefined时，赋值m=数组的长度length。
    } else {
        Number(m) ? m = Number(m) : m = 0; // m为非有效数字时，赋值m=0。
    }

    // 负数和小数的情况一同处理：如果是负的小数，先向上取整，再转为正索引。
    if (n < 0) {
        n = this.length + Math.ceil(n);
    }
    if (m < 0) {
        m = this.length + Math.ceil(m);
    }
    // 处理正小数的情况:向下取整。
    n = Math.floor(n);
    m = Math.floor(m)

    // 处理n的索引位置在m的索引位置右侧的情况,顺便处理n的索引值超出长度的情况：
    if (n >= m || n > this.length) {
        return [];
    }

    // 处理m的索引值超出长度的问题：
    m > this.length ? m = this.length : null;

    // 截取对应的数组：
    let newAry = [];
    for (let i = n; i < m; i++) {
        newAry[newAry.length] = this[i]; // 用for循环将原数组的n~m（不含m）项添加到新数组中。
    }

    return newAry; // 返回截取的数组。
}

let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.mySlice(NaN, 9));
console.log(arr.slice(NaN, 9));  // 内置的用来比对检测
