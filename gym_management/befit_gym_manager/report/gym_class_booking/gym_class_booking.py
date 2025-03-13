# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
    filters = frappe._dict(filters or {})

    # Define report columns
    columns = get_columns()

    # Fetch data
    data = get_data(filters)

    return columns, data

def get_columns():
    """Define columns for the report."""
    return [
        {
            "label": "Class Name",
            "fieldname": "class_name",
            "fieldtype": "Data",
            "width": 200
        },
        {
            "label": "Booking Date",
            "fieldname": "date",  # Fixed: Changed fieldname from booking_date to date
            "fieldtype": "Date",
            "width": 120
        },
        {
            "label": "Total Bookings",
            "fieldname": "total_bookings",
            "fieldtype": "Int",
            "width": 120
        }
    ]

def get_data(filters):
    """Fetch and process data for the report."""
    conditions = []

    # Apply date filters correctly (using `date` instead of `booking_date`)
    if filters.get("from_date"):
        conditions.append(f"DATE(`date`) >= '{filters.from_date}'")

    if filters.get("to_date"):
        conditions.append(f"DATE(`date`) <= '{filters.to_date}'")

    where_clause = " AND ".join(conditions) if conditions else "1=1"

    query = f"""
        SELECT 
            class_name,
            `date`,  # Fixed: Include the correct booking date field
            COUNT(name) AS total_bookings
        FROM 
            `tabGym Class Booking`
        WHERE 
            {where_clause}
        GROUP BY 
            class_name, `date`
        ORDER BY 
            `date` DESC, total_bookings DESC
    """

    return frappe.db.sql(query, as_dict=True)
