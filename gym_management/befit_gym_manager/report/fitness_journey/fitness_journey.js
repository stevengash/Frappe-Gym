// // Copyright (c) 2025, SteveNgash and contributors
// // For license information, please see license.txt

// frappe.query_reports["Fitness Journey Report"] = {
//     "filters": [
//         {
//             "fieldname": "member",
//             "label": __("Select Member"),
//             "fieldtype": "Link",
//             "options": "Gym Member",
//             "reqd": 1
//         }
//     ],

//     onload: function(report) {
//         report.page.add_inner_button(__("Show Chart"), function() {
//             frappe.query_report.toggle_chart();
//         });

//         report.page.add_inner_button(__("Refresh Report"), function() {
//             frappe.query_report.refresh();
//         });
//     },

//     "formatter": function(value, row, column, data, default_formatter) {
//         if (column.fieldname === "weight" && value) {
//             return `<span style="color: green; font-weight: bold;">${value} kg</span>`;
//         } 
//         if (column.fieldname === "calories" && value) {
//             return `<span style="color: red; font-weight: bold;">${value} kcal</span>`;
//         }
//         return default_formatter(value, row, column, data);
//     },

//     "get_chart_data": function(columns, result) {
//         let labels = result.map(row => row.date);
//         let weights = result.map(row => row.weight);
//         let calories = result.map(row => row.calories);

//         return {
//             data: {
//                 labels: labels,
//                 datasets: [
//                     {
//                         name: "Weight (kg)",
//                         values: weights
//                     },
//                     {
//                         name: "Calories (kcal)",
//                         values: calories
//                     }
//                 ]
//             },
//             type: "line"
//         };
//     }
// };
frappe.query_reports["Fitness Journey Report"] = {
    "filters": [
        {
            "fieldname": "member",
            "label": __("Select Member"),
            "fieldtype": "Link",
            "options": "Gym Member",
            "reqd": 1
        }
    ],

    onload: function(report) {
        report.page.add_inner_button(__("Show Chart"), function() {
            frappe.query_report.toggle_chart();
        });

        report.page.add_inner_button(__("Refresh Report"), function() {
            frappe.query_report.refresh();
        });
    },

    "formatter": function(value, row, column, data, default_formatter) {
        if (column.fieldname === "weight" && value) {
            return `<span style="color: green; font-weight: bold;">${value} kg</span>`;
        } 
        if (column.fieldname === "calories" && value) {
            return `<span style="color: red; font-weight: bold;">${value} kcal</span>`;
        }
        return default_formatter(value, row, column, data);
    },

    "get_chart_data": function(columns, result) {
        if (!result || result.length === 0) {
            return { message: "No data available for the selected member." };
        }

        let labels = result.map(row => row.date);
        let weights = result.map(row => row.weight);
        let calories = result.map(row => row.calories);

        let chart_data = {
            data: {
                labels: labels,
                datasets: [
                    {
                        name: "Weight (kg)",
                        values: weights
                    },
                    {
                        name: "Calories (kcal)",
                        values: calories
                    }
                ]
            },
            type: "line"
        };

        // Ensure the chart is explicitly set up
        frappe.query_report.setup_chart(chart_data);

        return chart_data;
    }
};
