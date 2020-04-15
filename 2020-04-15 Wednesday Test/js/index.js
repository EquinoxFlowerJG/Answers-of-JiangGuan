let waterFallFlowModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        HTML = document.documentElement,
        data,
        isRender;

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    };

    let bindHTML = function bindHTML() {
        data = data.map(item => {
            let w = item.width,
                h = item.height;
            h = 230 * h / w;
            item.width = 230;
            item.height = h;
            return item;
        });

        for (let i = 0; i < data.length; i += 3) {
            let group = data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height;
            });
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            group.forEach((item, index) => {
                let {
                    pic,
                    height,
                    title,
                    link
                } = item;
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="${link}">
                        <div class="lazyImageBox" style="height: ${height}px;">
                            <img src="" alt="" data-image="${pic}">
                        </div>
                        <p>${title}</p>
                    </a>
                `;
                columns[index].appendChild(card);
            });
        }
    };

    let lazyLoading = function lazyLoading() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            let isLoad = lazyImageBox.getAttribute('isLoad');
            if (isLoad === 'true') return;
            let A = HTML.clientHeight + HTML.scrollTop;
            let B = lazyImageBox.offsetHeight / 2 + utils.offset(lazyImageBox).top;
            if (A >= B) {
                lazyImg(lazyImageBox);
            }
        })
    };

    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = () => {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        tempImage = null;
        lazyImageBox.setAttribute('isLoad', 'true');
    };

    let loadMoreData = function loadMoreData() {
        if (HTML.clientHeight + HTML.clientHeight / 2 + HTML.scrollTop >= HTML.scrollHeight) {
            isRender = false;
            if (isRender) return;
            queryData();
            bindHTML();
            lazyLoading();            
            isRender = true;
        }
    }



    return {
        init() {
            queryData();
            bindHTML();
            lazyLoading();
            window.onscroll = () => {
                lazyLoading();
                loadMoreData();
            }
        }
    }
})();
waterFallFlowModule.init();