import express from 'express'
import cors from 'cors'
import {complaintsDetails} from './db.js'
//const express = require('express')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/allComplaints', (req, res) => {
  res.json(complaintsDetails);
})

app.get('/getComplaintDetails/:complaintId', (req, res) => {
  let complaintId = req.params.complaintId;

  if(!complaintId) {
    res.status(400).json({error: 'Invalid complaint id'});
    return;
  }

  let complaintDetails = complaintsDetails.find(complaint => complaint.id === complaintId);
  res.json(complaintDetails);
})

app.post('/addComplaint', (req, res) => {
  const newComplaint = req.body;
  console.log(newComplaint);

  if (!newComplaint) {
    return res.status(400).json({
      error: "Invalid request body"
    });
  }

  // basic validation
  if (
    !newComplaint.customerName ||
    !newComplaint.complaintType ||
    !newComplaint.description
  ) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  // generate new complaint ID
  const nextId =
    complaintsDetails.length + 1;

  const complaintId = `C-${String(nextId).padStart(3, "0")}`;

  // simplified complaint object
  const complaintListItem = {
    id : complaintId,
    customerName: newComplaint.customerName,
    complaintType: newComplaint.complaint_type,
    status: "Pending",
    department: newComplaint.department || "Customer Support",
    date_submitted: new Date()
      .toISOString()
      .split("T")[0]
  };

  // detailed complaint object
  const complaintDetail = {
    id: complaintId,
    customerName: newComplaint.customerName,
    complaintType: newComplaint.complaintType,
    status: "Pending",
    department: newComplaint.department || "Customer Support",
    dateSubmitted: new Date()
      .toISOString()
      .split("T")[0],
    resolvedDate: null,
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

  complaintsDetails.push(complaintDetail);


  res.status(201).json({
    message: "Complaint created successfully",
    complaint: complaintDetail
  });
});

app.put("/complaints/:id", (req, res) => {
  const complaintId = req.params.id;
  const { status, department } = req.body;

  const complaintDetail = complaintsDetails.find(
    c => c.id === complaintId
  );

  if (!complaintDetail) {
    return res.status(404).json({
      error: "Complaint not found"
    });
  }

  // update status
  if (status) {
    complaintDetail.status = status;

    
    //complaintDetail.history.push({
      //status,
      //timestamp: new Date().toISOString()
    //});

    // automatically set resolved date
    if (status === "Resolved") {
      complaintDetail.resolved_date =
        new Date().toISOString().split("T")[0];
    }
  }

  // update department
  if (department) {
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

