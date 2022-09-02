// @ts-nocheck
import React from "react";
import { useState, useRef } from "react";
import Kityminder from "react-kityminder";

function App(props: any) {
  const data = {
    root: {
      data: {
        text: "百度产品",
        image: "/logo512.png",
        imageSize: { width: 200, height: 120 },
      },
      children: [
        { data: { text: "新闻" } },
        { data: { text: "网页", priority: 1 } },
        { data: { text: "贴吧", priority: 2 } },
        { data: { text: "知道", priority: 2 } },
        { data: { text: "音乐", priority: 3 } },
        { data: { text: "图片", priority: 3 } },
        { data: { text: "视频", priority: 3 } },
        { data: { text: "地图", priority: 3 } },
        { data: { text: "百科", priority: 3 } },
        { data: { text: "更多", hyperlink: "http://www.baidu.com/more" } },
      ],
    },
  };
  const [value, setValue] = useState(data);

  const minderRef = useRef();
  const minder = minderRef.current;

  const onChange = (val: any) => {
    console.log(val, "v");
    // setValue(val)
  };

  return <Kityminder ref={minderRef} value={value} onChange={onChange} />;
}

export default App;
