import express from 'express'
import {complaints, complaintsDetails} from './db.js'
//const express = require('express')
const app = express()
const port = 3000

app.get('/allComplaints', (req, res) => {
  res.json(complaints);
})

app.get('/getComplaintDetails/:complaintId', (req, res) => {
  let complaintId = req.params.complaintId;

  if(!complaintId) {
    res.status(400).json({error: 'Invalid complaint id'});
    return;
  }

  let complaintDetails = complaintsDetails.find(complaint => complaint.complaint_id === complaintId);
  res.json(complaintDetails);
})

app.post('/addComplaint', (req, res) => {
  const newComplaint = req.body;

  // basic validation
  if (
    !newComplaint.customer_name ||
    !newComplaint.complaint_type ||
    !newComplaint.description
  ) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  // generate new complaint ID
  const nextId =
    complaints.length + 1;

  const complaintId = `C-${String(nextId).padStart(3, "0")}`;

  // simplified complaint object
  const complaintListItem = {
    complaint_id: complaintId,
    customer_name: newComplaint.customer_name,
    complaint_type: newComplaint.complaint_type,
    status: "Pending",
    department: newComplaint.department || "Customer Support",
    date_submitted: new Date()
      .toISOString()
      .split("T")[0]
  };

  // detailed complaint object
  const complaintDetail = {
    complaint_id: complaintId,
    customer_name: newComplaint.customer_name,
    complaint_type: newComplaint.complaint_type,
    status: "Pending",
    department: newComplaint.department || "Customer Support",
    date_submitted: new Date()
      .toISOString()
      .split("T")[0],
    resolved_date: null,
    description: newComplaint.description,
    attachments: newComplaint.attachments || [],
    internal_notes: "",
    history: [
      {
        status: "Pending",
        timestamp: new Date().toISOString()
      }
    ]
  };

  complaints.push(complaintListItem);
  details.push(complaintDetail);


  res.status(201).json({
    message: "Complaint created successfully",
    complaint: complaintDetail
  });
});

app.put("/complaints/:id", (req, res) => {
  const complaintId = req.params.id;
  const { status, department } = req.body;

  const complaint = complaints.find(
    c => c.complaint_id === complaintId
  );

  const complaintDetail = details.find(
    c => c.complaint_id === complaintId
  );

  if (!complaint || !complaintDetail) {
    return res.status(404).json({
      error: "Complaint not found"
    });
  }

  // update status
  if (status) {
    complaint.status = status;
    complaintDetail.status = status;

    complaintDetail.history.push({
      status,
      timestamp: new Date().toISOString()
    });

    // automatically set resolved date
    if (status === "Resolved") {
      complaintDetail.resolved_date =
        new Date().toISOString().split("T")[0];
    }
  }

  // update department
  if (department) {
    complaint.department = department;
    complaintDetail.department = department;
  }

  res.json({
    message: "Complaint updated successfully",
    complaint: complaintDetail
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

