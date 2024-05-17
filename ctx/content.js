const lang = navigator.language;
const COPY_TEXT = lang === "zh-CN" ? "📋 复制" : "📋 Copy";
const COPY_TEXT_DONE = lang === "zh-CN" ? "🎉 已复制" : "🎉 Copied!";
const BTN_STYLE = {
  position: "absolute",
  right: 0,
  top: 0,
  outline: "none",
  padding: "8px",
  fontSize: "14px",
  "font-family": "Segoe UI', Tahoma, sans-serif",
  lineHeight: 1.4,
};
const nodeCode = () => {
  const nodes = document.getElementsByClassName("highlight-code");
  for (let el of nodes) {
    if (el.children.length < 2) {
      const button = document.createElement("button");
      // 样式
      buttonStyle(button, BTN_STYLE);
      buttonStart(button);
      button.addEventListener("click", async function (e) {
        const codeEl = el.children[0];
        copyText(codeEl);
        buttonEnd(button);
        setTimeout(() => {
          buttonStart(button);
        }, 2000);

        e.stopPropagation();
      });
      el.appendChild(button);
    }
  }
};
document.addEventListener("click", function (e) {
  setTimeout(() => {
    nodeCode();
  }, 300);
});

window.onload = function () {
  setTimeout(() => {
    nodeCode();
  }, 1000);
};

function parseElement(text) {
  return text.replace(/<span[^>]*>(.*?)<\/span>/g, "$1");
}

function ChromeSend(msg, callback) {
  chrome.runtime.sendMessage(msg, function (response) {
    callback(response);
  });
}

function buttonStyle(el, style) {
  for (key in style) {
    el.style[key] = style[key];
  }
}

function buttonStart(el) {
  el.textContent = COPY_TEXT;
  el.disabled = false;
  buttonStyle(el, {
    cursor: "pointer",
  });
}

function buttonEnd(el) {
  el.textContent = COPY_TEXT_DONE;
  el.disabled = true;
  buttonStyle(el, {
    cursor: "not-allowed",
  });
}

const copyText = (el) => {
  console.log(el.textContent);
  console.log(window.navigator?.clipboard);
  try {
    if (window.navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(el.textContent);
    } else {
      // 转换成textarea
      var range = document.body.createTextRange();
      range.selectNode(el);
      document.execCommand("copy");
    }
  } catch (error) {}
};
