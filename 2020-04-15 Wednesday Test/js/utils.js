let utils = (function () {
    function getCss(element, attr) {
        let value = window.getComputedStyle(element)[attr],
            reg = /^\d+(px|rem|em)?$/i;
        if (reg.test(value)) {
            value = parseFloat(value);
        };
    };

    function setCss(element, attr, value) {
        if (attr === 'opacity') {
            element['style'][attr] = value;
            element['style']['filter'] = `alpha(opacity=$(value*100))`;
            return;
        }
        let reg = /^(width|height|margin|padding)?(top|bottom|left|right)?$/i;
        if (reg.test(attr)) {
            if (!isNaN) {
                value += 'px'; // 不带单位时加上单位
            }
        };
        element['style'][attr] = value;
    };

    function setGroupCss(element, options) {
        for (let key in options) {
            if (!options.hasOwnProperty(key)) break;
            setCss(element, key, options[key]);
        }
    };

    function css(element) {
        let len = arguments.length,
            attr = arguments[1],
            value = arguments[2];
        if (len >= 3) {
            setCss(element, attr, value);
            return;
        };
        if (attr !== null & typeof attr === 'object') {
            setGroupCss(element, attr);
            return;
        };
        return getCss(element, attr);
    }

    function offset(element) {
        let parent = element.offsetParent,
            top = element.offsetTop,
            left = element.offsetLeft;
        if (!/MSIE 8/.test(navigator.userAgent)) {
            top += parent.clientTop;
            left += parent.clientLeft;
        };
        top += parent.offsetTop;
        left += parent.offsetLeft;
        parent = parent.offsetParent;

        return {
            top,
            left
        }
    }


    return {
        css,
        offset
    }
})();