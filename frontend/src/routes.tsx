import { createBrowserRouter } from "react-router";

import { LandingPage } from "./app/components/LandingPage";
import { Dashboard } from "./app/components/Dashboard";
import { ComplaintDetails } from "./app/components/ComplaintDetails";
import { ClientDashboard } from "./app/components/ClientDashboard";
import { SubmitComplaint } from "./app/components/SubmitComplaint";
import { ClientComplaintDetails } from "./app/components/ClientComplaintDetails";
import { M } from "./app/components/M";
import { C } from "./app/components/C";
import { A } from "./app/components/A";
import { ManagerComplaints } from "./app/components/ManagerComplaints (1)";
import { ManagerDepartments } from "./app/components/ManagerDepartments";
import { ManagerSettings } from "./app/components/ManagerSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/manager-login",
    Component: M,
  },
  {
    path: "/client-login",
    Component: C,
  },

  // Manager pages — all share the sidebar
  {
    path: "/manager",
    Component: Dashboard,
  },
  {
    path: "/manager/complaints",
    Component: ManagerComplaints,
  },
  {
    path: "/manager/analytics",
    Component: A,
  },
  {
    path: "/manager/departments",
    Component: ManagerDepartments,
  },
  {
    path: "/manager/settings",
    Component: ManagerSettings,
  },

  // Complaint detail (manager)
  {
    path: "/complaint/:id",
    Component: ComplaintDetails,
  },

  // Client pages
  {
    path: "/client",
    Component: ClientDashboard,
  },
  {
    path: "/client/submit",
    Component: SubmitComplaint,
  },
  {
    path: "/client/complaint/:id",
    Component: ClientComplaintDetails,
  },
]);
