import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DashboardPage from "views/Dashboard/StudentDashboard";
import Person from "@material-ui/icons/Person";

const dashboardRoutes = [
    {
        path: "/",
        name: "About",
        rtlName: "Demo",
        icon: LibraryBooks,
        component: DashboardPage,
        layout: "/About"
    },
    {
        path: "/",
        name: "Contact",
        rtlName: "Demo",
        icon: LibraryBooks,
        component: DashboardPage,
        layout: "/Contact"
    },
    {
        path: "/",
        name: "Logout",
        rtlName: "Demo",
        icon: Person,
        component: DashboardPage,
        layout: "/IndexPanel"
    },
];

export default dashboardRoutes;
