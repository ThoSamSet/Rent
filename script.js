var distanceCost = 0;
var highwayCost = 0;
var campingChoiceCost = 0;

document.getElementById('location').addEventListener('change', function() {
    updateDistance();
});


document.getElementById('camping').addEventListener('change', function() {
    var campingChoice;
    
    switch (this.value) {
        case 'fuji':
            campingChoice = 'Quanh chân núi Phú Sĩ';
            campingChoiceCost = 10000;
            break;
        case 'saitama':
            campingChoice = 'Bãi Camping tỉnh Saitama';
            campingChoiceCost = 9000;
            break;
        default:
            campingChoice = '';
            campingChoiceCost = 0;
    }
    document.getElementById('campingChoice').innerText = 'Đang chọn: ' + campingChoice;
    document.getElementById('campingChoiceCostSTR').innerText = '+' + campingChoiceCost + '¥';
    updateDistance();
    updateTotalCost();
});



document.getElementById('highway').addEventListener('change', function() {
    var choice;
    var costStr;
    
    switch (this.value) {
        case 'yes1':
            choice = 'Có (một chiều)';
            costStr = '+5000¥';
            highwayCost = 5000;
            break;
        case 'yes2':
            choice = 'Có (hai chiều)';
            costStr = '+10000¥';
            highwayCost = 10000;
            break;
        case 'no':
            choice = 'Không';
            costStr = 'Không phát sinh phí';
            highwayCost = 0;
            break;
        default:
            choice = '';
            costStr = 'Không phát sinh phí';
            highwayCost = 0;
    }
    document.getElementById('highwayChoice').innerText = 'Đang chọn: ' +  choice;
    document.getElementById('highwayChoiceCostSTR').innerText =costStr;
    updateTotalCost();
});


function updateDistance() {
    var location = document.getElementById('location').value;
    var camping = document.getElementById('camping').value;
    var distance;
    
    var locationName = 'Chưa chọn';

    if (camping === 'fuji') {
        switch (location) {
            case 'tokyo':
                distance = 300;
                locationName = 'Tokyo';
                break;
            case 'saitama':
                distance = 350;
                locationName = 'Saitama';
                break;
            case 'kanagawa':
                distance = 250;
                locationName = 'Kanagawa';
                break;
            default:
                distance = 0;
        }
    } else if (camping === 'saitama') {
        switch (location) {
            case 'tokyo':
                distance = 250;
                locationName = 'Tokyo';
                break;
            case 'saitama':
                distance = 150;
                locationName = 'Saitama';
                break;
            case 'kanagawa':
                distance = 350;
                locationName = 'Kanagawa';
                break;
            default:
                distance = 0;
        }
    } else {
        distance = 0;
    }

    distanceCost = distance * 25;
    document.getElementById('distance').innerText = 'Đang chọn: ' + locationName + ', Khoảng cách ước tính: ' + distance + 'Km';
    document.getElementById('cost').innerText ='+' + distanceCost + '¥';
    updateTotalCost();
}

function updateTotalCost() {
    var totalCost = distanceCost + highwayCost + campingChoiceCost;
    document.getElementById('totalCost').innerText = 'Tổng cước phí ước tính: ' + totalCost + '¥';
}