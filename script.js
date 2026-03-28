function openBook() {
    const code = document.getElementById('pass').value.trim();
    const book = document.getElementById('book');

    if (code === "ЗавждиСТобою") {
        book.classList.add('opened');

        const part1 = "Ліза, моя дорога...\n\nТи — та сама людина, з якою я готовий проходити будь-які квести. Кожен день з тобою кращий за будь-який ігровий фінал.";
        const part2 = "Мені важливо, щоб ти знала: я ціную кожну мить нашого спілкування. Ти моє натхнення і мій спокій. Дякую тобі за все.";

        setTimeout(() => {
            typeEffect(part1, "text-left", 50, () => {
                typeEffect(part2, "text-right", 50, () => {
                    document.getElementById('love-footer').classList.add('visible');
                });
            });
        }, 1800);
    } else {
        alert("Код невірний. Спробуй ще раз!");
    }
}

function typeEffect(text, elementId, speed, callback) {
    let i = 0;
    const el = document.getElementById(elementId);
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}