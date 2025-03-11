// // Copyright (c) 2025, SteveNgash and contributors
// // For license information, please see license.txt

// // frappe.ui.form.on("Gym Metrics", {
// // 	refresh(frm) {

// // 	},
// // });
// frappe.ui.form.on("Gym Metrics", {
//     member: function(frm) {
//         if (frm.doc.member) {
//             frappe.db.get_value("Gym Member", frm.doc.member, "joining_date")
//                 .then(r => {
//                     if (r.message && r.message.joining_date) {
//                         frm.set_value("entry_date", r.message.joining_date);
//                     }
//                 });
//         }
//     }
// });
