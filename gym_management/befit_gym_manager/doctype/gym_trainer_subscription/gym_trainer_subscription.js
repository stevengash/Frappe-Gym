frappe.ui.form.on('Gym Trainer Subscription', {
    validate: function(frm) {
        if (frm.doc.member) {
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: "Gym Membership Plan",
                    filters: {
                        member: frm.doc.member
                    },
                    fieldname: ["status", "start_date", "end_date"]
                },
                async: false, 
                callback: function(response) {
                    if (response.message) {
                        let membership_status = response.message.status;

                        // Convert date strings to Date objects correctly
                        let membership_start = frappe.datetime.str_to_obj(response.message.start_date);
                        let membership_end = frappe.datetime.str_to_obj(response.message.end_date);
                        let subscription_start = frappe.datetime.str_to_obj(frm.doc.start_date);
                        let subscription_end = frappe.datetime.str_to_obj(frm.doc.end_date);

                        // Set status automatically
                        frm.set_value('status', membership_status === "Active" ? "Active" : "Inactive");

                        // Check membership validity
                        if (membership_status === "Expired") {
                            frappe.msgprint(__('Your membership has expired. Please renew before subscribing to a trainer.'));
                            frappe.validated = false;
                        } 
                        else if (membership_status === "Cancelled") {
                            frappe.msgprint(__('Your membership has been cancelled. Please contact the gym administration.'));
                            frappe.validated = false;
                        } 
                        else if (membership_status !== "Active") {
                            frappe.msgprint(__('You must have an active Gym Membership Plan to subscribe to a trainer.'));
                            frappe.validated = false;
                        } 
                        else if (subscription_start < membership_start || subscription_end > membership_end) {
                            frappe.msgprint(__('Subscription dates must be within your membership period: ' + 
                                frappe.datetime.global_date_format(membership_start) + ' to ' + 
                                frappe.datetime.global_date_format(membership_end)));
                            frappe.validated = false;
                        }
                        else if (subscription_start > subscription_end) {
                            frappe.msgprint(__('Start date cannot be greater than end date.'));
                            frappe.validated = false;
                        }
                    } else {
                        frappe.msgprint(__('No Gym Membership Plan found. Please register for a membership first.'));
                        frm.set_value('status', 'Inactive');
                        frappe.validated = false;
                    }
                }
            });
        }
    },

    onload: function(frm) {
        // Make status field read-only
        frm.set_df_property('status', 'read_only', 1);
    }
});
