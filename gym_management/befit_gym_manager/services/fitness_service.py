# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_member_fitness_data(member):
#     """Fetch fitness data for a given gym member."""
#     if not member:
#         frappe.throw(_("Member is required"))

#     data = frappe.get_all(
#         "Gym Metrics",
#         filters={"parent": member},
#         fields=["date", "weight", "calories"],
#         order_by="date asc"
#     )
#     return data
import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)  # Ensure only authenticated users can access
def get_member_fitness_data(member):
    """Fetch fitness data for a given gym member."""
    if not member:
        frappe.throw(_("Member is required"))

    data = frappe.get_all(
        "Gym Metrics",
        filters={"member": member},  # 'member' instead of 'parent' for clarity
        fields=["name", "date", "weight", "calories"],
        order_by="date asc"
    )
    return data

