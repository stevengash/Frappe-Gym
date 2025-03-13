// Copyright (c) 2025, SteveNgash and contributors
// For license information, please see license.txt

// frappe.query_reports["Revenue Report"] = {
// 	"filters": [

// 	]
// };
frappe.query_reports["Revenue Report by Month"] = {
    "filters": [
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "reqd": 0
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "reqd": 0
        }
    ],

    onload: function(report) {
        report.page.add_inner_button(__("Toggle Chart"), function() {
            frappe.query_report.toggle_chart();
        });

        report.page.add_inner_button(__("Refresh Report"), function() {
            frappe.query_report.refresh();
        });
    },

    "get_chart_data": function(columns, result) {
        if (!result || result.length === 0) {
            return { message: "No revenue data available for the selected date range." };
        }

        let labels = result.map(row => row.month);
        let values = result.map(row => row.total_revenue);

        return {
            data: {
                labels: labels,
                datasets: [
                    {
                        name: "Total Revenue (Ksh)",
                        values: values
                    }
                ]
            },
            type: "bar"
        };
    }
};
