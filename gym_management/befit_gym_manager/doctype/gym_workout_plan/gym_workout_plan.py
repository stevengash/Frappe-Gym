# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class GymWorkoutPlan(Document):
	pass
# import frappe

# @frappe.whitelist()
# def get_member_trainer(member):
#     """
#     Fetch the trainer assigned to a member from Gym Trainer Subscription.
#     Returns the trainer's name if found; otherwise, returns None.
#     """
#     trainer_subscription = frappe.get_all(
#         "Gym Trainer Subscription",
#         filters={"member": member},
#         fields=["trainer"],
#         order_by="creation desc",  # Get the latest subscription
#         limit_page_length=1
#     )

#     return trainer_subscription[0].trainer if trainer_subscription else None
import frappe

@frappe.whitelist()
def get_member_trainer(member):
    """
    Check if the member has an active Gym Membership Plan.
    If active, return the assigned trainer from Gym Trainer Subscription.
    If not active, return an error message.
    """
    # Check Membership Status
    membership = frappe.get_all(
        "Gym Membership Plan",
        filters={"member": member},
        fields=["status"],
        limit_page_length=1
    )

    if not membership or membership[0].status != "Active":
        return {"error": "Member does not have an active Gym Membership Plan."}

    # Fetch Trainer Subscription
    trainer_subscription = frappe.get_all(
        "Gym Trainer Subscription",
        filters={"member": member},
        fields=["trainer"],
        order_by="creation desc",  # Get the latest subscription
        limit_page_length=1
    )

    return {"trainer": trainer_subscription[0].trainer} if trainer_subscription else {"trainer": None}
