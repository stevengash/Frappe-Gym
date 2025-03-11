// Copyright (c) 2025, SteveNgash and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Gym Class Booking", {
// 	refresh(frm) {

// 	},
// });
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
                frm.set_value("trainer", randomTrainer);
                // frappe.msgprint(__("Trainer Assigned: " + randomTrainer));
            }
        }
    });
}
frappe.ui.form.on('Gym Class Booking', {
    onload: function(frm) {
        if (frm.is_new() && !frm.doc.trainer) {
            assign_random_trainer(frm);
        }
    }
});
frappe.ui.form.on('Gym Class Booking', {
    onload: function(frm) {
        // Make status field read-only
        frm.set_df_property('status', 'read_only', 1);
    },

    validate: function(frm) {
        if (frm.doc.member) {
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: "Gym Membership Plan",
                    filters: {
                        member: frm.doc.member
                    },
                    fieldname: ["status"]
                },
                async: false, // Ensures the validation waits for the response
                callback: function(response) {
                    if (response.message) {
                        let membership_status = response.message.status;

                        if (membership_status === "Expired") {
                            frappe.msgprint(__('Please renew your membership.'));
                            frm.set_value('status', 'Inactive');
                            frappe.validated = false;
                        } 
                        else if (membership_status === "Cancelled") {
                            frappe.msgprint(__('Your membership has been cancelled. Please contact the gym administration.'));
                            frm.set_value('status', 'Inactive');
                            frappe.validated = false;
                        } 
                        else if (membership_status === "Active") {
                            frm.set_value('status', 'Active');
                        } 
                        else {
                            frappe.msgprint(__('This member does not have an active Gym Membership Plan.'));
                            frm.set_value('status', 'Inactive');
                            frappe.validated = false;
                        }
                    } else {
                        frappe.msgprint(__('This member does not have any Gym Membership Plan.'));
                        frm.set_value('status', 'Inactive');
                        frappe.validated = false;
                    }
                }
            });
        }
    }
});

