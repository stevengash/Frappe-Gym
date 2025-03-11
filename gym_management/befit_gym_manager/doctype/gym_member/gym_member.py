import frappe
from frappe.model.document import Document

class GymMember(Document):
    def validate(self):
        if self.phone_number and len(self.phone_number) != 13:
            frappe.throw("Phone number must be exactly 13 characters long.")
        if self.emergency_contact and len(self.emergency_contact) != 13:
            frappe.throw("Emergency contact must be exactly 13 characters long.")
