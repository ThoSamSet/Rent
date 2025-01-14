document.getElementById('location').addEventListener('change', function() {
    var distance;
    switch (this.value) {
        case 'tokyo':
            distance = '300KM';
            break;
        case 'saitama':
            distance = '200KM';
            break;
        case 'kanagawa':
            distance = '250KM';
            break;
        default:
            distance = '';
    }
    document.getElementById('distance').innerText = distance;
});