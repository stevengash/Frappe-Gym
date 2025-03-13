// // Copyright (c) 2025, SteveNgash and contributors
// // For license information, please see license.txt

// // frappe.ui.form.on("Gym Member", {
// // 	refresh(frm) {

// // 	},
// // });
// function assign_random_trainer(frm) {
//     frappe.call({
//         method: "frappe.client.get_list",
//         args: {
//             doctype: "Gym Trainer",
//             fields: ["name"],
//             limit_page_length: 100 // Fetch up to 100 trainers
//         },
//         callback: function(r) {
//             if (r.message.length > 0) {
//                 let randomTrainer = r.message[Math.floor(Math.random() * r.message.length)].name;
//                 frm.set_value("trainer_assigned", randomTrainer);
//                 // frappe.msgprint(__("Trainer Assigned: " + randomTrainer));
//             }
//         }
//     });
// }
// frappe.ui.form.on('Gym Member', {
//     onload: function(frm) {
//         if (frm.is_new() && !frm.doc.trainer_assigned) {
//             assign_random_trainer(frm);
//         }
//     }
// });
