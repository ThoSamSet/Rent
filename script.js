var lastUpdatedDate = '2026/01/03';

var distanceCost = 0;
var highwayCost = 0;
var campingChoiceCost = 0;
var equipmentSetCost = 0;
var rentalTimeCost = 0;

// Phí xe
var COST_CAR = 18000; // Giá cố định cho xe EV SUV

// Phí cước theo km
var distanceCostPerKm = 50;

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

// Phí set vật dụng
var EQUIPMENT_SETS = {
    'basic': {
        name: 'Set cơ bản',
        description: 'Lều tarp + Bàn ghế',
        cost: 4000
    },
    'full': {
        name: 'Set đầy đủ',
        description: 'Lều tarp + Bàn ghế + Bếp củi',
        cost: 5000
    },
    'entertainment': {
        name: 'Set giải trí',
        description: 'Camera + Nintendo Switch',
        cost: 5000
    },
    'premium': {
        name: 'Set cao cấp',
        description: 'Lều tarp + Bàn ghế + Bếp gas + Camera + Nintendo Switch',
        cost: 9000
    }
};

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

var lastUpdatedEl = document.getElementById('lastUpdatedDate');
if (lastUpdatedEl) {
    lastUpdatedEl.innerText = 'Cập nhật lần cuối: ' + lastUpdatedDate;
}

var locationEl = document.getElementById('location');
if (locationEl) {
    locationEl.addEventListener('change', function() {
        updateDistance();
    });
}

var rentalTimeEl = document.getElementById('rentalTime');
if (rentalTimeEl) {
    rentalTimeEl.addEventListener('change', function() {
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
                rentalTimeChoice = 'Thứ 7';
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
}

var campingEl = document.getElementById('camping');
if (campingEl) {
    campingEl.addEventListener('change', function() {
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
}

var equipmentSetSelect = document.getElementById('equipmentSet');
if (equipmentSetSelect) {
    for (var key in EQUIPMENT_SETS) {
        var option = document.createElement('option');
        option.value = key;
        option.textContent = EQUIPMENT_SETS[key].name + ' - ' + EQUIPMENT_SETS[key].description + ' (+' + EQUIPMENT_SETS[key].cost + '¥)';
        equipmentSetSelect.appendChild(option);
    }

    equipmentSetSelect.addEventListener('change', function() {
        var selectedSet = this.value;

        if (selectedSet && EQUIPMENT_SETS[selectedSet]) {
            var set = EQUIPMENT_SETS[selectedSet];
            equipmentSetCost = set.cost;
            document.getElementById('equipmentSetChoice').innerText = 'Đang chọn: ' + set.name + ' - ' + set.description;
            document.getElementById('equipmentSetCostSTR').innerText = '+' + equipmentSetCost + '¥';
        } else {
            equipmentSetCost = 0;
            document.getElementById('equipmentSetChoice').innerText = '';
            document.getElementById('equipmentSetCostSTR').innerText = '';
        }
        updateTotalCost();
    });
}

function updateDistance() {
    var location = document.getElementById('location').value;
    var camping = document.getElementById('camping').value;
    var distance;
    var locationName = 'Chưa chọn';

    if (distanceTable[camping] && distanceTable[camping][location] !== undefined) {
        distance = distanceTable[camping][location];
        distanceCost = COST_CAR + (distance * distanceCostPerKm);
        locationName = locationNames[location] || 'Chưa chọn';
    } else {
        distanceCost = 0;
    }

    document.getElementById('distance').innerText = `Đang chọn: ${locationName}, Khoảng cách hỗ trợ tối đa: ${distance}Km`;
    document.getElementById('cost').innerText = `+${distanceCost}¥`;
    updateTotalCost();
}

function updateTotalCost() {
    var totalCostEl = document.getElementById('totalCost');
    var stickyTotalCostEl = document.getElementById('stickyTotalCost');
    if (!totalCostEl && !stickyTotalCostEl) {
        return;
    }

    var totalCost = distanceCost + highwayCost + campingChoiceCost + equipmentSetCost + rentalTimeCost;
    var costHTML = 'Tổng cước phí ước tính: <strong>' + totalCost + '¥</strong>';

    if (totalCostEl) {
        totalCostEl.innerHTML = '<br>' + costHTML;
    }
    if (stickyTotalCostEl) {
        stickyTotalCostEl.innerHTML = '<span>' + costHTML + '</span>';
    }
}

if (document.getElementById('totalCost') || document.getElementById('stickyTotalCost')) {
    updateTotalCost();
}
