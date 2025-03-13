# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

# import frappe


# def execute(filters=None):
# 	columns, data = [], []
# 	return columns, data
import frappe
from frappe.utils import getdate

def execute(filters=None):
    filters = frappe._dict(filters or {})

    # Define report columns
    columns = get_columns()

    # Fetch data
    data = get_data(filters)

    # Generate chart data
    chart_data = get_chart_data(data)

    return columns, data, None, chart_data

def get_columns():
    """Define columns for the report."""
    return [
        {
            "label": "Month",
            "fieldname": "month",
            "fieldtype": "Data",
            "width": 120
        },
        {
            "label": "Total Revenue (Ksh)",
            "fieldname": "total_revenue",
            "fieldtype": "Currency",
            "width": 150
        }
    ]

def get_data(filters):
    """Fetch and process data for the report."""
    conditions = []

    if filters.get("from_date"):
        conditions.append(f"date(date) >= '{filters.from_date}'")

    if filters.get("to_date"):
        conditions.append(f"date(date) <= '{filters.to_date}'")

    where_clause = " AND ".join(conditions) if conditions else "1=1"

    query = f"""
        SELECT 
            DATE_FORMAT(date, '%Y-%m') AS month,
            SUM(revenue) AS total_revenue
        FROM 
            `tabGym Revenue`
        WHERE 
            {where_clause}
        GROUP BY 
            month
        ORDER BY 
            month ASC
    """

    return frappe.db.sql(query, as_dict=True)

def get_chart_data(data):
    """Prepare chart data for the report."""
    if not data:
        return None

    labels = [row["month"] for row in data]
    values = [row["total_revenue"] for row in data]

    return {
        "data": {
            "labels": labels,
            "datasets": [
                {
                    "name": "Total Revenue (Ksh)",
                    "values": values
                }
            ]
        },
        "type": "bar"
    }
