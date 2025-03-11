// Copyright (c) 2025, SteveNgash and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Gym Workout Plan", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Gym Workout Plan', {
    member: function(frm) {
        if (frm.doc.member) {
            frappe.call({
                method: "gym_management.befit_gym_manager.doctype.gym_workout_plan.gym_workout_plan.get_member_trainer",
                args: {
                    member: frm.doc.member
                },
                callback: function(r) {
                    if (r.message.error) {
                        frappe.msgprint({
                            title: __('Invalid Member'),
                            message: r.message.error,
                            indicator: 'red'
                        });
                        frm.set_value("member", ""); // Reset member field
                        frm.set_value("trainer", ""); // Reset trainer field
                    } else {
                        frm.set_value("trainer", r.message.trainer || "");
                        // frappe.msgprint(__('Trainer auto-selected based on subscription.'));
                    }
                }
            });
        }
    }
});

