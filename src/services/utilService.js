const makeId = (length = 5) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const shuffle = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const setButtonRippleListeners = (name = "activeTab") => {
  [].map.call(document.querySelectorAll(`[anim="${name}"]`), (el) => {
    el.addEventListener("click", (e) => {
      e = e.touches ? e.touches[0] : e;
      const r = el.getBoundingClientRect(),
        d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
        el.style.cssText = `--s: 0; --o: 1;`;
        // eslint-disable-next-line no-unused-expressions
      el.offsetTop;
      el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
        e.clientX - r.left
      }; --y:${e.clientY - r.top};`;
    });
  });
};

export default {
  makeId,
  shuffle,
  setButtonRippleListeners,
  dynamicSort,
};
