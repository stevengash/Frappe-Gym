// Copyright (c) 2025, SteveNgash and contributors
// For license information, please see license.txt

// frappe.query_reports["gym class booking"] = {
// 	"filters": [

// 	]
// };
// Copyright (c) 2025, Your Name
// For license information, please see license.txt

frappe.query_reports["Gym Class Booking Report"] = {
    "filters": [
        {
            "fieldname": "from_date",
            "label": "From Date",
            "fieldtype": "Date",
            "reqd": 0
        },
        {
            "fieldname": "to_date",
            "label": "To Date",
            "fieldtype": "Date",
            "reqd": 0
        }
    ]
};
