# Copyright (c) 2025, SteveNgash and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class GymLockerBooking(Document):
	pass
import frappe
from datetime import timedelta

@frappe.whitelist()
def check_booking_conflict(locker_number, booking_date, duration):
    booking_date = frappe.utils.get_datetime(booking_date)
    end_time = booking_date + timedelta(hours=int(duration))

    # Fetch existing bookings for the same locker
    conflicting_booking = frappe.get_all(
        "Gym Locker Booking",
        filters={
            "locker_number": locker_number
        },
        fields=["booking_date", "duration"]
    )

    for booking in conflicting_booking:
        existing_start = frappe.utils.get_datetime(booking.booking_date)
        existing_end = existing_start + timedelta(hours=int(booking.duration))

        # Check if the new booking overlaps with an existing booking
        if not (end_time <= existing_start or booking_date >= existing_end):
            return {"conflict": True}

    return {"conflict": False}
