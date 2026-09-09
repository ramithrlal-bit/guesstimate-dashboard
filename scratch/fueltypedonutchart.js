
let fuelTypeChart = null;
let fuelTypeChartMode = "category";
let selectedFuelCategory = null;

/*
 * Single-click drill-down aur double-click insight popup
 * ko conflict se bachane ke liye timer.
 */
let fuelTypeClickTimer = null;

/*
 * API ka complete original fuel-wise response preserve rahega.
 * Category conversion ke baad bhi old insight/table functionality
 * isi raw data se work karegi.
 */
let fuelTypeCompleteInsightData = null;

/*
 * Old doughnut legend ki tarah hidden fuel state.
 * Legend click par fuel cut/strike hoga aur uska count
 * category/detail chart se remove hoga.
 */
const hiddenFuelTypes = new Set();

const FUEL_DETAIL_COLORS = [
    "#2563EB", "#F59E0B", "#16A34A", "#DC2626",
    "#7C3AED", "#0891B2", "#DB2777", "#65A30D",
    "#EA580C", "#4F46E5", "#0D9488", "#9333EA",
    "#0284C7", "#CA8A04", "#059669", "#E11D48",
    "#6D28D9", "#0F766E", "#C2410C", "#1D4ED8",
    "#A21CAF", "#15803D", "#B91C1C", "#0369A1",
    "#854D0E", "#047857", "#BE123C", "#5B21B6",
    "#155E75", "#9F1239"
];



/*
 * Bar chart ke niche old donut-chart style fuel insights/legend.
 * Category view mein complete raw fuel list show hogi.
 * Detail view mein selected category ke fuels show honge.
 */
function getFuelInsightLegendContainer(canvas) {

    const legendId =
        canvas.id + "FuelTypeInsightLegend";

    let legendContainer =
        document.getElementById(legendId);

    if (legendContainer) {
        return legendContainer;
    }

    const layout =
        document.getElementById(
            canvas.id + "FuelTypeChartLayout"
        );

    if (!layout) {
        return null;
    }

    legendContainer =
        document.createElement("div");

    legendContainer.id =
        legendId;

    legendContainer.style.width =
        "100%";

    legendContainer.style.display =
        "flex";

    legendContainer.style.flexWrap =
        "wrap";

    legendContainer.style.justifyContent =
        "center";

    legendContainer.style.alignItems =
        "center";

    legendContainer.style.alignContent =
        "flex-start";

    legendContainer.style.columnGap =
        "14px";

    legendContainer.style.rowGap =
        "8px";

    legendContainer.style.padding =
        "12px 10px 6px";

    legendContainer.style.margin =
        "0";

    legendContainer.style.boxSizing =
        "border-box";

    legendContainer.style.overflow =
        "visible";

    legendContainer.style.backgroundColor =
        "transparent";

    layout.appendChild(
        legendContainer
    );

    return legendContainer;
}


/*
 * Fuel insight legend ke liye stable unique colour map.
 */
function getFuelInsightColor(
    fuelName,
    index
) {

    return FUEL_DETAIL_COLORS[
        index % FUEL_DETAIL_COLORS.length
    ];
}


/*
 * Old UI jaisa bottom fuel insight legend render karega.
 */

/*
 * Home/category view mein sirf 3 category insights show karega.
 * Insight colour aur category bar colour exactly same rahega.
 */
function renderFuelCategoryInsightLegend(
    canvas,
    categoryData
) {

    const legendContainer =
        getFuelInsightLegendContainer(
            canvas
        );

    if (!legendContainer) {
        return;
    }

    legendContainer.innerHTML =
        "";

    const categoryLabels =
        Object.keys(
            FUEL_CATEGORY_CONFIG
        );

    categoryLabels.forEach(
        function (categoryName) {

            const categoryConfig =
                FUEL_CATEGORY_CONFIG[
                    categoryName
                ];

            const normalizedCategoryFuels =
                categoryConfig.fuels.map(
                    function (fuelName) {

                        return normalizeFuelTypeName(
                            fuelName
                        );
                    }
                );

            /*
             * Category tab cut tab mana jayega jab
             * us category ke saare fuels hidden hon.
             */
            const isCategoryVisible =
                normalizedCategoryFuels.some(
                    function (fuelName) {

                        return !hiddenFuelTypes.has(
                            fuelName
                        );
                    }
                );

            const categoryValue =
                categoryData &&
                categoryData[categoryName]
                    ? Number(
                        categoryData[
                            categoryName
                        ].total || 0
                    )
                    : 0;


            const legendItem =
                document.createElement(
                    "div"
                );

            legendItem.style.display =
                "inline-flex";

            legendItem.style.alignItems =
                "center";

            legendItem.style.justifyContent =
                "center";

            legendItem.style.maxWidth =
                "100%";

            legendItem.style.cursor =
                "pointer";

            legendItem.style.userSelect =
                "none";

            legendItem.style.boxSizing =
                "border-box";

            legendItem.style.opacity =
                isCategoryVisible
                    ? "1"
                    : "0.45";


            const colorBox =
                document.createElement(
                    "span"
                );

            colorBox.style.width =
                "11px";

            colorBox.style.height =
                "11px";

            colorBox.style.minWidth =
                "11px";

            colorBox.style.flex =
                "0 0 11px";

            colorBox.style.marginRight =
                "4px";

            colorBox.style.borderRadius =
                "50%";

            colorBox.style.backgroundColor =
                categoryConfig.color;

            colorBox.style.border =
                "1px solid rgba(0,0,0,0.12)";


            const labelText =
                document.createElement(
                    "span"
                );

            labelText.textContent =
                categoryName;

            labelText.title =
                categoryName +
                ": " +
                formatFuelTypeValue(
                    categoryValue
                );

            labelText.style.fontFamily =
                "Segoe UI, Arial, sans-serif";

            labelText.style.fontSize =
                "9px";

            labelText.style.lineHeight =
                "14px";

            labelText.style.color =
                "#555555";

            labelText.style.whiteSpace =
                "normal";

            labelText.style.wordBreak =
                "break-word";

            labelText.style.textDecoration =
                isCategoryVisible
                    ? "none"
                    : "line-through";


            legendItem.appendChild(
                colorBox
            );

            legendItem.appendChild(
                labelText
            );


            /*
             * Category insight click:
             * us category ke saare fuels hide/show honge.
             */
            legendItem.onclick =
                function () {

                    if (isCategoryVisible) {

                        normalizedCategoryFuels.forEach(
                            function (fuelName) {

                                hiddenFuelTypes.add(
                                    fuelName
                                );
                            }
                        );

                    } else {

                        normalizedCategoryFuels.forEach(
                            function (fuelName) {

                                hiddenFuelTypes.delete(
                                    fuelName
                                );
                            }
                        );
                    }

                    refreshFuelChartAfterLegendToggle(
                        canvas
                    );
                };


            legendContainer.appendChild(
                legendItem
            );
        }
    );
}


function renderFuelInsightLegend(
    canvas,
    labels,
    values
) {

    const legendContainer =
        getFuelInsightLegendContainer(
            canvas
        );

    if (!legendContainer) {
        return;
    }

    legendContainer.innerHTML =
        "";

    const safeLabels =
        Array.isArray(labels)
            ? labels
            : [];

    const safeValues =
        Array.isArray(values)
            ? values
            : [];

    safeLabels.forEach(
        function (
            label,
            index
        ) {

            const normalizedFuel =
                normalizeFuelTypeName(
                    label
                );

            const isVisible =
                !hiddenFuelTypes.has(
                    normalizedFuel
                );


            const legendItem =
                document.createElement(
                    "div"
                );

            legendItem.style.display =
                "inline-flex";

            legendItem.style.alignItems =
                "center";

            legendItem.style.justifyContent =
                "center";

            legendItem.style.maxWidth =
                "100%";

            legendItem.style.cursor =
                "pointer";

            legendItem.style.userSelect =
                "none";

            legendItem.style.boxSizing =
                "border-box";

            legendItem.style.opacity =
                isVisible
                    ? "1"
                    : "0.45";


            const colorBox =
                document.createElement(
                    "span"
                );

            colorBox.style.width =
                "11px";

            colorBox.style.height =
                "11px";

            colorBox.style.minWidth =
                "11px";

            colorBox.style.flex =
                "0 0 11px";

            colorBox.style.marginRight =
                "4px";

            colorBox.style.borderRadius =
                "50%";

            colorBox.style.backgroundColor =
                getFuelInsightColor(
                    label,
                    index
                );

            colorBox.style.border =
                "1px solid rgba(0,0,0,0.12)";


            const labelText =
                document.createElement(
                    "span"
                );

            labelText.textContent =
                label || "";

            labelText.title =
                (
                    label || ""
                ) +
                ": " +
                formatFuelTypeValue(
                    safeValues[index] || 0
                );

            labelText.style.fontFamily =
                "Segoe UI, Arial, sans-serif";

            labelText.style.fontSize =
                "9px";

            labelText.style.lineHeight =
                "14px";

            labelText.style.color =
                "#555555";

            labelText.style.whiteSpace =
                "normal";

            labelText.style.wordBreak =
                "break-word";

            labelText.style.textDecoration =
                isVisible
                    ? "none"
                    : "line-through";


            legendItem.appendChild(
                colorBox
            );

            legendItem.appendChild(
                labelText
            );


            /*
             * Old pie-chart legend behavior:
             * click => fuel hide/show + label cut/restore.
             */
            legendItem.onclick =
                function () {

                    if (
                        hiddenFuelTypes.has(
                            normalizedFuel
                        )
                    ) {

                        hiddenFuelTypes.delete(
                            normalizedFuel
                        );

                    } else {

                        hiddenFuelTypes.add(
                            normalizedFuel
                        );
                    }

                    refreshFuelChartAfterLegendToggle(
                        canvas
                    );
                };


            legendContainer.appendChild(
                legendItem
            );
        }
    );
}


/*
 * Hidden fuels ke according raw values filter karega.
 */
function getVisibleFuelValues(
    labels,
    values
) {

    return labels.map(
        function (
            label,
            index
        ) {

            const normalizedFuel =
                normalizeFuelTypeName(
                    label
                );

            return hiddenFuelTypes.has(
                normalizedFuel
            )
                ? 0
                : Number(
                    values[index] || 0
                );
        }
    );
}


/*
 * Legend toggle ke baad current category/detail chart refresh.
 */
function refreshFuelChartAfterLegendToggle(
    canvas
) {

    if (!fuelTypeCompleteInsightData) {
        return;
    }

    const visibleValues =
        getVisibleFuelValues(
            fuelTypeCompleteInsightData.labels,
            fuelTypeCompleteInsightData.data
        );

    const refreshedCategoryData =
        buildFuelCategoryData(
            fuelTypeCompleteInsightData.labels,
            visibleValues
        );

    if (
        fuelTypeChartMode === "detail" &&
        selectedFuelCategory
    ) {

        renderFuelDetailChart(
            canvas,
            selectedFuelCategory,
            refreshedCategoryData
        );

    } else {

        renderFuelCategoryChart(
            canvas,
            refreshedCategoryData
        );
    }
}


const FUEL_CATEGORY_CONFIG = {
    "ICE/Alternate Fuel": {
        color: "#F59E0B",
        fuels: [
            "PETROL",
            "DIESEL",
            "PETROL(E20)",
            "PETROL/HYBRID",
            "DIESEL/HYBRID",
            "PETROL(E20)/HYBRID",
            "ETHANOL(E100)",
            "METHANOL",
            "PETROL/METHANOL",
            "FLEX-FUEL(BIO-DIESEL)",
            "FLEX-FUEL(ETHANOL)",
            "HYDROGEN(ICE)",
            "DI-METHYL ETHER",
            "PETROL/CNG",
            "PETROL/LPG",
            "PETROL(E20)/CNG",
            "PETROL(E20)/LPG",
            "PETROL/HYBRID/CNG",
            "PETROL(E20)/HYBRID/CNG",
            "DUAL DIESEL/CNG",
            "DUAL DIESEL/LNG",
            "DUAL DIESEL/BIO CNG"
        ]
    },

    "Natural Gas": {
        color: "#16A34A",
        fuels: [
            "CNG ONLY",
            "LPG ONLY",
            "LNG",
            "HCNG",
            "BIO-CNG/BIO-GAS"
        ]
    },

    "BOV/Hybrid EV": {
        color: "#2563EB",
        fuels: [
            "ELECTRIC(BOV)",
            "PURE EV",
            "STRONG HYBRID EV",
            "PLUG-IN HYBRID EV",
            "SOLAR",
            "FUEL CELL HYDROGEN"
        ]
    }
};


/*
 * Current selected value unit ke according
 * tooltip aur popup values format karega.
 */
function formatFuelTypeValue(value) {

    if (typeof formatVahanTooltipValue === "function") {
        return formatVahanTooltipValue(value);
    }

    if (typeof formatNumberBySelection === "function") {

        const selectedFormat =
            typeof getSelectedValueFormat === "function"
                ? getSelectedValueFormat()
                : ($("#valueFormatDropdown").val() || "actual");

        return formatNumberBySelection(
            value,
            selectedFormat
        );
    }

    return Number(value || 0).toLocaleString("en-IN");
}


/*
 * Backend fuel labels ko matching ke liye normalize karega.
 */
function normalizeFuelTypeName(value) {

    return String(value || "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, " ")
        .replace(/\s*\/\s*/g, "/")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .replace(/BIO[- ]CNG\/BIO[- ]GAS/g, "BIO-CNG/BIO-GAS")
        .replace(/DUAL DIESEL\/BIO[- ]CNG/g, "DUAL DIESEL/BIO CNG");
}


/*
 * Fuel se uski category return karega.
 */
function getFuelCategory(fuelName) {

    const normalizedFuel =
        normalizeFuelTypeName(fuelName);

    const categoryNames =
        Object.keys(FUEL_CATEGORY_CONFIG);

    for (let i = 0; i < categoryNames.length; i++) {

        const categoryName =
            categoryNames[i];

        const matched =
            FUEL_CATEGORY_CONFIG[categoryName]
                .fuels
                .some(function (fuel) {

                    return (
                        normalizeFuelTypeName(fuel) ===
                        normalizedFuel
                    );
                });

        if (matched) {
            return categoryName;
        }
    }

    return null;
}


/*
 * Chart area, heading aur back button create karega.
 */
function createFuelTypeChartLayout(canvas) {

    if (!canvas) {
        return null;
    }

    const layoutId =
        canvas.id + "FuelTypeChartLayout";

    const toolbarId =
        canvas.id + "FuelTypeToolbar";

    const titleId =
        canvas.id + "FuelTypeChartTitle";

    const backButtonId =
        canvas.id + "FuelTypeBackButton";

    const canvasWrapperId =
        canvas.id + "FuelTypeCanvasWrapper";

    let layout =
        document.getElementById(layoutId);

    let toolbar =
        document.getElementById(toolbarId);

    let title =
        document.getElementById(titleId);

    let backButton =
        document.getElementById(backButtonId);

    let canvasWrapper =
        document.getElementById(canvasWrapperId);

    if (
        layout &&
        toolbar &&
        title &&
        backButton &&
        canvasWrapper
    ) {

        return {
            layout: layout,
            toolbar: toolbar,
            title: title,
            backButton: backButton,
            canvasWrapper: canvasWrapper
        };
    }

    const originalParent =
        canvas.parentNode;

    if (!originalParent) {
        return null;
    }

    const nextSibling =
        canvas.nextSibling;

    layout =
        document.createElement("div");

    layout.id =
        layoutId;

    layout.style.width =
        "100%";

    layout.style.display =
        "flex";

    layout.style.flexDirection =
        "column";

    layout.style.boxSizing =
        "border-box";

    layout.style.overflow =
        "visible";


    toolbar =
        document.createElement("div");

    toolbar.id =
        toolbarId;

    toolbar.style.display =
        "flex";

    toolbar.style.alignItems =
        "center";

    toolbar.style.justifyContent =
        "center";

    toolbar.style.position =
        "relative";

    toolbar.style.minHeight =
        "36px";

    toolbar.style.padding =
        "0 12px 6px";

    toolbar.style.boxSizing =
        "border-box";


    backButton =
        document.createElement("button");

    backButton.id =
        backButtonId;

    backButton.type =
        "button";

    backButton.textContent =
        "← Back";

    backButton.style.position =
        "absolute";

    backButton.style.left =
        "12px";

    backButton.style.top =
        "0";

    backButton.style.display =
        "none";

    backButton.style.padding =
        "5px 10px";

    backButton.style.border =
        "1px solid #D1D5DB";

    backButton.style.borderRadius =
        "6px";

    backButton.style.background =
        "#FFFFFF";

    backButton.style.color =
        "#374151";

    backButton.style.cursor =
        "pointer";

    backButton.style.fontSize =
        "12px";

    backButton.style.fontWeight =
        "600";


    title =
        document.createElement("div");

    title.id =
        titleId;

    title.textContent =
        "Vehicle Registration by Fuel Category";

    title.style.fontFamily =
        "Segoe UI, Arial, sans-serif";

    title.style.fontSize =
        "14px";

    title.style.fontWeight =
        "700";

    title.style.color =
        "#1F2937";

    title.style.textAlign =
        "center";


    canvasWrapper =
        document.createElement("div");

    canvasWrapper.id =
        canvasWrapperId;

    canvasWrapper.style.position =
        "relative";

    canvasWrapper.style.width =
        "100%";

    canvasWrapper.style.height =
        "260px";

    canvasWrapper.style.minHeight =
        "260px";

    canvasWrapper.style.boxSizing =
        "border-box";

    canvasWrapper.style.overflow =
        "visible";


    originalParent.insertBefore(
        layout,
        nextSibling
    );

    canvasWrapper.appendChild(
        canvas
    );

    canvas.style.display =
        "block";

    canvas.style.width =
        "100%";

    canvas.style.height =
        "100%";

    toolbar.appendChild(
        backButton
    );

    toolbar.appendChild(
        title
    );

    layout.appendChild(
        toolbar
    );

    layout.appendChild(
        canvasWrapper
    );

    /*
     * Old donut UI jaisa insights/legend chart ke niche.
     */
    getFuelInsightLegendContainer(
        canvas
    );

    originalParent.style.height =
        "auto";

    originalParent.style.minHeight =
        "0";

    originalParent.style.overflow =
        "visible";

    return {
        layout: layout,
        toolbar: toolbar,
        title: title,
        backButton: backButton,
        canvasWrapper: canvasWrapper
    };
}


/*
 * Detail fuel count ke according chart height adjust karega.
 */
function setFuelTypeChartHeight(
    canvas,
    numberOfBars
) {

    const wrapper =
        document.getElementById(
            canvas.id + "FuelTypeCanvasWrapper"
        );

    if (!wrapper) {
        return;
    }

    const isDetailView =
        numberOfBars > 3;

    const calculatedHeight =
        isDetailView
            ? Math.max(
                360,
                Math.min(
                    1250,
                    (numberOfBars * 46) + 110
                )
            )
            : 260;

    wrapper.style.height =
        calculatedHeight + "px";

    wrapper.style.minHeight =
        calculatedHeight + "px";
}


/*
 * API response ko category-wise aggregate karega.
 */
function buildFuelCategoryData(
    labels,
    values
) {

    const categoryData = {};

    Object.keys(FUEL_CATEGORY_CONFIG)
        .forEach(function (categoryName) {

            categoryData[categoryName] = {
                total: 0,
                fuels: []
            };
        });

    const unmappedFuels = [];

    labels.forEach(
        function (label, index) {

            const rawValue =
                Number(values[index] || 0);

            const categoryName =
                getFuelCategory(label);

            if (!categoryName) {

                if (rawValue > 0) {
                    unmappedFuels.push({
                        fuel: label,
                        value: rawValue
                    });
                }

                return;
            }

            categoryData[categoryName]
                .total += rawValue;

            categoryData[categoryName]
                .fuels
                .push({
                    label: String(label || "").trim(),
                    value: rawValue
                });
        }
    );

    /*
     * Category ke saare configured fuels show honge,
     * even when API mein fuel missing ho ya value zero ho.
     */
    Object.keys(FUEL_CATEGORY_CONFIG)
        .forEach(function (categoryName) {

            const existingFuelMap = {};

            categoryData[categoryName]
                .fuels
                .forEach(function (item) {

                    existingFuelMap[
                        normalizeFuelTypeName(item.label)
                    ] = item;
                });

            categoryData[categoryName].fuels =
                FUEL_CATEGORY_CONFIG[categoryName]
                    .fuels
                    .map(function (configuredFuel) {

                        const existing =
                            existingFuelMap[
                                normalizeFuelTypeName(
                                    configuredFuel
                                )
                            ];

                        return {
                            label: configuredFuel,
                            value: existing
                                ? Number(existing.value || 0)
                                : 0
                        };
                    });
        });

    if (unmappedFuels.length > 0) {

        console.warn(
            "Unmapped fuel types ignored in category chart:",
            unmappedFuels
        );
    }

    return categoryData;
}


/*
 * No data plugin.
 */
const fuelTypeNoDataPlugin = {

    id: "noDataMessageFuelType",

    beforeDraw: function (chart) {

        const dataset =
            chart.data &&
            chart.data.datasets &&
            chart.data.datasets[0];

        const chartData =
            dataset &&
            Array.isArray(dataset.data)
                ? dataset.data
                : [];

        const total =
            chartData.reduce(
                function (sum, value) {

                    return (
                        sum +
                        Number(value || 0)
                    );
                },
                0
            );

        if (
            chartData.length === 0 ||
            total === 0
        ) {

            const chartContext =
                chart.ctx;

            const width =
                chart.width;

            const height =
                chart.height;

            chartContext.save();

            chartContext.clearRect(
                0,
                0,
                width,
                height
            );

            chartContext.textAlign =
                "center";

            chartContext.textBaseline =
                "middle";

            chartContext.font =
                "16px Arial";

            chartContext.fillStyle =
                "#666666";

            chartContext.fillText(
                "No Data Available",
                width / 2,
                height / 2
            );

            chartContext.restore();
        }
    }
};


/*
 * Initial 3-category horizontal bar chart render karega.
 */
function renderFuelCategoryChart(
    canvas,
    categoryData
) {

    if (fuelTypeChart) {
        fuelTypeChart.destroy();
        fuelTypeChart = null;
    }

    fuelTypeChartMode =
        "category";

    selectedFuelCategory =
        null;

    setFuelTypeChartHeight(
        canvas,
        3
    );

    const title =
        document.getElementById(
            canvas.id + "FuelTypeChartTitle"
        );

    const backButton =
        document.getElementById(
            canvas.id + "FuelTypeBackButton"
        );

    if (title) {
        title.textContent =
            "Vehicle Registration by Fuel Category";
    }

    if (backButton) {
        backButton.style.display =
            "none";
    }

    const categoryLabels =
        Object.keys(FUEL_CATEGORY_CONFIG);

    const categoryValues =
        categoryLabels.map(
            function (categoryName) {

                return Number(
                    categoryData[categoryName]
                        .total || 0
                );
            }
        );

    const categoryColors =
        categoryLabels.map(
            function (categoryName) {

                return FUEL_CATEGORY_CONFIG[
                    categoryName
                ].color;
            }
        );

    fuelTypeChart =
        new Chart(
            canvas,
            {
                type: "bar",

                data: {
                    labels: categoryLabels,

                    datasets: [{
                        label: "Vehicle Count",
                        data: categoryValues,
                        backgroundColor: categoryColors,
                        borderWidth: 0,
                        borderRadius: 7,
                        barThickness: 34,
                        maxBarThickness: 38
                    }]
                },

                options: {
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: false,

                    interaction: {
                        mode: "nearest",
                        intersect: true
                    },

                    onHover: function (event, activeElements) {

                        event.native.target.style.cursor =
                            activeElements.length
                                ? "pointer"
                                : "default";
                    },

                    onClick: function (event) {

                        const points =
                            fuelTypeChart
                                .getElementsAtEventForMode(
                                    event,
                                    "nearest",
                                    { intersect: true },
                                    true
                                );

                        if (!points.length) {
                            return;
                        }

                        const categoryIndex =
                            points[0].index;

                        const categoryName =
                            categoryLabels[
                                categoryIndex
                            ];

                        /*
                         * Click ko thoda delay kiya gaya hai.
                         * Isse double-click par category drill-down nahi hoga
                         * aur old fuel insight popup correctly open hoga.
                         */
                        if (fuelTypeClickTimer) {
                            clearTimeout(
                                fuelTypeClickTimer
                            );
                        }

                        fuelTypeClickTimer =
                            setTimeout(
                                function () {

                                    renderFuelDetailChart(
                                        canvas,
                                        categoryName,
                                        categoryData
                                    );

                                    fuelTypeClickTimer =
                                        null;
                                },
                                260
                            );
                    },

                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: "rgba(0,0,0,0.06)"
                            },
                            ticks: {
                                callback: function (value) {
                                    return formatFuelTypeValue(value);
                                }
                            },
                            title: {
                                display: true,
                                text: "Vehicle Registration Count"
                            }
                        },

                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    weight: "600"
                                },
                                color: "#374151"
                            }
                        }
                    },

                    plugins: {
                        legend: {
                            display: false
                        },

                        tooltip: {
                            callbacks: {
                                title: function (items) {
                                    return items[0]
                                        ? items[0].label
                                        : "";
                                },

                                label: function (context) {

                                    return (
                                        "Total Fuel Count: " +
                                        formatFuelTypeValue(
                                            context.raw || 0
                                        )
                                    );
                                },

                                afterLabel: function () {
                                    return "Click to view fuel types";
                                }
                            }
                        }
                    }
                },

                plugins: [
                    fuelTypeNoDataPlugin
                ]
            }
        );

    fuelTypeChart.$fuelCategoryData =
        categoryData;

    /*
     * Home/category view mein sirf 3 category insights.
     * Insight aur bar colours same hain.
     */
    renderFuelCategoryInsightLegend(
        canvas,
        categoryData
    );
}


/*
 * Selected category ke fuel types ka
 * horizontal bar chart render karega.
 */
function renderFuelDetailChart(
    canvas,
    categoryName,
    categoryData
) {

    if (
        !categoryData ||
        !categoryData[categoryName]
    ) {
        return;
    }

    if (fuelTypeChart) {
        fuelTypeChart.destroy();
        fuelTypeChart = null;
    }

    fuelTypeChartMode =
        "detail";

    selectedFuelCategory =
        categoryName;

    const fuelItems =
        categoryData[categoryName]
            .fuels
            .slice();

    setFuelTypeChartHeight(
        canvas,
        fuelItems.length
    );

    const title =
        document.getElementById(
            canvas.id + "FuelTypeChartTitle"
        );

    const backButton =
        document.getElementById(
            canvas.id + "FuelTypeBackButton"
        );

    if (title) {
        title.textContent =
            categoryName +
            " - Fuel Type Wise Registration";
    }

    if (backButton) {

        backButton.style.display =
            "inline-block";

        backButton.onclick =
            function () {

                renderFuelCategoryChart(
                    canvas,
                    categoryData
                );
            };
    }

    const labels =
        fuelItems.map(
            function (item) {
                return item.label;
            }
        );

    const values =
        fuelItems.map(
            function (item) {
                return Number(item.value || 0);
            }
        );

    const fuelColors =
        labels.map(
            function (label, index) {

                return getFuelInsightColor(
                    label,
                    index
                );
            }
        );

    fuelTypeChart =
        new Chart(
            canvas,
            {
                type: "bar",

                data: {
                    labels: labels,

                    datasets: [{
                        label: "Vehicle Count",
                        data: values,
                        backgroundColor: fuelColors,
                        borderColor: fuelColors,
                        borderWidth: 0,
                        borderRadius: 5,
                        barThickness: 16,
                        maxBarThickness: 18,
                        categoryPercentage: 0.72,
                        barPercentage: 0.72
                    }]
                },

                options: {
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: false,

                    layout: {
                        padding: {
                            top: 14,
                            right: 18,
                            bottom: 12,
                            left: 8
                        }
                    },

                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: "rgba(0,0,0,0.06)"
                            },
                            ticks: {
                                callback: function (value) {
                                    return formatFuelTypeValue(value);
                                }
                            },
                            title: {
                                display: true,
                                text: "Vehicle Registration Count"
                            }
                        },

                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                autoSkip: false,
                                padding: 10,
                                font: {
                                    size: 10,
                                    lineHeight: 1.25
                                },
                                color: "#4B5563"
                            }
                        }
                    },

                    plugins: {
                        legend: {
                            display: false
                        },

                        tooltip: {
                            callbacks: {
                                title: function (items) {
                                    return items[0]
                                        ? items[0].label
                                        : "";
                                },

                                label: function (context) {

                                    return (
                                        "Vehicle Count: " +
                                        formatFuelTypeValue(
                                            context.raw || 0
                                        )
                                    );
                                }
                            }
                        }
                    }
                },

                plugins: [
                    fuelTypeNoDataPlugin
                ]
            }
        );

    fuelTypeChart.$fuelCategoryData =
        categoryData;

    /*
     * Detail view mein selected category ke sab fuels
     * insight ke roop mein show honge.
     * Fuel bar aur insight colour exactly same rahega.
     */
    renderFuelInsightLegend(
        canvas,
        labels,
        values
    );
}


/*
 * Existing function name same rakha gaya hai,
 * so JSP/common caller mein koi change required nahi hai.
 */
async function fetchFuelTypeDonutChart(
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

        archiveParams =
            archiveParams || {
                archiveTypeAC: "",
                archiveTypeANC: "",
                archiveTypePA: "",
                archiveTypeTA: "",
                archiveTypeNA: ""
            };

        const queryString =
            new URLSearchParams({
                fromYear: fromYear || "",
                toYear: toYear || "",
                stateCode: stateCode || "",
                rtoCode: rtoCode || "",
                vehicleClasses: vehicleClasses || "",
                vehicleMakers: vehicleMakers || "",
                vehicleSubCategories:
                    vehicleSubCategories || "",
                vehicleEmissions:
                    vehicleEmissions || "",
                vehicleFuels: vehicleFuels || "",
                timePeriod: timePeriod || "",
                vehicleCategoryGroup:
                    vehicleCategoryGroup || "",
                evType: evType || "",
                vehicleStatus:
                    vehicleStatus || "",
                vehicleOwnerType:
                    vehicleOwnerType || "",
                fitnessCheck:
                    fitnessCheck || "",
                vehicleType: vehicleType || "",
                archiveTypeAC:
                    archiveParams.archiveTypeAC || "",
                archiveTypeANC:
                    archiveParams.archiveTypeANC || "",
                archiveTypePA:
                    archiveParams.archiveTypePA || "",
                archiveTypeTA:
                    archiveParams.archiveTypeTA || "",
                archiveTypeNA:
                    archiveParams.archiveTypeNA || ""
            }).toString();

        const response =
            await fetch(
                "/analytics/publicdashboard/" +
                "vahandashboard/" +
                "fueltypedonutchart?" +
                queryString,
                {
                    method: "GET"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Fuel Type API request failed with status " +
                response.status
            );
        }

        const responseData =
            await response.json();

        const canvas =
            document.getElementById(
                "fetchFuelTypeDonutChart"
            );

        if (!canvas) {

            console.error(
                "Canvas not found: fetchFuelTypeDonutChart"
            );

            return;
        }

        createFuelTypeChartLayout(
            canvas
        );

        const labels =
            Array.isArray(responseData.labels)
                ? responseData.labels.map(
                    function (label) {

                        return String(label || "")
                            .trim()
                            .replace(/\s+/g, " ");
                    }
                )
                : [];

        const values =
            Array.isArray(responseData.data)
                ? responseData.data.map(
                    function (value) {

                        return Number(value || 0);
                    }
                )
                : [];

        const categoryData =
            buildFuelCategoryData(
                labels,
                values
            );

        /*
         * Old donut chart ki complete fuel-wise insight data preserve.
         * Bar chart category/detail mode change hone par bhi ye overwrite
         * nahi hogi.
         */
        /*
         * New API/filter response par saare fuels default visible.
         */
        hiddenFuelTypes.clear();

        fuelTypeCompleteInsightData = {
            heading:
                "Fuel Wise Vehicle Registration Insights",

            firstColumnHeading:
                "Fuel Type",

            labels:
                labels.slice(),

            data:
                values.slice()
        };

        renderFuelCategoryChart(
            canvas,
            categoryData
        );

        /*
         * Old donut chart wali insight functionality restore:
         * chart par double-click karne se complete raw fuel-wise
         * insights/table open hogi.
         */
        canvas.ondblclick =
            function (event) {

                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                /*
                 * Pending single-click drill-down cancel.
                 */
                if (fuelTypeClickTimer) {

                    clearTimeout(
                        fuelTypeClickTimer
                    );

                    fuelTypeClickTimer =
                        null;
                }

                if (!fuelTypeCompleteInsightData) {
                    return;
                }

                showFuelTypeTablePopup({
                    heading:
                        fuelTypeCompleteInsightData.heading,

                    firstColumnHeading:
                        fuelTypeCompleteInsightData.firstColumnHeading,

                    labels:
                        fuelTypeCompleteInsightData.labels,

                    data:
                        getVisibleFuelValues(
                            fuelTypeCompleteInsightData.labels,
                            fuelTypeCompleteInsightData.data
                        )
                });
            };

    } catch (error) {

        console.error(
            "Fuel Category Bar Chart Error:",
            error
        );

        if (fuelTypeChart) {
            fuelTypeChart.destroy();
            fuelTypeChart = null;
        }
    }
}


/*
 * Current category/detail chart ka popup table.
 */
function showFuelTypeTablePopup(
    responseData
) {

    const existingModal =
        document.getElementById(
            "fuelTablePopupModal"
        );

    if (existingModal) {
        existingModal.remove();
    }

    const overlay =
        document.createElement("div");

    overlay.id =
        "fuelTablePopupModal";

    overlay.style.position =
        "fixed";

    overlay.style.inset =
        "0";

    overlay.style.background =
        "rgba(0,0,0,0.35)";

    overlay.style.zIndex =
        "9999";

    overlay.style.display =
        "flex";

    overlay.style.alignItems =
        "center";

    overlay.style.justifyContent =
        "center";

    overlay.style.padding =
        "20px";

    overlay.style.boxSizing =
        "border-box";


    const modal =
        document.createElement("div");

    modal.style.backgroundColor =
        "#FFFFFF";

    modal.style.boxShadow =
        "0 10px 35px rgba(0, 0, 0, 0.25)";

    modal.style.padding =
        "20px";

    modal.style.borderRadius =
        "10px";

    modal.style.width =
        "75vw";

    modal.style.maxWidth =
        "1000px";

    modal.style.maxHeight =
        "80vh";

    modal.style.overflowY =
        "auto";

    modal.style.boxSizing =
        "border-box";


    const heading =
        document.createElement("h3");

    heading.textContent =
        responseData.heading ||
        "Fuel Wise Vehicle Registrations";

    heading.style.margin =
        "0 0 15px";

    heading.style.color =
        "#333333";

    heading.style.textAlign =
        "center";

    modal.appendChild(
        heading
    );


    const unitText =
        document.createElement("div");

    unitText.style.textAlign =
        "center";

    unitText.style.marginBottom =
        "12px";

    unitText.style.fontWeight =
        "600";

    unitText.style.color =
        "#555555";

    const selectedUnit =
        typeof getVahanSelectedUnitLabel ===
        "function"
            ? getVahanSelectedUnitLabel()
            : (
                $("#valueFormatDropdown").val() ||
                "actual"
            );

    unitText.textContent =
        "Values shown in: " +
        selectedUnit;

    modal.appendChild(
        unitText
    );


    const table =
        document.createElement("table");

    table.style.width =
        "100%";

    table.style.borderCollapse =
        "collapse";

    table.style.marginBottom =
        "20px";


    const tableHead =
        document.createElement("thead");

    const headerRow =
        document.createElement("tr");

    [
        responseData.firstColumnHeading ||
        "Fuel",
        "Count"
    ].forEach(
        function (header) {

            const headingCell =
                document.createElement("th");

            headingCell.style.border =
                "1px solid #DDDDDD";

            headingCell.style.padding =
                "8px";

            headingCell.style.backgroundColor =
                "#F2F2F2";

            headingCell.style.textAlign =
                "left";

            headingCell.textContent =
                header;

            headerRow.appendChild(
                headingCell
            );
        }
    );

    tableHead.appendChild(
        headerRow
    );

    table.appendChild(
        tableHead
    );


    const tableBody =
        document.createElement("tbody");

    const labels =
        Array.isArray(responseData.labels)
            ? responseData.labels
            : [];

    const values =
        Array.isArray(responseData.data)
            ? responseData.data
            : [];

    let total = 0;

    labels.forEach(
        function (label, index) {

            const row =
                document.createElement("tr");

            const categoryCell =
                document.createElement("td");

            categoryCell.style.border =
                "1px solid #DDDDDD";

            categoryCell.style.padding =
                "8px";

            categoryCell.textContent =
                label || "";

            const valueCell =
                document.createElement("td");

            valueCell.style.border =
                "1px solid #DDDDDD";

            valueCell.style.padding =
                "8px";

            const rawValue =
                Number(values[index] || 0);

            valueCell.textContent =
                formatFuelTypeValue(
                    rawValue
                );

            total += rawValue;

            row.appendChild(
                categoryCell
            );

            row.appendChild(
                valueCell
            );

            tableBody.appendChild(
                row
            );
        }
    );


    const totalRow =
        document.createElement("tr");

    totalRow.style.fontWeight =
        "bold";

    const totalLabelCell =
        document.createElement("td");

    totalLabelCell.style.border =
        "1px solid #DDDDDD";

    totalLabelCell.style.padding =
        "8px";

    totalLabelCell.style.backgroundColor =
        "#F2F2F2";

    totalLabelCell.textContent =
        "Total";

    const totalValueCell =
        document.createElement("td");

    totalValueCell.style.border =
        "1px solid #DDDDDD";

    totalValueCell.style.padding =
        "8px";

    totalValueCell.style.backgroundColor =
        "#F2F2F2";

    totalValueCell.textContent =
        formatFuelTypeValue(
            total
        );

    totalRow.appendChild(
        totalLabelCell
    );

    totalRow.appendChild(
        totalValueCell
    );

    tableBody.appendChild(
        totalRow
    );

    table.appendChild(
        tableBody
    );

    modal.appendChild(
        table
    );


    const closeButton =
        document.createElement("button");

    closeButton.textContent =
        "Close";

    closeButton.style.backgroundColor =
        "#EF4444";

    closeButton.style.color =
        "#FFFFFF";

    closeButton.style.border =
        "none";

    closeButton.style.padding =
        "10px 20px";

    closeButton.style.borderRadius =
        "5px";

    closeButton.style.cursor =
        "pointer";

    closeButton.style.display =
        "block";

    closeButton.style.margin =
        "10px auto 0";

    closeButton.onclick =
        function () {

            overlay.remove();
        };

    overlay.onclick =
        function (event) {

            if (event.target === overlay) {
                overlay.remove();
            }
        };

    modal.appendChild(
        closeButton
    );

    overlay.appendChild(
        modal
    );

    document.body.appendChild(
        overlay
    );
}


/*
 * Value-format dropdown change par chart aur
 * open popup latest format mein update honge.
 */
$(document)
    .off(
        "change.fuelTypeValueFormat",
        "#valueFormatDropdown"
    )
    .on(
        "change.fuelTypeValueFormat",
        "#valueFormatDropdown",
        function () {

            if (fuelTypeChart) {
                fuelTypeChart.update();
            }

            const openPopup =
                document.getElementById(
                    "fuelTablePopupModal"
                );

            if (
                openPopup &&
                fuelTypeChart
            ) {

                /*
                 * Insight popup open hai to same complete raw fuel-wise
                 * data ko selected unit ke saath re-render karo.
                 */
                if (fuelTypeCompleteInsightData) {

                    showFuelTypeTablePopup(
                        fuelTypeCompleteInsightData
                    );
                }
            }
        }
    );
