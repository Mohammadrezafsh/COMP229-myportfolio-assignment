import { useState } from "react";
import CrudManager from "../components/CrudManager";

const tabs = [
  { key: "projects", label: "Projects" },
  { key: "services", label: "Services" },
  { key: "references", label: "References" },
  { key: "users", label: "Users" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <section className="container">
      <header className="pageHeader">
        <h2>Portfolio Dashboard</h2>
        <p className="muted">
          This page manages users, projects, services, and references using the backend API.
        </p>
      </header>

      <div className="dashboardTabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={activeTab === tab.key ? "tabButton activeTab" : "tabButton"}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "projects" ? (
        <CrudManager
          title="Projects"
          resource="projects"
          buttonLabel="Project"
          emptyForm={{
            title: "",
            completion: "",
            description: "",
            imageUrl: "",
          }}
          fields={[
            { name: "title", label: "Title" },
            { name: "completion", label: "Completion Date", type: "date" },
            { name: "description", label: "Description", type: "textarea", rows: 5 },
            { name: "imageUrl", label: "Project Image", type: "file", required: false },
          ]}
        />
      ) : null}

      {activeTab === "services" ? (
        <CrudManager
          title="Services"
          resource="services"
          buttonLabel="Service"
          emptyForm={{
            title: "",
            description: "",
            imageUrl: "",
          }}
          fields={[
            { name: "title", label: "Title" },
            { name: "description", label: "Description", type: "textarea", rows: 5 },
            { name: "imageUrl", label: "Service Image", type: "file", required: false },
          ]}
        />
      ) : null}

      {activeTab === "references" ? (
        <CrudManager
          title="References"
          resource="references"
          buttonLabel="Reference"
          emptyForm={{
            firstname: "",
            lastname: "",
            email: "",
            position: "",
            company: "",
          }}
          fields={[
            { name: "firstname", label: "First Name" },
            { name: "lastname", label: "Last Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "position", label: "Position" },
            { name: "company", label: "Company" },
          ]}
        />
      ) : null}

      {activeTab === "users" ? (
        <CrudManager
          title="Users"
          resource="users"
          buttonLabel="User"
          emptyForm={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          }}
          fields={[
            { name: "firstname", label: "First Name" },
            { name: "lastname", label: "Last Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ]}
        />
      ) : null}
    </section>
  );
}