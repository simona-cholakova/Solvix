export let complaints = [
  {
    "complaint_id": "C-001",
    "customer_name": "John Smith",
    "complaint_type": "Product Quality",
    "status": "Pending",
    "department": "Returns",
    "date_submitted": "2026-03-01"
  },
  {
    "complaint_id": "C-002",
    "customer_name": "Sarah Johnson",
    "complaint_type": "Delivery Delay",
    "status": "In Progress",
    "department": "Logistics",
    "date_submitted": "2026-03-02"
  },
  {
    "complaint_id": "C-003",
    "customer_name": "Michael Brown",
    "complaint_type": "Customer Service",
    "status": "Resolved",
    "department": "Customer Support",
    "date_submitted": "2026-02-28"
  },
  {
    "complaint_id": "C-004",
    "customer_name": "Emily Davis",
    "complaint_type": "Billing Issue",
    "status": "Pending",
    "department": "Finance",
    "date_submitted": "2026-03-03"
  },
  {
    "complaint_id": "C-005",
    "customer_name": "David Wilson",
    "complaint_type": "Product Defect",
    "status": "In Progress",
    "department": "Returns",
    "date_submitted": "2026-03-01"
  },
  {
    "complaint_id": "C-006",
    "customer_name": "Lisa Anderson",
    "complaint_type": "Wrong Item",
    "status": "Resolved",
    "department": "Logistics",
    "date_submitted": "2026-02-27"
  },
  {
    "complaint_id": "C-007",
    "customer_name": "Robert Taylor",
    "complaint_type": "Technical Issue",
    "status": "Pending",
    "department": "Technical Support",
    "date_submitted": "2026-03-04"
  },
  {
    "complaint_id": "C-008",
    "customer_name": "Jennifer Martinez",
    "complaint_type": "Refund Request",
    "status": "In Progress",
    "department": "Finance",
    "date_submitted": "2026-03-02"
  },
  {
    "complaint_id": "C-009",
    "customer_name": "William Garcia",
    "complaint_type": "Service Quality",
    "status": "Pending",
    "department": "Customer Support",
    "date_submitted": "2026-03-05"
  },
  {
    "complaint_id": "C-010",
    "customer_name": "Mary Rodriguez",
    "complaint_type": "Packaging Damage",
    "status": "Resolved",
    "department": "Logistics",
    "date_submitted": "2026-03-01"
  }
]

export let complaintsDetails = [
  {
    "complaint_id": "C-001",
    "customer_name": "John Smith",
    "complaint_type": "Product Quality",
    "status": "Pending",
    "department": "Returns",
    "date_submitted": "2026-03-01",
    "resolved_date": null,
    "description": "I ordered a jacket (Order #7AI-2026-0234) but it arrived with a broken zipper. The packaging was intact, so the damage must have occurred before shipping. I would like to request a full refund or a replacement. I have attached photos of the defect for your review.",
    "attachments": [
      {
        "filename": "product_defect.jpg",
        "size": "1.2 MB"
      },
      {
        "filename": "order_receipt.pdf",
        "size": "245 KB"
      }
    ],
    "internal_notes": "",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-01T09:15:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-002",
    "customer_name": "Sarah Johnson",
    "complaint_type": "Delivery Delay",
    "status": "In Progress",
    "department": "Logistics",
    "date_submitted": "2026-03-02",
    "resolved_date": null,
    "description": "My package was expected three days ago but the tracking has not updated since dispatch. I need an update on the shipment status and estimated delivery date.",
    "attachments": [
      {
        "filename": "tracking_screenshot.png",
        "size": "860 KB"
      }
    ],
    "internal_notes": "Forwarded to logistics for shipment investigation.",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-02T08:20:00Z"
      },
      {
        "status": "In Progress",
        "timestamp": "2026-03-03T11:45:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-003",
    "customer_name": "Michael Brown",
    "complaint_type": "Customer Service",
    "status": "Resolved",
    "department": "Customer Support",
    "date_submitted": "2026-02-28",
    "resolved_date": "2026-03-02",
    "description": "I contacted customer support twice regarding my issue and did not receive a response for over a week. This delay was very frustrating.",
    "attachments": [],
    "internal_notes": "Customer apologized to and provided with discount voucher.",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-02-28T14:10:00Z"
      },
      {
        "status": "Resolved",
        "timestamp": "2026-03-02T10:00:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-004",
    "customer_name": "Emily Davis",
    "complaint_type": "Billing Issue",
    "status": "Pending",
    "department": "Finance",
    "date_submitted": "2026-03-03",
    "resolved_date": null,
    "description": "I was charged twice for the same purchase. Please investigate the duplicate transaction and issue a refund if necessary.",
    "attachments": [
      {
        "filename": "bank_statement.pdf",
        "size": "540 KB"
      }
    ],
    "internal_notes": "",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-03T13:30:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-005",
    "customer_name": "David Wilson",
    "complaint_type": "Product Defect",
    "status": "In Progress",
    "department": "Returns",
    "date_submitted": "2026-03-01",
    "resolved_date": null,
    "description": "The electronic device I received overheats after a few minutes of usage. I believe the product may be defective.",
    "attachments": [
      {
        "filename": "device_photo.jpg",
        "size": "1.8 MB"
      },
      {
        "filename": "serial_number.txt",
        "size": "4 KB"
      }
    ],
    "internal_notes": "Awaiting inspection results from returns department.",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-01T15:00:00Z"
      },
      {
        "status": "In Progress",
        "timestamp": "2026-03-02T09:10:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-006",
    "customer_name": "Lisa Anderson",
    "complaint_type": "Wrong Item",
    "status": "Resolved",
    "department": "Logistics",
    "date_submitted": "2026-02-27",
    "resolved_date": "2026-03-01",
    "description": "I received the wrong color and size compared to what I ordered online.",
    "attachments": [
      {
        "filename": "wrong_item.jpg",
        "size": "920 KB"
      }
    ],
    "internal_notes": "Replacement item shipped successfully.",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-02-27T16:45:00Z"
      },
      {
        "status": "Resolved",
        "timestamp": "2026-03-01T12:15:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-007",
    "customer_name": "Robert Taylor",
    "complaint_type": "Technical Issue",
    "status": "Pending",
    "department": "Technical Support",
    "date_submitted": "2026-03-04",
    "resolved_date": null,
    "description": "The mobile application crashes immediately after login on Android devices.",
    "attachments": [
      {
        "filename": "crash_log.txt",
        "size": "38 KB"
      },
      {
        "filename": "screen_recording.mp4",
        "size": "5.6 MB"
      }
    ],
    "internal_notes": "",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-04T07:50:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-008",
    "customer_name": "Jennifer Martinez",
    "complaint_type": "Refund Request",
    "status": "In Progress",
    "department": "Finance",
    "date_submitted": "2026-03-02",
    "resolved_date": null,
    "description": "I returned the item over two weeks ago but have not yet received the refund.",
    "attachments": [
      {
        "filename": "return_receipt.pdf",
        "size": "320 KB"
      }
    ],
    "internal_notes": "Refund request verified and pending approval.",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-02T10:40:00Z"
      },
      {
        "status": "In Progress",
        "timestamp": "2026-03-03T09:00:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-009",
    "customer_name": "William Garcia",
    "complaint_type": "Service Quality",
    "status": "Pending",
    "department": "Customer Support",
    "date_submitted": "2026-03-05",
    "resolved_date": null,
    "description": "The representative I spoke with was unhelpful and disconnected the call before resolving my issue.",
    "attachments": [],
    "internal_notes": "",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-05T11:25:00Z"
      }
    ]
  },
  {
    "complaint_id": "C-010",
    "customer_name": "Mary Rodriguez",
    "complaint_type": "Packaging Damage",
    "status": "Resolved",
    "department": "Logistics",
    "date_submitted": "2026-03-01",
    "resolved_date": "2026-03-03",
    "description": "The product box arrived heavily damaged and partially opened during delivery.",
    "attachments": [
      {
        "filename": "damaged_package.jpg",
        "size": "1.4 MB"
      }
    ],
    "internal_notes": "Customer compensated with replacement shipment.",
    "history": [
      {
        "status": "Pending",
        "timestamp": "2026-03-01T17:20:00Z"
      },
      {
        "status": "Resolved",
        "timestamp": "2026-03-03T08:35:00Z"
      }
    ]
  }
]
