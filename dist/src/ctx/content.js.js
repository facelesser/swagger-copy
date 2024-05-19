import qtRuner from "/qt/index.js.js";
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

document.addEventListener("click", function () {
  setTimeout(() => {
    nodeCode();
  }, 300);
});

// window.onload = function () {
//   setTimeout(() => {
//     nodeCode();
//   }, 1000);
// };

function ChromeSend(msg, callback) {
  // eslint-disable-next-line no-undef
  chrome.runtime.sendMessage(msg, function (response) {
    callback(response);
  });
}

// 复制数据
const copyText = async (el) => {
  const json = el.textContent;
  let head = "Demo";
  try {
    // eslint-disable-next-line no-undef
    await chrome.storage.sync.get(["common-head"]).then((result) => {
      if (result["common-head"] !== "" && result["common-head"] !== undefined)
        head = result["common-head"];
    });
  } catch (error) {
    /* empty */
  }

  const ts = await qtRuner(head, json);
  // 传送数据到侧边面板
  ChromeSend({ type: "datachange", ts, json: el.textContent }, () => {});
  copyApi({ ts, json });
};

// 拷贝操作
const copyApi = async ({ ts, json }) => {
  let res = [];
  // eslint-disable-next-line no-undef
  await chrome.storage.sync.get(["copy-json"]).then((result) => {
    if (result["copy-json"] !== false) {
      res.push(json);
    }
  });

  // eslint-disable-next-line no-undef
  await chrome.storage.sync.get(["copy-ts"]).then((result) => {
    if (result["copy-ts"] !== false) {
      res.push(ts);
    }
  });
  console.log(res.join("\n"));
  try {
    navigator.clipboard.writeText(res.join("\n"));
  } catch (error) {
    /* empty */
  }
};

// 按钮
function buttonStyle(el, style) {
  for (const key in style) {
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