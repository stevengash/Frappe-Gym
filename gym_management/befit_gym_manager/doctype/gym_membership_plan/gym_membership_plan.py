# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class GymMembershipPlan(Document):
	pass
# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime

class GymMembershipPlan(Document):
    def after_insert(self):
        if not self.member:
            return  # Ensure member is selected

        # Create a new Gym Revenue entry
        gym_revenue = frappe.get_doc({
            "doctype": "Gym Revenue",
            "member": self.name,
            "revenue": self.price,
            "date": now_datetime().date()
        })
        gym_revenue.insert(ignore_permissions=True)
        frappe.db.commit()
        

    def validate(self):
        plan_prices = {
            "Basic": 5000,
            "Premium": 8000,
            "VIP": 12000
        }

        if self.membership_plan in plan_prices:
            self.price = plan_prices[self.membership_plan]  # Ensure price field exists in doctype
        else:
            frappe.throw("Invalid membership plan. Choose from Basic, Premium, or VIP.")
    
    
