document.addEventListener('DOMContentLoaded', function() {
    const biddingForm = document.getElementById('biddingForm');
    biddingForm.addEventListener('input', calculateFinalPrice);
    biddingForm.addEventListener('change', calculateFinalPrice);
    
    document.getElementById('am').value = 'nr';

    calculateFinalPrice(); // Calculate final price when the page loads
});

function calculateFinalPrice() {
    const ed = parseFloat(document.getElementById('ed').value) || 0;
    const method = document.getElementById('method').value.toLowerCase();
    const am = document.getElementById('am').value;
    const swr = document.getElementById('swr').checked;
    const landscape = document.getElementById('landscape').value.toLowerCase();
    const bm = document.getElementById('bm').value.toLowerCase();
    const pb = document.getElementById('pb').value.toLowerCase();
    const permits = document.getElementById('permits').value.toLowerCase();
    const depth = parseFloat(document.getElementById('depth').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const discount = document.getElementById('discount').value;
    const dumping = parseFloat(document.getElementById('dumping').value) || 0;
    const financingOption = document.getElementById('financing').value;
    const finalPriceSpan = document.getElementById('finalPrice');

    let finalPrice = 0;

    finalPrice += others * 1.2;

    if (method === 'open trench') {
        finalPrice += 960 * 1.2;
    } else if (method === 'trenchless') {
        finalPrice += 1010 * 1.2;
    }

    switch (am) {
        case '1d':
            finalPrice += 75 * 8 * 1;
            break;
        case '2d':
            finalPrice += 75 * 8 * 2;
            break;
        case '3d':
            finalPrice += 75 * 8 * 3;
            break;
    }

    if (swr) {
        finalPrice += 400;
    }

    switch (method) {
        case 'open trench':
            switch (landscape) {
                case 'dirt':
                    break;
                case 'pavers':
                    finalPrice += 1200;
                    break;
                case 'asphalt':
                    finalPrice += 350;
                    break;
                case 'concrete':
                    finalPrice += 600;
                    break;
            }
            switch (bm) {
                case 'native soil':
                    break;
                case 'base rock':
                    finalPrice += 630;
                    break;
            }
            switch (pb) {
                case 'native soil':
                    break;
                case 'crushed rock':
                    finalPrice += 90;
                    break;
                case 'sand':
                    finalPrice += 90;
                    break;
            }
            break;
        case 'trenchless':
            switch (landscape) {
                case 'dirt':
                    break;
                case 'pavers':
                    finalPrice += 400;
                    break;
                case 'asphalt':
                    finalPrice += 150;
                    break;
                case 'concrete':
                    finalPrice += 100;
                    break;
            }
            switch (bm) {
                case 'native soil':
                    break;
                case 'base rock':
                    finalPrice += 90;
                    break;
            }
            switch (pb) {
                case 'native soil':
                    break;
                case 'crushed rock':
                    finalPrice += 90;
                    break;
                case 'sand':
                    finalPrice += 90;
                    break;
            }
            break;
    }

    switch (permits) {
        case 'none':
            break;
        case 'building':
            finalPrice += 350;
            break;
        case 'sidewalk':
            finalPrice += 900;
            break;
        case 'sewer':
            finalPrice += 450;
            break;
        case 'bas':
            finalPrice += 800;
            break;
    }

    if (depth > 5) {
        finalPrice += (depth - 5) * 1000;
    }

    finalPrice += dumping * 60;
    finalPrice += ed * 8 * 678;

    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    switch (financingOption) {
        case '2611':
            finalPrice *= 1.05;
            break;
        case '9998':
            finalPrice *= 1.055;
            break;
    }

    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);
}
