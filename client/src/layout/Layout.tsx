
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

interface TabInfo {
  label: string;
  to: string;
}

interface LayoutProps {
  tabs: TabInfo[];
}

const Layout = ({ tabs }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Manage active tab index

  const toggleTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-400 border-b border-gray-200 mb-3">
        {tabs?.map((tab, index) => (
          <li key={index} className="me-1">
            <Link
              onClick={() => toggleTab(index)}
              to={tab.to}
              className={`inline-block p-2 rounded-t-lg hover:bg-gray-100 ${
                activeTab === index ? "text-indigo-600 bg-gray-100" : ""
              }`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout