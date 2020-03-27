源代码如下 :
// 模拟 Array.prototype.slice 方法

// slice 方法
function slice() {

    let _arr = util.copyArray(arguments), // arguments -> 参数数组
        _ary = util.copyArray(this), // 拷贝目标数组;
        len = _arr.length > 2 ? 2 : _arr.length, // 存储参数长度
        size = _ary.length, // 存储目标数组长度
        startIndex = 0, // 起始索引
        lastIndex = 0, // 终止索引
        res = []; // 返回的结果数组
    
    // 分情况处理
    switch(len) {
        case 0: // 无参数时
            res = _ary;
            break;
        case 1: // 有且仅有 1 个参数时
            // 数据类型转换
            startIndex = util.changeType(_arr[0]);
            // 获取真实索引    
            startIndex = util.obtainRealIndex(startIndex, size);
            lastIndex = _ary.length;
            // 数组截取
            res = util.truncArray(_ary, startIndex, lastIndex);
            break;
        case 2: // 当且仅当 2 个参数时
            // 数据类型转换
            startIndex = util.changeType(_arr[0]);
            // 考虑 2 参为 undefined 的情况
            lastIndex = _arr[1] === undefined ? size : util.changeType(_arr[1]);
            // 获取真实索引            
            startIndex  = util.obtainRealIndex(startIndex, size);
            lastIndex  = util.obtainRealIndex(lastIndex, size);
            if(!util.judgeSize(startIndex, lastIndex)) { // 1参 < 2 参 ?
                res = [];
            }else { // 数组截取
                res = util.truncArray(_ary, startIndex, lastIndex);
            }
            break;
        default :
            console.log("bug ...");
    } 
    return res;
}

// 定义工具对象
let util = {

    // 数组拷贝
    copyArray(arg) {
        let arr = [];
        for(let i = 0; i < arg.length; i++) {
            arr[i] = arg[i];
        }
        return arr;
    },
    // 数据类型转换
    changeType: (item) => Number(item),
    // 数组末尾添加元素
    push(arr, item) {
        arr[arr.length] = item
        return arr;
    },
    // 数组截取
    truncArray(arr, startIndex, lastIndex) {
        let trunc = [];
        for(let i = 0; i < arr.length; i++) {
            if(i >= startIndex && i < lastIndex) {
                trunc = this.push(trunc, arr[i]);
            }
        }
        return trunc;
    },
    // 获取真实索引
    obtainRealIndex: (num, size) => isNaN(num) ? 0 : num > -1 ? Math.floor(num) : Math.ceil(num) + size,
    // 判断参数大小
    judgeSize: (prev, next) => prev < next,
};

// 将手动模拟实现的 slice 方法添加到 Array.prototype 中
Array.prototype.mySlice = slice;

let arr = [1, 2, 3, 4, 5, 6];

console.log(arr.mySlice()); // [1, 2, 3, 4, 5, 6]
