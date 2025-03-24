var lastUpdatedDate = '2025/03/15';

var distanceCost = 0;
var highwayCost = 0;
var campingChoiceCost = 0;
var equipmentCost = 0;
var carCost = 0;
var rentalTimeCost = 0;

// Phí cước theo km
var distanceCostPerKm = 50;

// Phí xe
var COST_TESLA = 18000;
var COST_SIENTA = 15000;

// Phí theo ngày
var COST_DAY7 = 0;
var COST_DAY8 = 1000;
var COST_OVERNIGHT = 5000;

// Phụ phí điểm đến
var COST_FUJI = 1000;
var COST_SAITAMA = 0;

// Phí cao tốc
var COST_HIGHTWAY_ONEWAY = 5000;
var COST_HIGHTWAY_ROUNDTRIP = 10000;

// Phí thiết bị
var COST_EQUIPMENT_TENT = 2000;
var COST_EQUIPMENT_TARP = 2000;
var COST_EQUIPMENT_TABLE = 2000;
var COST_EQUIPMENT_BEP = 1000;
var COST_EQUIPMENT_BEPGAS = 1000;
var COST_EQUIPMENT_PROJECTOR = 5000;
var COST_EQUIPMENT_CAMERA = 0;
var COST_EQUIPMENT_SWITCH = 5000;

// Bảng giá cước theo địa điểm
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

// Tên địa điểm
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
            carChoice = 'EV SUV';
            carCost = COST_TESLA;
            break;
        case 'sienta':
            carChoice = 'Sienta (Times) <Tạm dừng dịch vụ>';
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



// document.getElementById('highway').addEventListener('change', function() {
//     var choice;
//     var costStr;
    
//     switch (this.value) {
//         case 'yes1':
//             choice = 'Có (một chiều)';
//             costStr = '+' + COST_HIGHTWAY_ONEWAY + '¥';
//             highwayCost = COST_HIGHTWAY_ONEWAY;
//             break;
//         case 'yes2':
//             choice = 'Có (hai chiều)';
//             costStr = '+' + COST_HIGHTWAY_ROUNDTRIP + '¥';
//             highwayCost = COST_HIGHTWAY_ROUNDTRIP;
//             break;
//         case 'no':
//             choice = 'Không';
//             costStr = 'Không phát sinh phí';
//             highwayCost = 0;
//             break;
//         default:
//             choice = '';
//             costStr = 'Không phát sinh phí';
//             highwayCost = 0;
//     }
//     document.getElementById('highwayChoice').innerText = 'Đang chọn: ' +  choice;
//     document.getElementById('highwayChoiceCostSTR').innerText =costStr;
//     updateTotalCost();
// });

document.querySelectorAll('input[name="equipment"]').forEach(function(elem) {
    elem.addEventListener('change', function() {
        var equipmentChoice = [];
        equipmentCost = 0
        var equipmentStr = [];
        document.querySelectorAll('input[name="equipment"]:checked').forEach(function(checkedElem) {
            // equipmentChoice.push(checkedElem.value);
            switch (checkedElem.value) {
                case 'tent':
                    equipmentStr.push('Lều tent');
                    equipmentCost += COST_EQUIPMENT_TENT;
                    break;
                case 'tarp':
                    equipmentStr.push('Lều tarp');
                    equipmentCost += COST_EQUIPMENT_TARP;
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
};

function updateTotalCost() {
    var totalCost = distanceCost + highwayCost + campingChoiceCost + equipmentCost + carCost + rentalTimeCost;
    document.getElementById('totalCost').innerHTML = 'Tổng cước phí ước tính: <strong>' + totalCost + '¥</strong>';
};

// Update equipment costs in HTML
const TEXT_FREE = '(Miễn phí)';

function ReplaceText(_text) {
    return '(+' + _text + '¥)';
}

function updateCost(elementId, cost) {
    const element = document.getElementById(elementId);
    if (!element) return; // Đảm bảo phần tử tồn tại
    element.innerText = cost > 0 ? ReplaceText(cost) : TEXT_FREE;
}

// Cập nhật chi phí cho từng thiết bị
updateCost('tentCost', COST_EQUIPMENT_TENT);
updateCost('tarpCost', COST_EQUIPMENT_TARP);
updateCost('tableCost', COST_EQUIPMENT_TABLE);
updateCost('bepCost', COST_EQUIPMENT_BEP);
updateCost('bepgasCost', COST_EQUIPMENT_BEPGAS);
updateCost('projectorCost', COST_EQUIPMENT_PROJECTOR);
updateCost('cameraCost', COST_EQUIPMENT_CAMERA);
updateCost('switchCost', COST_EQUIPMENT_SWITCH);



