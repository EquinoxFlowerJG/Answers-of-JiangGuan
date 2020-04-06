// basal method:
// 闭包 - closure
(function () {
    // step1: get all DOM elements we need
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        cardList = null,
        data = null;


    // step2: get data from server with Ajax
    let xhr = new XMLHttpRequest;
    xhr.open('get', './json/product.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send(null);


    // step3: data binding
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let {
            id,
            title,
            price,
            time,
            hot,
            img
        } = item;

        str +=
            `<div class="card" data-price="${price}" data-time='${time}' data-hot='${hot}'>
                <img src="${img}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">价格：￥${price}</p>
                    <p class="card-text">销量：${hot}</p>
                    <p class="card-text">时间：${time}</p>
                    <a href="javascript:;" class="btn btn-primary">点击购买</a>
                </div>
            </div>`
    }
    productBox.innerHTML = str;


    // step4: get all "card" elements after data binding, and sort with different way
    cardList = productBox.querySelectorAll('.card');
    let arr = Array.from(cardList);
    // step4.1: sort in price
    navList[0].flag = -1;
    navList[0].onclick = function () {
        this.flag *= -1;
        arr.sort((a, b) => {
            return (a.getAttribute('data-price') - b.getAttribute('data-price')) * this.flag;
        });
        for (let i = 0; i < arr.length; i++) {
            productBox.appendChild(arr[i]);
        }
        navList[2].flag = -1;
        navList[1].flag = -1;
        this.classList.add('active');
        navList[2].classList.remove('active');
        navList[1].classList.remove('active');
    }
    // step4.2: sort in hot
    navList[2].flag = -1;
    navList[2].onclick = function () {
        this.flag *= -1;
        arr.sort((a, b) => {
            return (a.getAttribute('data-hot') - b.getAttribute('data-hot')) * this.flag;
        });
        for (let i = 0; i < arr.length; i++) {
            productBox.appendChild(arr[i]);
        }
        navList[0].flag = -1;
        navList[1].flag = -1;
        this.classList.add('active');
        navList[0].classList.remove('active');
        navList[1].classList.remove('active');
    }
    // step4.3: sort in time
    navList[1].flag = -1;
    navList[1].onclick = function () {
        this.flag *= -1;
        arr.sort((a, b) => {
            a = a.getAttribute('data-time').replace(/-/g, '');
            b = b.getAttribute('data-time').replace(/-/g, '');
            return (a - b) * this.flag;
        });
        for (let i = 0; i < arr.length; i++) {
            productBox.appendChild(arr[i]);
        }
        navList[0].flag = -1;
        navList[2].flag = -1;
        this.classList.add('active');
        navList[0].classList.remove('active');
        navList[2].classList.remove('active');
    }
})();