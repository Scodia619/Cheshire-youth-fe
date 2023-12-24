import { Link } from "react-router-dom";

const AdminPanel = () => {
  const options = [
    { name: "View Reports", link: "reports" },
    { name: "Create an admin", link: "create-user" },
    { name: "Create a topic", link: "new-topic" },
    { name: "Link a topic to a commission", link: "link-topic" },
    { name: "Create a commission", link: "create-commission" },
    { name: "Remove a topic from commission", link: "remove-topic" },
  ];

  return (
    <section>
      {options.map((option) => {
        return (<Link to={`/admin/${option.link}`} key={option.name}>
            <h1>{option.name}</h1>
          </Link>
        )
      })}
    </section>
  );
};

export default AdminPanel;
