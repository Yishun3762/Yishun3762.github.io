function togglePlayer() {
    const player = document.getElementById('musicPlayer');
    player.classList.toggle('minimized');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        togglePlayer();
    }
});

const images = [
    'pic/5.png',
    'pic/6.jpg',
    'pic/8.jpg',
    'pic/7.jpg',
];

let currentIndex = 0;
let Count = 0;
let additional = Math.floor(Math.random() * 7) + 1;
let randomTexts = [];
let lastIndex = -1;

// 鼠标跟随和点击效果
const cursor = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

async function loadTexts() {
    const textBox = document.getElementById('random-text');

    try {
        const response = await fetch('texts.json');
        if (!response.ok) throw new Error('Failed to load texts');
        const data = await response.json();
        randomTexts = data.randomTexts;

        textBox.classList.remove('loading');
        textBox.textContent = getRandomText();
    } catch (error) {
        console.error('Error loading texts:', error);
        textBox.classList.remove('loading');
        textBox.classList.add('error');
        textBox.textContent = "喵呜...咱喵失忆了喵...";

        setTimeout(() => {
            textBox.classList.remove('error');
            loadTexts();
        }, 5000);
    }
}

// 随机文本
function getRandomText() {
    if (randomTexts.length === 0) return "这里除了小猫娘什么都没有喵";

    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * randomTexts.length);
    } while (newIndex === lastIndex && randomTexts.length > 1);

    lastIndex = newIndex;
    return randomTexts[newIndex];
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .content p {
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // 加载文本
    loadTexts();
    
    // 文本点击事件
    document.getElementById('random-text').addEventListener('click', function() {
        const textBox = this;
        textBox.classList.add('text-change');

        setTimeout(() => {
            textBox.textContent = getRandomText();
        }, 250);

        setTimeout(() => {
            textBox.classList.remove('text-change');
        }, 500);
    });
    
    // 背景图点击事件
    document.getElementById('change-bgpic').addEventListener('click', function() {
        Count++;
        if (Count <= 3) {
            if (Count === 1) {
                alert('真的不好看吗喵~真的忍心把我换掉吗喵~');
            } else if (Count === 2) {
                alert('生气了喵，咱喵真的要走了喵~');
            } else {
                alert('再点我就真的走了喵~');
            }
        } else if (Count > 3 && Count <= 3 + additional) {
            alert('嘿嘿，咱喵还舍不得走喵~');
        } else {
            alert('哼，咱喵去找主人AsagiYuumoya了喵~');
            currentIndex = (currentIndex + 1) % images.length;
            document.body.style.backgroundImage = `url('${images[currentIndex]}')`;
        }
    });
}); 