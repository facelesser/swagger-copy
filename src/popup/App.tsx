import "./App.css";
import { Switch, Divider, Input } from "antd";
import { useEffect, useState } from "react";
function App() {
  const [copyJson, setCopyJson] = useState(true);
  const [copyTs, setCopyTs] = useState(true);
  const [commonHead, setCommonHead] = useState("Demo");

  const saveKey = (key: string, value: string | boolean) => {
    try {
      chrome.storage.sync.set({ [key]: value }).then(() => {});
    } catch (error) {
      /* empty */
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    saveKey("common-head", value);
    setCommonHead(value);
  };

  const handleTsChange = (e: boolean) => {
    saveKey("copy-ts", e);
    setCopyTs(e);
  };

  const handleJsonChange = (e: boolean) => {
    saveKey("copy-json", e);
    setCopyJson(e);
  };

  useEffect(() => {
    try {
      chrome.storage.sync
        .get(["copy-ts", "copy-json", "common-head"])
        .then((result) => {
          if (result["copy-ts"] !== undefined) {
            setCopyTs(result["copy-ts"]);
          }
          if (result["copy-ts"] !== undefined) {
            setCopyJson(result["copy-json"]);
          }
          if (
            result["common-head"] !== undefined &&
            result["common-head"] !== ""
          ) {
            setCommonHead(result["common-head"]);
          }
        });
    } catch (error) {
      /* empty */
    }
  }, []);

  return (
    <div id="app">
      <div className="header">Swagger Copy</div>
      <Divider></Divider>
      <div className="config-item">
        <span className="item-title">复制JSON</span>
        <Switch value={copyJson} onChange={handleJsonChange} />
      </div>
      <div className="config-item">
        <span className="item-title">复制TypeScript</span>
        <Switch value={copyTs} onChange={handleTsChange} />
      </div>
      <div className="config-item">
        <span className="item-title">默认前缀</span>
        <Input
          value={commonHead}
          defaultValue={commonHead}
          placeholder="like: My"
          onChange={handleInputChange}
          maxLength={20}
          showCount
        />
      </div>
      <Divider></Divider>
      <div className="footer">Thanks!</div>
    </div>
  );
}

export default App;
