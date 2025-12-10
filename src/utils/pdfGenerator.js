import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(rows, sitename = "Site", fromDate, toDate) {
    const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const usableWidth = pageWidth - margin * 2;

    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("SiteSync - Daily Updates Summary", margin, 60);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(sitename, margin, 80);

    const fromLabel = formatDisplayDate(fromDate);
    const toLabel = formatDisplayDate(toDate);
    const generatedAt = formatDisplayDateTime(new Date());

    doc.setFontSize(10);
    doc.text(`Report Period: ${fromLabel} - ${toLabel}`, margin, 106);
    doc.text(`Generated: ${generatedAt}`, margin, 122);

    // Prepare table data
const tableRows = rows.map((r) => [
    formatDisplayDate(r.date),
    r.workers != null ? r.workers : 0,
    r.worker_wage||0,
    r.expenses||0,
    r.description || "",
    r.summary || " ",
]);


    // Use autoTable function directly (not as method)
autoTable(doc, {
    startY: 140,
    head: [["Date", "Workers","Worker Wage", "Other Expenses", "Description", "Work Summary"]],
    body: tableRows,
    styles: {
        fontSize: 10,
        cellPadding: 6,
        valign: "top",
    },
    headStyles: {
        fillColor: [33, 150, 243],
        textColor: 255,
        halign: "left",
    },
    columnStyles: {
        0: { cellWidth: 70 },                            // Date
        1: { cellWidth: 60, halign: "right" },           // Workers
        2: { cellWidth: 80, halign: "right" },           // Other Expenses
        3: { cellWidth: 80, halign: "right" },           // Worker Wage
        4: { cellWidth: 150, overflow: "linebreak" },    // Description
        5: { overflow: "linebreak" },                    // Summary (auto width)
    },
    margin: { left: margin, right: margin },
    didDrawPage: function () {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(9);
        doc.text(
            `© ${new Date().getFullYear()} SiteSync. All Rights Reserved. | Page ${
                doc.internal.getCurrentPageInfo().pageNumber
            } of ${pageCount}`,
            margin,
            doc.internal.pageSize.getHeight() - 30
        );
    },
});


    // Summary Statistics
    const finalY = doc.lastAutoTable.finalY + 30;
    const totals = computeTotals(rows);

    // Check if we need a new page
    if (finalY > doc.internal.pageSize.getHeight() - 140) {
        doc.addPage();
    }

    const summaryY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 160;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Summary Statistics", margin, summaryY);

    doc.setFont("helvetica", "normal");
const stats = [
    `• Total Days Reported: ${totals.daysReported}`,
    `• Total Workers (cumulative): ${totals.totalWorkers}`,
    `• Total Worker Wage: ${formatCurrency(totals.totalWorkerWage)}`,
    `• Total Other Expenses: ${formatCurrency(totals.totalExpenses)}`,
   
];


    let y = summaryY + 16;
    stats.forEach((s) => {
        doc.setFontSize(10);
        doc.text(s, margin, y);
        y += 14;
    });

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(
        `Total Expense for ${fromLabel} to ${toLabel}: ${formatCurrency(totals.totalExpenses)} (Other) + ${formatCurrency(totals.totalWorkerWage)} (Wages) = ${formatCurrency(totals.grandTotal)} (Grand Total)`
,
        margin,
        y + 10
    );

    return doc;
}

function formatDisplayDate(isoDate) {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatDisplayDateTime(dateObj) {
    return dateObj.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatCurrency(val) {
    if (val == null || val === "") return "";
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(Number(val));
}

function computeTotals(rows) {
    const daysReported = rows.length;
    let totalWorkers = 0;
    let totalExpenses = 0;
    let totalWorkerWage = 0;

    rows.forEach((r) => {
        totalWorkers += Number(r.workers || 0);
        totalExpenses += Number(r.expenses || 0);
        totalWorkerWage += Number(r.worker_wage || 0);  // <-- KEY
    });

    const avgWorkers = daysReported ? Math.round(totalWorkers / daysReported) : 0;
    const avgExpense = daysReported ? Math.round(totalExpenses / daysReported) : 0;
    const avgWage = daysReported ? Math.round(totalWorkerWage / daysReported) : 0;

    return {
        daysReported,
        totalWorkers,
        totalExpenses,
        grandTotal: totalExpenses + totalWorkerWage,  
        totalWorkerWage,
        avgWorkers,
        avgExpense,
        avgWage,
    };
}
