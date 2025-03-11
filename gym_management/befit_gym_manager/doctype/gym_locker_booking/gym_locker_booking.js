function assign_random_locker(frm) {
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Gym Locker",
            filters: { status: "Available" },
            fields: ["locker_number"]
        },
        callback: function(r) {
            if (r.message && r.message.length > 0) {
                let randomLocker = r.message[Math.floor(Math.random() * r.message.length)].locker_number;
                frm.set_value("locker_number", randomLocker);
                // frappe.msgprint(__('Assigned Locker: ' + randomLocker));
            } else {
                frappe.msgprint(__('No available lockers.'));
            }
        }
    });
}

frappe.ui.form.on('Gym Locker Booking', {
    validate: function(frm) {
        if (!frm.doc.booking_date || !frm.doc.duration) {
            frappe.msgprint(__('Please enter a booking date and duration.'));
            frappe.validated = false;
            return;
        }

        frappe.call({
            method: "gym_management.befit_gym_manager.doctype.gym_locker_booking.gym_locker_booking.check_booking_conflict",
            args: {
                locker_number: frm.doc.locker_number,
                booking_date: frm.doc.booking_date,
                duration: frm.doc.duration
            },
            async: false,
            callback: function(r) {
                if (r.message && r.message.conflict) {
                    frappe.msgprint(__('This locker is already booked during the selected time. Choose a different time or locker.'));
                    frappe.validated = false;
                }
            }
        });
    }
});
