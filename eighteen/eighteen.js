document.getElementById('calculateButton').addEventListener('click', function() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    if (name1 === '' || name2 === '') {
        alert('Please enter both names!');
        return;
    }

    const lovePercentage = Math.floor(Math.random() * 100) + 1;
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progressText');

    progressBar.style.width = '0%';
    progressText.innerText = 'Calculating...';

    setTimeout(() => {
        progressBar.style.width = `${lovePercentage}%`;
        progressText.innerText = `Love Compatibility: ${lovePercentage}%`;
    }, 200);
});
