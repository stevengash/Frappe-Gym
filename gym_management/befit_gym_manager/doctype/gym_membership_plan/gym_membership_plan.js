// Copyright (c) 2025, SteveNgash and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Gym Membership Plan", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Gym Membership Plan', {
    start_date: function(frm) {
        calculateRemainingDays(frm);
    },
    end_date: function(frm) {
        calculateRemainingDays(frm);
    },
    refresh: function(frm) {
        calculateRemainingDays(frm);
    }
});

function calculateRemainingDays(frm) {
    if (frm.doc.start_date && frm.doc.end_date) {
        // frappe.datetime.get_diff returns the difference (in days) between two dates
        let diff = frappe.datetime.get_diff(frm.doc.end_date, frm.doc.start_date);
        if (diff < 0) {
            frappe.msgprint(__("End Date must be later than Start Date."));
            frm.set_value("remaining_days", 0);
        } else {
            frm.set_value("remaining_days", diff);
            if (diff >= 1) {
                frm.set_value("status", "Active");
            } else {
                frm.set_value("status", "Expired");
            }
        }
    }
}
