// @ts-nocheck
import "./App.css";
import "kityminder-core/dist/kityminder.core.css";
import "kity";
import "kityminder-core";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { OptionsType } from "./edit.d";
import { Button, Col, Dropdown, Menu, Row, Select, Space, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import EditNode from "./component/Editor/index";

const { Search } = Input;

const themeList = [
  {
    label: "脑图经典",
    value: "classic",
  },
  {
    label: "紧凑经典",
    value: "classic-compact",
  },
  {
    label: "温柔冷光",
    value: "snow",
  },
  {
    label: "紧凑冷光",
    value: "snow-compact",
  },
  {
    label: "鱼骨图",
    value: "fish",
  },
  {
    label: "线框",
    value: "wire",
  },
  {
    label: "清新红",
    value: "fresh-red",
  },
  {
    label: "泥土黄",
    value: "fresh-soil",
  },
  {
    label: "文艺绿",
    value: "fresh-green",
  },
  {
    label: "天空蓝",
    value: "fresh-blue",
  },
  {
    label: "浪漫紫",
    value: "fresh-purple",
  },
  {
    label: "脑残粉",
    value: "fresh-pink",
  },
  {
    label: "紧凑红",
    value: "fresh-red-compat",
  },
  {
    label: "紧凑黄",
    value: "fresh-soil-compat",
  },
  {
    label: "紧凑绿",
    value: "fresh-green-compat",
  },
  {
    label: "紧凑蓝",
    value: "fresh-blue-compat",
  },
  {
    label: "紧凑紫",
    value: "fresh-purple-compat",
  },
  {
    label: "紧凑粉",
    value: "fresh-pink-compat",
  },
  {
    label: "经典天盘",
    value: "tianpan",
  },
  {
    label: "紧凑天盘",
    value: "tianpan-compact",
  },
];

const templateList = [
  {
    label: "思维导图",
    value: "default",
  },
  {
    label: "天盘图",
    value: "tianpan",
  },
  {
    label: "组织结构图",
    value: "structure",
  },
  {
    label: "目录组织图",
    value: "filetree",
  },
  {
    label: "逻辑结构图",
    value: "right",
  },
  {
    label: "鱼骨头图",
    value: "fish-bone",
  },
];

type PropsType = OptionsType & {};

const App: React.FC<PropsType> = ({
  theme = "fresh-blue",
  template = "right",
}) => {
  const kityRef = useRef(null);
  const [km, SetMinder] = useState();
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

  useEffect(() => {
    if (kityRef.current) {
      // 填充数据
      kityRef.current.append(JSON.stringify(data));
      // 创建 km 实例
      const km = (window.km = new kityminder.Minder());
      km.setup(kityRef.current);
      // km.disable();
      // km.execCommand("hand");
      SetMinder(km);
      // editeorComand("Template", template);
      // editeorComand("Theme", theme);
    }
  }, [kityRef]);

  // useEffect(() => {}, [data]);

  const editeorComand = (type: string, value?: string | number) => {
    console.log(type, value);
    km.queryCommandState(type) < 1 && km.execCommand(type, value);
  };

  const selectNode = (type: string) => {
    const minder = km;
    switch (type) {
      case "all":
        var selection = [];
        minder.getRoot().traverse(function (node) {
          selection.push(node);
        });
        console.log(selection, "all");

        minder.select(selection, true);
        minder.fire("receiverfocus");
        break;
      case "revert":
        var selected = minder.getSelectedNodes();
        var selection = [];
        minder.getRoot().traverse(function (node) {
          if (selected.indexOf(node) == -1) {
            selection.push(node);
          }
        });
        minder.select(selection, true);
        minder.fire("receiverfocus");
        break;
      case "siblings":
        var selected = minder.getSelectedNodes();
        var selection = [];
        selected.forEach(function (node) {
          if (!node.parent) return;
          node.parent.children.forEach(function (sibling) {
            if (selection.indexOf(sibling) == -1) selection.push(sibling);
          });
        });
        minder.select(selection, true);
        minder.fire("receiverfocus");
        break;
      case "level":
        var selectedLevel = minder.getSelectedNodes().map(function (node) {
          return node.getLevel();
        });
        var selection = [];
        minder.getRoot().traverse(function (node) {
          if (selectedLevel.indexOf(node.getLevel()) != -1) {
            selection.push(node);
          }
        });
        minder.select(selection, true);
        minder.fire("receiverfocus");
        break;
      case "path":
        var selected = minder.getSelectedNodes();
        var selection = [];
        selected.forEach(function (node) {
          while (node && selection.indexOf(node) == -1) {
            selection.push(node);
            node = node.parent;
          }
        });
        minder.select(selection, true);
        minder.fire("receiverfocus");
        break;
      case "tree":
        var selected = minder.getSelectedNodes();
        var selection = [];
        selected.forEach(function (parent) {
          parent.traverse(function (node) {
            if (selection.indexOf(node) == -1) selection.push(node);
          });
        });
        minder.select(selection, true);
        minder.fire("receiverfocus");
        break;
    }
  };

  const menu = () => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push({
        key: i + "",
        label: `展开到${i}级节点`,
      });
    }

    return (
      <Menu
        items={arr}
        onClick={(val) => editeorComand("ExpandToLevel", val.key)}
      />
    );
  };

  const nodeMenu = () => {
    const arr = [
      {
        key: "all",
        label: "全选",
      },
      {
        key: "revert",
        label: "反选",
      },
      {
        key: "siblings",
        label: "选择兄弟节点",
      },
      {
        key: "level",
        label: "选择同级节点",
      },
      {
        key: "path",
        label: "选择路径",
      },
      {
        key: "tree",
        label: "选择子树",
      },
    ];

    return <Menu items={arr} onClick={(val) => selectNode(val.key)} />;
  };

  const layoutMenu = () => {
    const arr = [
      {
        key: "filetree-up",
        label: "filetree-up",
      },
      {
        key: "filetree-down",
        label: "filetree-down",
      },

      {
        key: "fish-bone-master",
        label: "fish-bone-master",
      },
      {
        key: "fish-bone-slave",
        label: "fish-bone-slave",
      },
      {
        key: "mind",
        label: "mind",
      },
      {
        key: "tianpan",
        label: "tianpan",
      },
      {
        key: "top",
        label: "top",
      },
      {
        key: "bottom",
        label: "bottom",
      },
      {
        key: "left",
        label: "left",
      },
      {
        key: "right",
        label: "right",
      },
    ];

    return (
      <Menu items={arr} onClick={(val) => editeorComand("Layout", val.key)} />
    );
  };

  const exportFn = async (type: "img" | "data") => {
    try {
      if (type === "img") {
        const base64Data = await km.exportData("png");
        saveAs(base64Data, "test.png");
      } else {
        const mindData = await km.exportData("json"); // text or json
        const blob = new Blob([mindData], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "test.json");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const editNode = () => {
  //   var receiverElement = km.receiver.element;
  //   var fsm = km.fsm;
  //   var receiver = km.receiver;

  //   receiverElement.innerText = km.queryCommandValue("text");
  //   fsm.jump("input", "input-request");
  //   receiver.selectAll();
  // };

  // const searchNode = (node, previewKeyword) => {
  //   km.execCommand("camera", node, 50);
  //   setTimeout(function () {
  //     km.select(node, true);
  //     if (!node.isExpanded()) km.execCommand("expand", true);
  //     if (previewKeyword) {
  //       km.fire("shownoterequest", {
  //         node: node,
  //         keyword: previewKeyword,
  //       });
  //     }
  //   }, 60);
  // };
  console.log(km, "vv");

  return (
    <div className="App">
      <Row>
        <Col>
          模板：
          <Select
            options={templateList}
            style={{ width: 120 }}
            defaultValue={template}
            onChange={(val) => editeorComand("Template", val)}
          ></Select>
        </Col>

        <Col>
          主题：
          <Select
            options={themeList}
            style={{ width: 120 }}
            defaultValue={theme}
            onChange={(val) => editeorComand("Theme", val)}
          ></Select>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <Space>
              展开
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown overlay={nodeMenu}>
            <Space>
              选中节点
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
        <Col>
          <Button onClick={() => editeorComand("FontSize", 20)}>
            选中节点字体大小
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => editeorComand("Background", "yellow")}>
            选中节点背景颜色
          </Button>
        </Col>
        <Col>
          <Button onClick={() => console.log(km.exportJson())}>
            获取当前数据
          </Button>
        </Col>
        <Col>
          <Button onClick={() => exportFn("img")}>导出图片</Button>
        </Col>
        <Col>
          <Button onClick={() => exportFn("data")}>导出数据</Button>
        </Col>
        <Col>
          <Button onClick={() => editNode()}>编辑</Button>
        </Col>
        <Col>
          <Button onClick={() => editeorComand("AppendChildNode", "children")}>
            插入子节点
          </Button>
        </Col>
        <Col>
          <Button onClick={() => editeorComand("AppendParentNode", "parent")}>
            插入父节点
          </Button>
        </Col>
        <Col>
          <Button onClick={() => editeorComand("AppendSiblingNode", "brother")}>
            插入同级节点
          </Button>
          <Button onClick={() => editeorComand("resetlayout")}>整理布局</Button>

          <Dropdown overlay={layoutMenu}>
            <Space>
              选中节点布局
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
        {/* <Col>
          <Search
            placeholder="搜索节点"
            onSearch={(val) => {
              searchNode("", val);
            }}
            style={{ width: 200 }}
          />
        </Col> */}
      </Row>

      <div className="contentbox">
        <div
          ref={kityRef}
          type="application/kityminder"
          minder-data-type="json"
          style={{ height: "100%" }}
        ></div>
        <EditNode minder={km} canEdit />
      </div>
    </div>
  );
};

export default App;
