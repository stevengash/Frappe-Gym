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
function assign_random_trainer(frm) {
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Gym Trainer",
            fields: ["name"],
            limit_page_length: 100 // Fetch up to 100 trainers
        },
        callback: function(r) {
            if (r.message.length > 0) {
                let randomTrainer = r.message[Math.floor(Math.random() * r.message.length)].name;
                frm.set_value("trainer_assigned", randomTrainer);
                // frappe.msgprint(__("Trainer Assigned: " + randomTrainer));
            }
        }
    });
}
frappe.ui.form.on('Gym Membership Plan', {
    onload: function(frm) {
        if (frm.is_new() && !frm.doc.trainer_assigned) {
            assign_random_trainer(frm);
        }
    }
});
