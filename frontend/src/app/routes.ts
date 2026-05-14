import { createBrowserRouter } from "react-router";

import { LandingPage } from "./components/LandingPage";

import { Dashboard } from "./components/Dashboard";

import { ComplaintDetails } from "./components/ComplaintDetails";

import { ClientDashboard } from "./components/ClientDashboard";

import { SubmitComplaint } from "./components/SubmitComplaint";

import { ClientComplaintDetails } from "./components/ClientComplaintDetails";

import { M } from "./components/M";

import { C } from "./components/C";

import { A } from "./components/A";

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

  {
    path: "/manager",
    Component: Dashboard,
  },

  {
    path: "/analytics",
    Component: A,
  },

  {
    path: "/complaint/:id",
    Component: ComplaintDetails,
  },

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