import Dashboard from "./dashboard";
import UsersList from "../administrator/users/list";
import UsersArchive from "../administrator/users/archive";
import UsersUnresolved from "../administrator/users/unresolved";
import RubricsList from "../administrator/rubrics/list";
import RubricsArchive from "../administrator/rubrics/archive";
import RubricsUnresolved from "../administrator/rubrics/unresolved";

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
