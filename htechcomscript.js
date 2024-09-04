document.addEventListener('DOMContentLoaded', function() {
    const technicianRates = {
        'Ryan Felt': 50,
        'Jose Rodriguez (Chepe)': 25,
        'Juan Cristerna': 30,
        'Jesus Escalante': 40
    };

    const technicianCheckboxes = document.querySelectorAll('input[name="technicians"]');
    const HourlyRateInput = document.getElementById('rate');

    function updateHourlyRate() {
        let totalRate = 0;
        technicianCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalRate += technicianRates[checkbox.value] || 0;
            }
        });
        HourlyRateInput.value = totalRate;
    }

    // Attach event listeners to all technician checkboxes
    technicianCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateHourlyRate);
    });

    // Calculate button logic
    document.getElementById('calculateBtn').addEventListener('click', function() {
        // Get values from the form fields
        let totalPrice = parseFloat(document.getElementById('tp').value) || 0;
        let materialExpenses = parseFloat(document.getElementById('material').value) || 0;
        let otherExpenses = parseFloat(document.getElementById('oe').value) || 0;
        let pd = parseFloat(document.getElementById('pd').value) || 0;

        // Calculate total hours
        let day1 = parseFloat(document.getElementById('day1').value) || 0;
        let day2 = parseFloat(document.getElementById('day2').value) || 0;
        let day3 = parseFloat(document.getElementById('day3').value) || 0;
        let day4 = parseFloat(document.getElementById('day4').value) || 0;
        let day5 = parseFloat(document.getElementById('day5').value) || 0;
        let additionalHours = parseFloat(document.getElementById('ah').value) || 0;
        let overtimeHours = parseFloat(document.getElementById('toh').value) || 0;

        let totalHours = day1 + day2 + day3 + day4 + day5 + additionalHours + (1.5 * overtimeHours);
        document.getElementById('totalHours').value = totalHours.toFixed(2);

        // Get hourly rate from the input field
        let hourlyRate = parseFloat(HourlyRateInput.value) || 0;

        // Calculate gross amount
        const grossAmount = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses;

        // Calculate Base commission
        const baseCommission = hourlyRate * pd;

        // Calculate gross profit
        let grossProfit = grossAmount - baseCommission;

        // Calculate overheads and profit
        const overheads = pd * 246;
        let profit = grossProfit - overheads + (materialExpenses * 1.2 * 0.1667) + (totalHours * 75 * 0.4);

        // Adjust Salary Based on multiple technicians
        const selectedTechnicians = document.querySelectorAll('input[name="technicians"]:checked');
        const numTechnicians = selectedTechnicians.length;

        if (numTechnicians > 0) {
            const totalSalary = hourlyRate * pd * numTechnicians;
            profit = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses - totalSalary - overheads + (materialExpenses * 1.2 * 0.1667) + (totalHours * 75 * 0.4);
            //document.getElementById('profit').textContent = profit.toFixed(2);

            // Update Technician Total Salary
            //document.getElementById('totalCommission').textContent = totalSalary.toFixed(2);

            // Calculate kicker based on profit percentage
            let profper = totalPrice !== 0 ? ((profit / totalPrice) * 100).toFixed(2) : '0.00';

            let kicker = 0;
            if (profper >= 30.01 && profper <= 39.99) {
                kicker = 0.015 * totalPrice;
            } else if (profper >= 40.01 && profper <= 49.99) {
                kicker = 0.02 * totalPrice;
            } else if (profper >= 50.01 && profper <= 59.99) {
                kicker = 0.025 * totalPrice;
            } else if (profper >= 60.01) {
                kicker = 0.03 * totalPrice;
            }

            // Display Kicker Information for multiple technicians
    let kickerDisplay = '';
    if (numTechnicians === 1) {
    kickerDisplay = `Kicker = $${kicker.toFixed(2)}`;
    } else {
    kickerDisplay = `Kicker Total = $${kicker.toFixed(2)}`;
    const kickerPerTechnician = kicker / numTechnicians;
    selectedTechnicians.forEach((tech, index) => {
        kickerDisplay += `, Kicker ${index + 1} = $${kickerPerTechnician.toFixed(2)}`;
    });
        }
    document.getElementById('kicker').textContent = kickerDisplay;

            // Update Net Profit and Profit Percentage
            profit -= kicker;
            let nprofit = profit;
            let nprofper = totalPrice !== 0 ? ((nprofit / totalPrice) * 100).toFixed(2) : '0.00';

            // Calculate SW, WH, and RD (assuming these are percentage calculations)
            const sw = ((materialExpenses * 1.2) / totalPrice) * 100 || 0;
            const wh = sw; // Example calculation (replace as needed)
            const rd = sw; // Example calculation (replace as needed)

            document.getElementById('sw').value = sw.toFixed(2);
            document.getElementById('wh').value = wh.toFixed(2);
            document.getElementById('rd').value = rd.toFixed(2);
            document.getElementById('bpp').value = nprofper + '%';

            // Check BP% and show "JOB BUST" if less than 10%
            if (parseFloat(nprofper) < 10) {
                alert("JOB BUST");
                document.getElementById("jobBustMessage").textContent = "JOB BUST";
            } else {
                document.getElementById("jobBustMessage").textContent = ""; // Clear message if not applicable
            }
        } else {
            alert('Please select at least one technician');
        }
    });

    // Print functionality
    document.getElementById("printButton").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default behavior

        // Ensure the values are correctly fetched before opening the print window
        const technicianNames = Array.from(document.querySelectorAll('input[name="technicians"]:checked')).map(tech => tech.value).join(', ');
        const notes = document.getElementById('notes').value;
        const jobAddress = document.getElementById('ja').value;
        const totalPrice = document.getElementById('tp').value;
        const materialExpenses = document.getElementById('material').value;
        const otherExpenses = document.getElementById('oe').value;
        const projectDuration = document.getElementById('pd').value;
        const day1 = document.getElementById('day1').value;
        const day2 = document.getElementById('day2').value;
        const day3 = document.getElementById('day3').value;
        const day4 = document.getElementById('day4').value;
        const day5 = document.getElementById('day5').value;
        const additionalHours = document.getElementById('ah').value;
        const overtimeHours = document.getElementById('toh').value;
        const totalHours = document.getElementById('totalHours').value;
        const sw = document.getElementById('sw').value;
        const wh = document.getElementById('wh').value;
        const rd = document.getElementById('rd').value;
        const totalCommission = document.getElementById('totalCommission').textContent;
        const invoiceNumber = document.getElementById('in').value;
        const bpp = document.getElementById('bpp').value;
        const grossAmount = document.getElementById('grossAmount').textContent;
        const grossProfit = document.getElementById('grossProfit').textContent;
        const overheads = document.getElementById('overheads').textContent;
        const nprofit = document.getElementById('profit').textContent;
        const nprofper = document.getElementById('profper').textContent;
        const baseCommission = document.getElementById('baseCommission').textContent;
        const kicker = document.getElementById('kicker').textContent;

        // Create the HTML content for the print window
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>TECHNICIAN POTENTIAL COMMISSION</title>
                <style>
                    .logo-container img {
                        width: 200px;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo-container">
                        <img src="BP.png" alt="BP logo">
                    </div>
                    <h2>TECHNICIAN COMMISSION CALCULATOR</h2>
                    <div class="details-section">
                    <h3>DETAILS:</h3>
                    <table>
                        <tr><th>Technicians' Names:</th><td>${technicianNames}</td></tr>
                        <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                        <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                        <tr><th>Project Duration:</th><td>${projectDuration}</td></tr>
                        <tr><th>Material Expenses:</th><td>${materialExpenses}</td></tr>
                        <tr><th>Other Expenses:</th><td>${otherExpenses}</td></tr>
                        <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                        <tr><th>Job Description:</th><td>${notes}</td></tr>
                    </table>
                    </div>
                    <div class="labor-details-section">
                        <h3>LABOR DETAILS:</h3>
                        <table>
                            <tr>
                                <th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th><th>Day 5</th>
                            </tr>
                            <tr>
                                <td>${day1}</td><td>${day2}</td><td>${day3}</td><td>${day4}</td><td>${day5}</td>
                            </tr>
                            <tr>
                                <th>Additional Hours</th><th>Overtime Hours</th><th>Total Hours</th>
                            </tr>
                            <tr>
                                <td>${additionalHours}</td><td>${overtimeHours}</td><td>${totalHours}</td>
                            </tr>
                        </table>
                    </div>
                    <h3>FOR OFFICE USE ONLY:</h3>
                    <table>
                        <tr>
                            <th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>BPP%</th>
                        </tr>
                        <tr>
                            <td>${sw}</td><td>${wh}</td><td>${rd}</td><td>${bpp}</td>
                        </tr>
                    </table>
                    <div class="commission-details-section">
                    <h3>KICKER DETAILS:</h3>
                    <table>
                        <tr><th>Kicker:</th><td>${kicker}</td></tr>
                    </table>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Open a new window with the content
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus(); // Focus the new window

        // Trigger the print dialog
        printWindow.print();
    });
});