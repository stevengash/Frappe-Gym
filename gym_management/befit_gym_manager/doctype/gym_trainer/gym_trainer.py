# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime, add_days, get_datetime

class GymTrainer(Document):
    def validate(self):
        """Validation checks when saving Gym Trainer."""
        self.validate_phone_number()
        self.limit_trainers()  # ✅ Ensure this is now inside the class

    def validate_phone_number(self):
        """Ensure phone number is exactly 13 characters long."""
        if self.phone_number and len(self.phone_number) != 13:
            frappe.throw("Phone number must be exactly 13 characters long.")

    def limit_trainers(self):
        """Ensure no more than max_trainers are added within 30 days."""
        last_30_days = add_days(now_datetime(), -30)
        last_30_days_str = get_datetime(last_30_days).strftime('%Y-%m-%d %H:%M:%S')

        # ✅ Count trainers added in the last 30 days
        new_trainers = frappe.db.count("Gym Trainer", {"creation": (">=", last_30_days_str)})

        # ✅ Fetch Gym Settings safely
        max_trainers = frappe.db.get_single_value("Gym Settings", "max_trainers") or 20  # Default to 2 if missing

        # Debug message
        frappe.msgprint(f"Trainers added in the last 30 days: {new_trainers}/{max_trainers} allowed.")

        # Restrict trainer addition if limit is reached
        if new_trainers >= max_trainers:
            frappe.throw(f"Maximum limit of {max_trainers} new trainers in the last 30 days reached. Trainers added: {new_trainers}")

        

    # def limit_trainers(self):
    #     """Ensure no more than max_trainers are added within 30 days."""
    #     last_30_days = add_days(now_datetime(), -30)

    #     # Convert last_30_days to string format for DB query
    #     last_30_days_str = get_datetime(last_30_days).strftime('%Y-%m-%d %H:%M:%S')

    #     # Count trainers added in the last 30 days
    #     new_trainers = frappe.db.count("Gym Trainer", {"creation": (">=", last_30_days_str)})

    #     # ✅ Fetch max_trainers from Gym Settings correctly
    #     gym_settings = frappe.get_single("Gym Settings")  # Ensure Gym Settings is fetched
    #     max_trainers = gym_settings.max_trainers if gym_settings.max_trainers else 2  # Default to 2 if not set

    #     # Debug message (shows in UI when adding a trainer)
    #     frappe.msgprint(f"Trainers added in the last 30 days: {new_trainers}/{max_trainers} allowed.")

    #     # Restrict trainer addition if limit is reached
    #     if new_trainers >= max_trainers:
    #         frappe.throw(f"Maximum limit of {max_trainers} new trainers in the last 30 days reached. Trainers added: {new_trainers}")
