import { useState } from "react";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./app.css";
import Highlight from "react-highlight";
import "/node_modules/highlight.js/styles/atom-one-dark.min.css";
function App() {
  // hljs.registerLanguage('javascript', `console.log(123456)`);
  // const highlightedCode = hljs.highlight(
  //   'console.log(123456)',
  //   { language: 'javascript' }
  // ).value
  const [ts, setTs] = useState("// nothing...");
  const [json, setJson] = useState("// nothing...");
  const [tsC, setTsC] = useState(false);
  const [jsonC, setJsonC] = useState(false);

  const doCopy = (name:string) => {
    if (name === "ts") {
      setTsC(true);
      setTimeout(() => {
        setTsC(false);
      }, 1500);
    } else {
      setJsonC(true);
      setTimeout(() => {
        setJsonC(false);
      }, 1500);
    }
  };

  const dataChange = ({ ts, json }) => {
    setTs(ts);
    setJson(json);
  };
  try {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "datachange") {
        dataChange(message);
      }
    });
  } catch (error) {}

  return (
    <div className="app">
      <div className="code-box">
        <div className="title">JSON Preview</div>
        <Highlight language="json">{json}</Highlight>
        <CopyToClipboard text={json} onCopy={() => doCopy("json")}>
          <Tooltip placement="left" title={jsonC ? "Copied!" : "Copy"}>
            <Button
              className="copy"
              type="primary"
              icon={jsonC ? <CheckOutlined /> : <CopyOutlined />}
              disabled={jsonC}
            ></Button>
          </Tooltip>
        </CopyToClipboard>
      </div>
      <div className="code-box">
        <div className="title">TypeScript Preview</div>
        <Highlight language="typescript">{ts}</Highlight>
        <CopyToClipboard text={ts} onCopy={() => doCopy("ts")}>
          <Tooltip placement="left" title={tsC ? "Copied!" : "Copy"}>
            <Button
              className="copy"
              type="primary"
              icon={tsC ? <CheckOutlined /> : <CopyOutlined />}
              disabled={tsC}
            ></Button>
          </Tooltip>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default App;
