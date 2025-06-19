import Heading from "../styles/Heading";
import Row from "../styles/Row";
import AdminRolesPanel from "../features/admin/AdminRolesPanel";
import AdminSidebarPanel from "../features/admin/AdminSidebarPanel";
import { useState } from "react";
import AdminCodeEditorPanel from "../features/admin/AdminCodeEditorPanel";
import AdminUsersPanel from "../features/admin/AdminUsersPanel";
import AdminCoursesPanel from "../features/admin/AdminCoursesPanel";
import Modal from "../ui/Modal";
import { useSettings } from "../features/admin/useSettings";
import Spinner from "../ui/Spinner";

function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState("roles");
  const { settings, isFetchingSettings } = useSettings();

  const tabs = [
    {
      name: "Roles",
      key: "roles",
      component: <AdminRolesPanel settings={settings} />,
    },
    {
      name: "Users",
      key: "users",
      component: <AdminUsersPanel settings={settings} />,
    },
    {
      name: "Courses",
      key: "courses",
      component: <AdminCoursesPanel settings={settings} />,
    },
    {
      name: "Code Editor",
      key: "code-editor",
      component: <AdminCodeEditorPanel settings={settings} />,
    },
  ];
  if (isFetchingSettings) return <Spinner></Spinner>;
  return (
    <Row
      type="vertical"
      content="center"
      style={{ alignItems: "center", width: "100%", height: "90%" }}
    >
      <Heading>Admin Panel</Heading>
      <Row
        type="horizontal"
        gap="10px"
        content="center"
        style={{ width: "100%", height: "90%" }}
      >
        <AdminSidebarPanel
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        ></AdminSidebarPanel>
        {tabs.find((tab) => tab.key === selectedTab).component}
        {/* <AdminRolesPanel></AdminRolesPanel> */}
      </Row>
    </Row>
  );
}

export default AdminPanel;
