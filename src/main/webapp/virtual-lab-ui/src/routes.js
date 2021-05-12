// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

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
];

export default dashboardRoutes;
