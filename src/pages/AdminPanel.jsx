import { Link } from "react-router-dom";

const AdminPanel = () => {
  const options = [
    { name: "View Reports", link: "reports" },
    { name: "Create an admin", link: "create-user" },
    { name: "Create a topic", link: "new-topic" },
    { name: "Link a topic to a commission", link: "link-topic" },
    {name: 'Link a user to a commission', link: 'link-user'},
    { name: "Create a commission", link: "create-commission" },
    { name: "Remove a topic from commission", link: "remove-topic" },
    {name: 'Delete Reports for a commission', link: 'remove-reports'},
    {name: 'Delete an admin', link: 'remove-admin'}
  ];

  return (
    <section className="admin-panel">
      <h1>Admin Links:</h1>
      {options.map((option) => {
        return (
          <div className="admin-link-container">
        <Link to={`/admin/${option.link}`} className="admin-link" key={option.name}>
            <h1>{option.name}</h1>
          </Link>
          </div>
        )
      })}
    </section>
  );
};

export default AdminPanel;
