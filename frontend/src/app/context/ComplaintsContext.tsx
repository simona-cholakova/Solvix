import { createContext, useContext, useState, ReactNode } from "react";

interface Attachment {
  name: string;
  size: string;
}

interface Complaint {
  id: string;
  customerName: string;
  complaintType: string;
  description: string;
  status: string;
  priority: string;
  department: string;
  dateSubmitted: string;
  resolvedDate?: string;
  attachments: Attachment[];
}

interface ComplaintsContextType {
  complaints: Complaint[];

  addComplaint: (
    complaint: Omit<
      Complaint,
      "id" | "status" | "priority" | "department" | "dateSubmitted"
    >
  ) => void;

  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(
  undefined
);

const initialComplaints: Complaint[] = [
  {
    id: "CMP-001",
    customerName: "John Doe",
    complaintType: "Delivery Delay",
    description:
      "My order was delayed for more than 10 days and I received no updates regarding shipment.",
    status: "Pending",
    priority: "High",
    department: "Logistics",
    dateSubmitted: "2026-05-10",
    attachments: [],
  },

  {
    id: "CMP-002",
    customerName: "Sarah Williams",
    complaintType: "Refund Request",
    description:
      "I returned my item two weeks ago but still haven't received my refund.",
    status: "In Progress",
    priority: "Medium",
    department: "Finance",
    dateSubmitted: "2026-05-09",
    attachments: [],
  },

  {
    id: "CMP-003",
    customerName: "Michael Brown",
    complaintType: "Wrong Item",
    description: "I received the wrong product in my shipment.",
    status: "Resolved",
    priority: "Low",
    department: "Returns",
    dateSubmitted: "2026-05-08",
    resolvedDate: "2026-05-11",
    attachments: [],
  },

  {
    id: "CMP-004",
    customerName: "Emma Davis",
    complaintType: "Technical Issue",
    description:
      "The Zalando mobile app crashes whenever I try to complete checkout.",
    status: "Pending",
    priority: "High",
    department: "Technical Support",
    dateSubmitted: "2026-05-12",
    attachments: [],
  },

  {
    id: "CMP-005",
    customerName: "Lucas Martin",
    complaintType: "Customer Service",
    description:
      "I had a very poor experience with customer support and my issue was not resolved.",
    status: "In Progress",
    priority: "Medium",
    department: "Customer Support",
    dateSubmitted: "2026-05-07",
    attachments: [],
  },
];

export function ComplaintsProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  fetch("http://localhost:3000/allComplaints")
    .then((res) => res.json())
    .then((complaints) => setComplaints(complaints));

  const addComplaint = (
    complaint: Omit<
      Complaint,
      "id" | "status" | "priority" | "department" | "dateSubmitted"
    >
  ) => {
    const priorities = ["High", "Medium", "Low"];

    const randomPriority =
      priorities[Math.floor(Math.random() * priorities.length)];

    const newComplaint: Complaint = {
      ...complaint,

      id: `CMP-${String(complaints.length + 1).padStart(3, "0")}`,

      status: "Pending",

      priority: randomPriority,

      department: "Customer Support",

      dateSubmitted: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:3000/addComplaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComplaint),
    }).then((res) => {
      if (res.status !== 201) {
        throw new Error("Failed to add complaint");
      } else {
        setComplaints([newComplaint, ...complaints]);
      }
    }).catch((err) => {
      console.error(err);
      console.dir(newComplaint)
    });
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    fetch(`http://localhost:3000/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error("Failed to update complaint");
      } else {
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.id === id ? { ...complaint, ...updates } : complaint
          )
        );
      }
    });
  };

  return (
    <ComplaintsContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaint,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintsContext);

  if (!context) {
    throw new Error("useComplaints must be used within ComplaintsProvider");
  }

  return context;
}
