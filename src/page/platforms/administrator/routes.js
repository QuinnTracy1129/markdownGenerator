import Dashboard from "./dashboard";
import UsersList from "./users/list";
import UsersArchive from "./users/archive";
import UsersUnresolved from "./users/unresolved";
import RubricsList from "./rubrics/list";
import RubricsArchive from "./rubrics/archive";
import RubricsUnresolved from "./rubrics/unresolved";

const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "users",
    children: [
      {
        path: "list",
        element: <UsersList />,
      },
      {
        path: "unresolved",
        element: <UsersUnresolved />,
      },
      {
        path: "archive",
        element: <UsersArchive />,
      },
    ],
  },
  {
    path: "rubrics",
    children: [
      {
        path: "list",
        element: <RubricsList />,
      },
      {
        path: "unresolved",
        element: <RubricsUnresolved />,
      },
      {
        path: "archive",
        element: <RubricsArchive />,
      },
    ],
  },
];

export default routes;
