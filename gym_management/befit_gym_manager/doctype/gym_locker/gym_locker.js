frappe.ui.form.on('Gym Locker', {
    refresh: function(frm) {
        update_locker_status(frm);
    },

    last_maintenance_date: function(frm) {
        update_locker_status(frm);
    }
});

function update_locker_status(frm) {
    if (frm.doc.last_maintenance_date) {
        let lastMaintenance = new Date(frm.doc.last_maintenance_date);
        let threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        if (lastMaintenance < threeMonthsAgo) {
            frm.set_value("status", "Maintenance");
        } else if (!frm.doc.assigned_member) {
            frm.set_value("status", "Available");
        } else {
            frm.set_value("status", "Occupied");
        }
    }
}
