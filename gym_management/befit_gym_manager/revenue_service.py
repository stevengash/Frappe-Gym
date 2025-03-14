import frappe
from frappe import _

@frappe.whitelist()
def get_monthly_revenue(year):
    """Fetch monthly gym revenue for a given year."""
    if not year:
        frappe.throw(_("Year is required"))

    query = """
        SELECT 
            DATE_FORMAT(date, '%%Y-%%m') AS month,
            SUM(revenue) AS total_revenue
        FROM `tabGym Revenue`
        WHERE YEAR(date) = %(year)s
        GROUP BY month
        ORDER BY month ASC
    """

    data = frappe.db.sql(query, {"year": year}, as_dict=True)
    
    return data
