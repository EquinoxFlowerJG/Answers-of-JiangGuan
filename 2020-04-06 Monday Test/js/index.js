let shopModule = (function () {

    // 获取需要的元素
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        data = null;

    // 从服务器获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            };
        };
        xhr.send(null);
    };

    // 将获取到的数据渲染到页面中
    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `
                <div class="card">
                    <img src="${img}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">价格：￥${price}</p>
                        <p class="card-text">销量：${hot}</p>
                        <p class="card-text">时间：${time}</p>
                        <a href="javascript:;" class="btn btn-primary">点击购买</a>
                    </div>
                </div>
            `;
        });
        productBox.innerHTML = str;
    };

    // 循环绑定每一个li，点击时进行排序
    // 点击li时先将所有样式及自定义属性重置
    let clear = function clear(){
        Array.from(navList).forEach(item=>{
            if(item !==this){
                item.flag=-1;
                item.classList.remove('active');
            }
        });
    };
    // 绑定点击事件
    let handle = function handle(){
        Array.from(navList).forEach(item=>{
            item.flag=-1;
            item.onclick=function(){
                clear.call(this);
                this.flag*=-1;
                let paiXu = this.getAttribute('data-sort');
                data.sort((a,b)=>{
                    a=String(a[paiXu]).replace(/-/g,'');
                    b=String(b[paiXu]).replace(/-/g,'');
                    return (a-b)*this.flag;
                });
                render();
            };
        });
    };


    return {
        init() {
            queryData();
            render();
            handle();
        }
    };
})();

shopModule.init();