var distanceCost = 0;
var highwayCost = 0;
var campingChoiceCost = 0;
var equipmentCost = 0;
var distanceCostPerKm = 25;

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

document.querySelectorAll('input[name="equipment"]').forEach(function(elem) {
    elem.addEventListener('change', function() {
        var equipmentChoice = [];
        equipmentCost = 0
        var equipmentStr = [];
        document.querySelectorAll('input[name="equipment"]:checked').forEach(function(checkedElem) {
            // equipmentChoice.push(checkedElem.value);
            switch (checkedElem.value) {
                case 'tent':
                    equipmentStr.push('Lều');
                    equipmentCost += 0;
                    break;
                case 'table':
                    equipmentStr.push('Bàn ghế');
                    equipmentCost += 5000;
                    break;
                case 'bep':
                    equipmentStr.push('Bếp củi');
                    equipmentCost += 5000;
                    break;
                case 'bepgas':
                    equipmentStr.push('Bếp gas');
                    equipmentCost += 5000;
                    break;
                case 'projector':
                    equipmentStr.push('Máy chiếu');
                    equipmentCost += 5000;
                    break;
                case 'camera':
                    equipmentStr.push('Máy ảnh');
                    equipmentCost += 0;
                    break;
                default:
                    equipmentStr.push('');
                    equipmentCost += 0;
            }
        });
        document.getElementById('equipmentChoice').innerText = 'Đang chọn: ' + equipmentStr.join(', ');
        document.getElementById('equipmentCostSTR').innerText = '+' + equipmentCost + '¥';
        updateTotalCost();
    });
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

    distanceCost = distance * distanceCostPerKm;
    document.getElementById('distance').innerText = 'Đang chọn: ' + locationName + ', Khoảng cách ước tính: ' + distance + 'Km';
    document.getElementById('cost').innerText ='+' + distanceCost + '¥';
    updateTotalCost();
}

function updateTotalCost() {
    var totalCost = distanceCost + highwayCost + campingChoiceCost + equipmentCost;
    document.getElementById('totalCost').innerHTML = 'Tổng cước phí: <strong>' + totalCost + '¥</strong>';
}