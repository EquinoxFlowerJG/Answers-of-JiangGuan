// development module:
// realize development of content section based on advanced singleton pattern
let shopModule = (function () {

    // step1: get all DOM elements we need later
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        cardList = null,
        data = null;

    // step2: query data from server with Ajax
    function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    };

    // step3: data binding
    let bindHTML = function () {
        let str = ``;
        data.forEach(item => {
            let {
                id,
                title,
                price,
                time,
                hot,
                img
            } = item;

            str +=
                `
            <div class="card" data-price="${price}" data-time="${time}" data-hot="${hot}">
                <img src="${img}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">价格：￥${price.toFixed(2)}</p>
                    <p class="card-text">销量：${hot}</p>
                    <p class="card-text">时间：${time}</p>
                    <a href="#" class="btn btn-primary">点击购买</a>
                </div>
            </div>
            `;
        })
        productBox.innerHTML = str;
    };

    // step4: write a method of "clear",give a right style
    let clear = function () {
        [].forEach.call(navList, item => {
            this.classList.add('active');
            if (item !== this) {
                item.flag = -1;
                item.classList.remove('active');
            }
        })
    }

    // step5: sort method section
    let sortCard = function (i) {
        cardList = productBox.querySelectorAll('.card');
        let arr = Array.from(cardList);

        let char = 'data-price';
        i === 1 ? char = 'data-time' : null;
        i === 2 ? char = 'data-hot' : null;

        arr.sort((a, b) => {
            a = a.getAttribute(char);
            b = b.getAttribute(char);

            if (char === 'data-time') {
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }

            return (a - b) * this.flag;
        });

        for (let j = 0; j < arr.length; j++) {
            productBox.appendChild(arr[j]);
        }
    }

    // step6: binding sort button with loop click event
    let handleNav = function () {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick =function(){
                clear.call(this);
                this.flag *= -1;
                sortCard.call(this,index)
            }
        });
    }

    return {
        init(){
            queryData();
            bindHTML();
            handleNav();
        }
    }



})();

shopModule.init();
