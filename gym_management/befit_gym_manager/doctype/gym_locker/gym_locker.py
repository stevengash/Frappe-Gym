# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class GymLocker(Document):
	pass
import frappe
import random

@frappe.whitelist()
def get_available_locker():
    """
    Fetches a random available locker where:
    - Status is "Available"
    - Last maintenance date is within the last 3 months
    - Not already booked at the selected date & duration
    """
    from datetime import datetime, timedelta
    
    # Calculate 3 months ago from today
    three_months_ago = datetime.today() - timedelta(days=90)
    
    # Fetch available lockers
    available_lockers = frappe.get_all(
        "Gym Locker",
        filters={
            "status": "Available",
            "last_maintenance_date": [">=", three_months_ago]
        },
        fields=["name"]
    )

    # Return a random locker if available
    if available_lockers:
        random_locker = random.choice(available_lockers)["name"]
        return random_locker
    else:
        return None
