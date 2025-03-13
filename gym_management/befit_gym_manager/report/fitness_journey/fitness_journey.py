# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
    filters = frappe._dict(filters or {})

    columns = get_columns()
    data = get_data(filters)

    return columns, data

def get_columns():
    """Define columns for the fitness journey report."""
    return [
        {
            "label": "Date",
            "fieldname": "date",
            "fieldtype": "Date",
            "width": 120
        },
        {
            "label": "Member Name",
            "fieldname": "member_name",
            "fieldtype": "Data",
            "width": 200
        },
        {
            "label": "Weight (kg)",
            "fieldname": "weight",
            "fieldtype": "Float",
            "width": 120
        },
        {
            "label": "Calories (kcal)",
            "fieldname": "calories",
            "fieldtype": "Float",
            "width": 120
        }
    ]

def get_data(filters):
    """Fetch and process data for the fitness journey report."""
    conditions = []
    
    # Filter by selected member
    if filters.get("member"):
        conditions.append(f"gm.name = '{filters.member}'")

    where_clause = " AND ".join(conditions) if conditions else "1=1"

    query = f"""
        SELECT 
            gm.name AS member_name,
            gm_metrics.date,
            gm_metrics.weight,
            gm_metrics.calories
        FROM 
            `tabGym Member` gm
        JOIN 
            `tabGym Metrics` gm_metrics ON gm.name = gm_metrics.parent
        WHERE 
            {where_clause}
        ORDER BY 
            gm_metrics.date ASC
    """

    return frappe.db.sql(query, as_dict=True)
