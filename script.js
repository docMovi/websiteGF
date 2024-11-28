document.addEventListener('DOMContentLoaded', function() {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth();

    function testDay(number) {
        if (month == 11) { // December = 11(months ab 0)
            if (day >= number) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const links = [
        { id: 'link1', day: 1, href: '1.html' },
        { id: 'link2', day: 2, href: '2.html' },
        { id: 'link3', day: 3, href: '3.html' },
        { id: 'link4', day: 4, href: '4.html' },
        { id: 'link5', day: 5, href: '5.html' },
        { id: 'link6', day: 6, href: '6.html' },
        { id: 'link7', day: 7, href: '7.html' },
        { id: 'link8', day: 8, href: '8.html' },
        { id: 'link9', day: 9, href: '9.html' },
        { id: 'link10', day: 10, href: '10.html' },
        { id: 'link11', day: 11, href: '11.html' },
        { id: 'link12', day: 12, href: '12.html' },
        { id: 'link13', day: 13, href: '13.html' },
        { id: 'link14', day: 14, href: '14.html' },
        { id: 'link15', day: 15, href: '15.html' },
        { id: 'link16', day: 16, href: '16.html' },
        { id: 'link17', day: 17, href: '17.html' },
        { id: 'link18', day: 18, href: '18.html' },
        { id: 'link19', day: 19, href: '19.html' },
        { id: 'link20', day: 20, href: '20.html' },
        { id: 'link21', day: 21, href: '21.html' },
        { id: 'link22', day: 22, href: '22.html' },
        { id: 'link23', day: 23, href: '23.html' },
        { id: 'link24', day: 24, href: '24.html' },
    ];

    const imgs = [
        {id: 'img1', day: 1},
        {id: 'img2', day: 2},
        {id: 'img3', day: 3},
        {id: 'img4', day: 4},
        {id: 'img5', day: 5},
        {id: 'img6', day: 6},
        {id: 'img7', day: 7},
        {id: 'img8', day: 8},
        {id: 'img9', day: 9},
        {id: 'img10', day: 10},
        {id: 'img11', day: 11},
        {id: 'img12', day: 12},
        {id: 'img13', day: 13},
        {id: 'img14', day: 14},
        {id: 'img15', day: 15},
        {id: 'img16', day: 16},
        {id: 'img17', day: 17},
        {id: 'img18', day: 18},
        {id: 'img19', day: 19},
        {id: 'img20', day: 20},
        {id: 'img21', day: 21},
        {id: 'img22', day: 22},
        {id: 'img23', day: 23},
        {id: 'img24', day: 24},
    ]

    links.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            if (testDay(link.day)) {
                element.href = link.href;
            } else {
                element.href = 'alternative.html';
            }
        }
    });

    imgs.forEach(img => {
        const element = document.getElementById(img.id);
        if (element) {
            if (testDay(img.day)) {
                element.classList.add('show');
            } else if(img.day > 3){
                if(testDay(img.day-3)){
                    element.classList.add('near-show');
                }else if(testDay(!img.day-3)){
                    element.classList.add('hide');
                }
            }else if(img.day <= 3){
                element.classList.add('near-show');
            }
        }
    });

    var altDiv = document.getElementById('alt');
    if (altDiv) {
        if(month == 11){
            altDiv.innerText = 'Dieses Türchen öffnet sich erst noch.';
        }else {
            altDiv.innerText = 'Es ist noch nicht mal Dezember!';
        }
        
    }

});
