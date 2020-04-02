// basal method with sort sections together in a for loop
// closure first
(function () {
    // step1: get all DOM elements we need later
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
    xhr.send();

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
        str += `
        <div class="card" data-price='${price}' data-time='${time}' data-hot='${hot}'>
            <img src="${img}" class="card-img-top" alt="${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：￥${price}</p>
                <p class="card-text">销量：${hot}</p>
                <p class="card-text">时间：${time}</p>
                <a href="javascript" class="btn btn-primary">点击购买</a>
            </div>
        </div>     
    `;
    }
    productBox.innerHTML = str;

    // step4: get all "card" elements after data binding, and sort with different way in a for loop
    cardList = productBox.querySelectorAll('.card');
    let arr = Array.from(cardList);
    console.log(arr);
    
    for (let i = 0; i < navList.length; i++) {
        let item = navList[i];
        item.flag = -1;
        item.onclick = function () {
            this.flag *= -1;
            for (let j = 0; j < navList.length; j++) {
                this.classList.add('active');
                if (navList[j] !== this) {
                    navList[j].flag = -1;
                    navList[j].classList.remove('active');
                }
            }

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

            for (let z = 0; z < arr.length; z++) {
                productBox.appendChild(arr[z]);                
            }
        }
    }

    
})()