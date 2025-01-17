var lastUpdatedDate = '2025/01/15';

var distanceCost = 0;
var highwayCost = 0;
var campingChoiceCost = 0;
var equipmentCost = 0;
var carCost = 0;
var rentalTimeCost = 0;
var distanceCostPerKm = 25;

var COST_RAV4 = 10000;
var COST_SIENTA = 15000;

var COST_DAY7 = 0;
var COST_DAY8 = 1000;
var COST_OVERNIGHT = 5000;

var COST_FUJI = 7000;
var COST_SAITAMA = 5000;

var COST_HIGHTWAY_ONEWAY = 5000;
var COST_HIGHTWAY_ROUNDTRIP = 10000;

var COST_EQUIPMENT_TENT = 0;
var COST_EQUIPMENT_TABLE = 5000;
var COST_EQUIPMENT_BEP = 5000;
var COST_EQUIPMENT_BEPGAS = 5000;
var COST_EQUIPMENT_PROJECTOR = 5000;
var COST_EQUIPMENT_CAMERA = 0;
var COST_EQUIPMENT_SWITCH = 0;

const distanceTable = {
    fuji: {
        tokyo: 300,
        saitama: 350,
        kanagawa: 250
    },
    saitama: {
        tokyo: 250,
        saitama: 150,
        kanagawa: 350
    }
};

const locationNames = {
    tokyo: 'Tokyo',
    saitama: 'Saitama',
    kanagawa: 'Kanagawa'
};

document.getElementById('lastUpdatedDate').innerText = 'Cập nhật lần cuối: ' + lastUpdatedDate;

document.getElementById('location').addEventListener('change', function() {
    updateDistance();
});

document.getElementById('car').addEventListener('change', function() {
    var carChoice;
    
    switch (this.value) {
        case 'RAV4':
            carChoice = 'RAV4 Adventure <đang bảo dưỡng>';
            carCost = COST_RAV4;
            break;
        case 'sienta':
            carChoice = 'Sienta (Times rental car)';
            carCost = COST_SIENTA;
            break;
        default:
            carChoice = '';
            carCost = 0;
    }
    document.getElementById('carChoice').innerText = 'Đang chọn: ' + carChoice;
    document.getElementById('carChoiceCostSTR').innerText = '+' + carCost + '¥';
    updateTotalCost();
});

document.getElementById('rentalTime').addEventListener('change', function() {
    var rentalTimeChoice;
    
    switch (this.value) {
        case 'day7':
            rentalTimeChoice = 'Thứ 7';
            rentalTimeCost = COST_DAY7;
            break;
        case 'day8':
            rentalTimeChoice = 'Chủ nhật';
            rentalTimeCost = COST_DAY8;
            break;
        case 'overnight':
            rentalTimeChoice = 'Ở lại qua đêm';
            rentalTimeCost = COST_OVERNIGHT;
            break;
        default:
            rentalTimeChoice = '';
            rentalTimeCost = 0;
    }
    document.getElementById('rentalTimeChoice').innerText = 'Đang chọn: ' + rentalTimeChoice;
    document.getElementById('rentalTimeChoiceCostSTR').innerText = '+' + rentalTimeCost + '¥';
    updateTotalCost();
});


document.getElementById('camping').addEventListener('change', function() {
    var campingChoice;
    
    switch (this.value) {
        case 'fuji':
            campingChoice = 'Quanh chân núi Phú Sĩ';
            campingChoiceCost = COST_FUJI;
            break;
        case 'saitama':
            campingChoice = 'Bãi Camping tỉnh Saitama';
            campingChoiceCost = COST_SAITAMA;
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
            costStr = '+' + COST_HIGHTWAY_ONEWAY + '¥';
            highwayCost = COST_HIGHTWAY_ONEWAY;
            break;
        case 'yes2':
            choice = 'Có (hai chiều)';
            costStr = '+' + COST_HIGHTWAY_ROUNDTRIP + '¥';
            highwayCost = COST_HIGHTWAY_ROUNDTRIP;
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
                    equipmentCost += COST_EQUIPMENT_TENT;
                    break;
                case 'table':
                    equipmentStr.push('Bàn ghế');
                    equipmentCost += COST_EQUIPMENT_TABLE;
                    break;
                case 'bep':
                    equipmentStr.push('Bếp củi');
                    equipmentCost += COST_EQUIPMENT_BEP;
                    break;
                case 'bepgas':
                    equipmentStr.push('Bếp gas');
                    equipmentCost += COST_EQUIPMENT_BEPGAS;
                    break;
                case 'projector':
                    equipmentStr.push('Máy chiếu');
                    equipmentCost += COST_EQUIPMENT_PROJECTOR;
                    break;
                case 'camera':
                    equipmentStr.push('Máy ảnh');
                    equipmentCost += COST_EQUIPMENT_CAMERA;
                    break;
                case 'switch':
                    equipmentStr.push('Switch');
                    equipmentCost += COST_EQUIPMENT_SWITCH;
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

    // Kiểm tra và tra cứu trong bảng
    if (distanceTable[camping] && distanceTable[camping][location] !== undefined) {
        distance = distanceTable[camping][location];
        distanceCost = distance * distanceCostPerKm;
        locationName = locationNames[location] || 'Chưa chọn';
    }

    distanceCost = distanceCost || 0;

    document.getElementById('distance').innerText = `Đang chọn: ${locationName}, Khoảng cách hỗ trợ tối đa: ${distance}Km`;
    document.getElementById('cost').innerText = `+${distanceCost}¥`;
    updateTotalCost();
}

function updateTotalCost() {
    var totalCost = distanceCost + highwayCost + campingChoiceCost + equipmentCost + carCost + rentalTimeCost;
    document.getElementById('totalCost').innerHTML = 'Tổng cước phí: <strong>' + totalCost + '¥</strong>';
}

// Update equipment costs in HTML

if (COST_EQUIPMENT_TENT <= 0) {
    document.getElementById('tentCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('tentCost').innerText = '+' + COST_EQUIPMENT_TENT + '¥';
}

if (COST_EQUIPMENT_TABLE <= 0) {
    document.getElementById('tableCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('tableCost').innerText = '+' + COST_EQUIPMENT_TABLE + '¥';
}

if (COST_EQUIPMENT_BEP <= 0) {
    document.getElementById('bepCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('bepCost').innerText = '+' + COST_EQUIPMENT_BEP + '¥';
}

if (COST_EQUIPMENT_BEPGAS <= 0) {
    document.getElementById('bepgasCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('bepgasCost').innerText = '+' + COST_EQUIPMENT_BEPGAS + '¥';
}

if (COST_EQUIPMENT_PROJECTOR <= 0) {
    document.getElementById('projectorCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('projectorCost').innerText = '+' + COST_EQUIPMENT_PROJECTOR + '¥';
}

if (COST_EQUIPMENT_CAMERA <= 0) {
    document.getElementById('cameraCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('cameraCost').innerText = '+' + COST_EQUIPMENT_CAMERA + '¥';
}

if (COST_EQUIPMENT_SWITCH <= 0) {
    document.getElementById('switchCost').innerText = 'Miễn phí';
}
else {
    document.getElementById('switchCost').innerText = '+' + COST_EQUIPMENT_SWITCH + '¥';
}


