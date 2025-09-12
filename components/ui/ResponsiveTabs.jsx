"use client"

import { Tabs, Select } from "antd";
import { useState, useEffect } from "react";

export default function ResponsiveTabs({ tabItem }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeKey, setActiveKey] = useState(tabItem[0]?.key);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <Select
      value={activeKey}
      style={{ width: "100%" }}
      onChange={setActiveKey}
      options={tabItem.map(t => ({ value: t.key, label: t.label }))}
    />
  ) : (
    <Tabs
      size="large"
      type="card"
      activeKey={activeKey}
      onChange={setActiveKey}
      items={tabItem}
    />
  );
}
