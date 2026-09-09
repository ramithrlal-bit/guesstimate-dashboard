let totalRegistrationsChart = null;

/*
 * Current dropdown selection ke according value format karega.
 *
 * Common functions:
 * getSelectedValueFormat()
 * formatNumberBySelection(value, format)
 * formatVahanTooltipValue(value)
 *
 * Chart dataset me raw counts hi rahenge.
 * Sirf tooltip aur popup table ki values format hongi.
 */
function formatTotalRegistrationValue(value) {

    if (typeof formatVahanTooltipValue === "function") {
        return formatVahanTooltipValue(value);
    }

    if (typeof formatNumberBySelection === "function") {

        const selectedFormat =
            typeof getSelectedValueFormat === "function"
                ? getSelectedValueFormat()
                : ($("#valueFormatDropdown").val() || "actual");

        return formatNumberBySelection(value, selectedFormat);
    }

    return Number(value || 0).toLocaleString("en-IN");
}


async function fetchTotalRegistrationsChart(
    stateCode,
    rtoCode,
    toYear,
    fromYear,
    vehicleClasses,
    vehicleMakers,
    vehicleSubCategories,
    vehicleEmissions,
    vehicleFuels,
    timePeriod,
    vehicleCategoryGroup,
    evType,
    vehicleStatus,
    vehicleOwnerType,
    fitnessCheck,
    vehicleType,
    archiveParams
) {

    try {

        archiveParams = archiveParams || {
            archiveTypeAC: "",
            archiveTypeANC: "",
            archiveTypePA: "",
            archiveTypeTA: "",
            archiveTypeNA: ""
        };

        const queryString = new URLSearchParams({
            fromYear: fromYear || "",
            toYear: toYear || "",
            stateCode: stateCode || "",
            rtoCode: rtoCode || "",
            vehicleClasses: vehicleClasses || "",
            vehicleMakers: vehicleMakers || "",
            vehicleSubCategories: vehicleSubCategories || "",
            vehicleEmissions: vehicleEmissions || "",
            vehicleFuels: vehicleFuels || "",
            timePeriod: timePeriod || "",
            vehicleCategoryGroup: vehicleCategoryGroup || "",
            evType: evType || "",
            vehicleStatus: vehicleStatus || "",
            vehicleOwnerType: vehicleOwnerType || "",
            fitnessCheck: fitnessCheck || "",
            vehicleType: vehicleType || "",
            archiveTypeAC: archiveParams.archiveTypeAC || "",
            archiveTypeANC: archiveParams.archiveTypeANC || "",
            archiveTypePA: archiveParams.archiveTypePA || "",
            archiveTypeTA: archiveParams.archiveTypeTA || "",
            archiveTypeNA: archiveParams.archiveTypeNA || ""
        }).toString();

        const response = await fetch(
            `/analytics/publicdashboard/vahandashboard/vahanyearwiseregistrationtrend?${queryString}`,
            {
                method: "GET"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Year-wise registration API failed with status ${response.status}`
            );
        }

        const responseData = await response.json();

        const ctx = document.getElementById("totalRegistrations");

        if (!ctx) {
            console.error("Canvas not found: totalRegistrations");
            return;
        }

        if (totalRegistrationsChart) {
            totalRegistrationsChart.destroy();
            totalRegistrationsChart = null;
        }

        const labels = responseData.labels || [];
        const rawData = responseData.data || [];

        totalRegistrationsChart = new Chart(ctx, {
            type: "line",

            data: {
                labels: labels,
                datasets: [{
                    label: "Vehicle Registrations",

                    /*
                     * Dataset me raw values hi rahengi.
                     * Crore/Lakh/Thousand conversion sirf display me hogi.
                     */
                    data: rawData,

                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.15)",
                    borderWidth: 2,
                    tension: 0,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false
                }]
            },

            options: {
                maintainAspectRatio: false,
                responsive: true,

                interaction: {
                    mode: "index",
                    intersect: false
                },

                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },

                    /*
                     * Hover tooltip selected dropdown unit ke according
                     * formatted value show karega.
                     */
                    tooltip: {
                        callbacks: {
                            label: function (context) {

                                const datasetLabel =
                                    context.dataset.label
                                        ? context.dataset.label + ": "
                                        : "";

                                return datasetLabel +
                                    formatTotalRegistrationValue(
                                        context.raw || 0
                                    );
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },

                    y: {
                        beginAtZero: true,

                        grid: {
                            display: false
                        },

                        /*
                         * Y-axis labels bhi selected dropdown format me
                         * display hongi.
                         */
                        ticks: {
                            callback: function (value) {
                                return formatTotalRegistrationValue(value);
                            }
                        }
                    }
                }
            },

            plugins: [{
                id: "noDataMessageTotalRegistrations",

                beforeDraw: function (chart) {

                    const hasData = chart.data.datasets.some(
                        function (dataset) {

                            return Array.isArray(dataset.data) &&
                                dataset.data.some(function (value) {

                                    return value !== null &&
                                        value !== undefined &&
                                        Number(value) !== 0;
                                });
                        }
                    );

                    if (!hasData) {

                        const width = chart.width;
                        const height = chart.height;
                        const chartContext = chart.ctx;

                        chartContext.save();
                        chartContext.clearRect(0, 0, width, height);
                        chartContext.textAlign = "center";
                        chartContext.textBaseline = "middle";
                        chartContext.font = "16px Arial";
                        chartContext.fillStyle = "#666";
                        chartContext.fillText(
                            "No Data Available",
                            width / 2,
                            height / 2
                        );
                        chartContext.restore();
                    }
                }
            }]
        });

        /*
         * ondblclick use kiya hai taaki chart reload hone par
         * duplicate event listeners na lagen.
         */
        ctx.ondblclick = function () {
            yearwiseregistration(responseData);
        };

    } catch (error) {

        console.error(
            "Total Registrations Chart Error:",
            error
        );

        if (totalRegistrationsChart) {
            totalRegistrationsChart.destroy();
            totalRegistrationsChart = null;
        }
    }
}


function yearwiseregistration(data) {

    const existingModal = document.getElementById(
        "yearwiseregistrationmodal"
    );

    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");

    modal.id = "yearwiseregistrationmodal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "#fff";
    modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    modal.style.padding = "20px";
    modal.style.borderRadius = "10px";
    modal.style.zIndex = "1000";
    modal.style.width = "75vw";
    modal.style.maxWidth = "1000px";
    modal.style.maxHeight = "80vh";
    modal.style.overflowY = "auto";

    const heading = document.createElement("h3");

    heading.textContent = "15 Year Trend of Vehicle Registration";
    heading.style.marginBottom = "15px";
    heading.style.color = "#333";
    heading.style.textAlign = "center";

    modal.appendChild(heading);

    /*
     * Popup heading ke neeche current selected unit show hogi.
     */
    const unitText = document.createElement("div");

    unitText.style.textAlign = "center";
    unitText.style.marginBottom = "12px";
    unitText.style.fontWeight = "600";
    unitText.style.color = "#555";

    const selectedUnit =
        typeof getVahanSelectedUnitLabel === "function"
            ? getVahanSelectedUnitLabel()
            : ($("#valueFormatDropdown").val() || "actual");

    unitText.textContent = "Values shown in: " + selectedUnit;

    modal.appendChild(unitText);

    const table = document.createElement("table");

    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginBottom = "20px";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Years", "Count"].forEach(function (header) {

        const th = document.createElement("th");

        th.style.border = "1px solid #ddd";
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        th.style.textAlign = "left";
        th.textContent = header;

        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    const labels = data.labels || [];
    const values = data.data || [];

    let total = 0;

    labels.forEach(function (label, index) {

        const row = document.createElement("tr");

        const categoryCell = document.createElement("td");

        categoryCell.style.border = "1px solid #ddd";
        categoryCell.style.padding = "8px";
        categoryCell.textContent = label;

        const valueCell = document.createElement("td");

        valueCell.style.border = "1px solid #ddd";
        valueCell.style.padding = "8px";

        const rawValue = Number(values[index] || 0);

        /*
         * Popup row value selected dropdown format me show hogi.
         */
        valueCell.textContent =
            formatTotalRegistrationValue(rawValue);

        total += rawValue;

        row.appendChild(categoryCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });

    const totalRow = document.createElement("tr");

    totalRow.style.fontWeight = "bold";

    const totalLabelCell = document.createElement("td");

    totalLabelCell.style.border = "1px solid #ddd";
    totalLabelCell.style.padding = "8px";
    totalLabelCell.style.backgroundColor = "#f2f2f2";
    totalLabelCell.textContent = "Total";

    const totalValueCell = document.createElement("td");

    totalValueCell.style.border = "1px solid #ddd";
    totalValueCell.style.padding = "8px";
    totalValueCell.style.backgroundColor = "#f2f2f2";

    /*
     * Popup total bhi selected dropdown format me show hoga.
     */
    totalValueCell.textContent =
        formatTotalRegistrationValue(total);

    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalValueCell);

    tbody.appendChild(totalRow);
    table.appendChild(tbody);
    modal.appendChild(table);

    const closeButton = document.createElement("button");

    closeButton.textContent = "Close";
    closeButton.style.backgroundColor = "#ff4d4d";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.display = "block";
    closeButton.style.margin = "10px auto 0";

    closeButton.addEventListener("click", function () {

        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    });

    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}


/*
 * Dropdown change par API dobara hit nahi hogi.
 *
 * Chart raw data same rahega.
 * Tooltip, Y-axis aur open popup latest selected format me update honge.
 */
$(document)
    .off(
        "change.totalRegistrationsValueFormat",
        "#valueFormatDropdown"
    )
    .on(
        "change.totalRegistrationsValueFormat",
        "#valueFormatDropdown",
        function () {

            if (totalRegistrationsChart) {
                totalRegistrationsChart.update();
            }

            const openPopup = document.getElementById(
                "yearwiseregistrationmodal"
            );

            if (openPopup && totalRegistrationsChart) {

                const currentResponseData = {
                    labels:
                        totalRegistrationsChart.data.labels || [],

                    data:
                        totalRegistrationsChart.data.datasets[0]
                            ? totalRegistrationsChart
                                .data
                                .datasets[0]
                                .data || []
                            : []
                };

                yearwiseregistration(currentResponseData);
            }
        }
    );