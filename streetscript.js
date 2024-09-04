document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateFinalPrice);

    var inputFields = document.querySelectorAll('input, select');
    inputFields.forEach(function(input) {
        input.addEventListener('input', calculateFinalPrice);
        input.addEventListener('change', calculateFinalPrice);
    });

    calculateFinalPrice();
});

function calculateFinalPrice() {
    var method = document.getElementById('method');
    var ed = parseInt(document.getElementById('ed').value) || 0;
    var swr = document.getElementById('swr');
    var atr = document.getElementById('atr');
    var bm = document.getElementById('bm');
    var el = parseInt(document.getElementById('el').value) || 0;
    var ct = document.getElementById('ct');
    var scr = document.getElementById('scr');
    var depth = parseInt(document.getElementById('depth').value) || 0;
    var others = parseFloat(document.getElementById('others').value) || 0;
    var discount = document.getElementById('discount').value.toUpperCase();
    var checkbox5 = document.getElementById('checkbox5');
    var upperMethod = document.getElementById('upperMethod');
    var landscape = document.getElementById('landscape').value.toUpperCase();
    var ull = parseInt(document.getElementById('ull').value) || 0;
    var ubm = document.getElementById('ubm').value.toUpperCase();
    var am = parseInt(document.getElementById('am').value) || 0;
    var finalPriceSpan = document.getElementById('finalPrice');
    var financingOption = document.getElementById('financing').value;

    var finalPrice = 2620;

    finalPrice += others;

    if (method.value.toUpperCase() === 'OPEN TRENCH') {
        if (atr.checked) {
            switch (el) {
                case 10:
                    finalPrice += 4300;
                    break;
                case 20:
                    finalPrice += 4300;
                    break;
                case 25:
                    finalPrice += 4800;
                    break;
                case 30:
                    finalPrice += 5800;
                    break;
                case 35:
                    finalPrice += 6800;
                    break;
                case 40:
                    finalPrice += 7800;
                    break;
                default:
                    console.log('Invalid value for el:', el);
            }
        } else { // atr is not checked
            switch (el) {
                case 10:
                    finalPrice += 4000;
                    break;
                case 20:
                    finalPrice += 4000;
                    break;
                case 25:
                    finalPrice += 4200;
                    break;
                case 30:
                    finalPrice += 5200;
                    break;
                case 35:
                    finalPrice += 6200;
                    break;
                case 40:
                    finalPrice += 7200;
                    break;
                default:
                    console.log('Invalid value for el:', el);
            }
        }
    } else if (method.value.toUpperCase() === 'TRENCHLESS') {
        if (atr.checked) {
            finalPrice += 5280;
        } else {
            finalPrice += 4410;
        }
    } else {
        console.log('Invalid method:', method.value);
    }

    if (swr.checked) {
        finalPrice -= 200;
    }

    if (bm.value.toUpperCase() === 'BASE ROCK' && method.value.toUpperCase() === 'OPEN TRENCH') {
        finalPrice -= 480;
    } else if (bm.value.toUpperCase() === 'BASE ROCK' && method.value.toUpperCase() === 'TRENCHLESS') {
        finalPrice -= 400;
    }

    if (ct.checked) {
        finalPrice += 1800;
    }

    if (scr.checked) {
        finalPrice += 600;
    }

    if (depth >= 5) {
        finalPrice += (depth - 5) * 1000;
    }

    if (checkbox5.checked) {
        if (upperMethod.value.toUpperCase() === 'OPEN TRENCH') {
            finalPrice += 90 * ull;
        } else if (upperMethod.value.toUpperCase() === 'TRENCHLESS') {
            finalPrice += 45 * ull;
        }

        if (ubm === 'BASE ROCK') {
            finalPrice += 45 * ull;
        }

        if (landscape === 'DIRT') {
            finalPrice += ull * 25;
        } else if ((method.value.toUpperCase() === 'OPEN TRENCH' && landscape === 'PAVERS') || 
                   (landscape === 'ASPHALT' || landscape === 'CONCRETE')) {
            finalPrice += ull * 90;
        } else if ((method.value.toUpperCase() === 'TRENCHLESS' && landscape === 'PAVERS') || 
                   (landscape === 'ASPHALT' || landscape === 'CONCRETE')) {
            finalPrice += ull * 45;
        }
    }

    finalPrice += am * 8 * 75;

    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    finalPrice += ed * 8 * 687;
    switch (financingOption) {
        case 'none':
        case '2832':
            // No change in final bidding price
            break;
        case '2611':
            // Increase final bidding price by 5%
            finalPrice *= 1.05;
            break;
        case '9998':
            // Increase final bidding price by 5.5%
            finalPrice *= 1.055;
            break;
        default:
            console.log('Invalid financing option:', financingOption);
    }

    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);
}
