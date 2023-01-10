const humburger = document.querySelector(".humburger")
const navMenu = document.querySelector(".nav-menu1")


humburger.addEventListener("click", () => {
    humburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})



const carousel3Dswiper = new Swiper(".carousel-3D-swiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 350,
        modifier: 1,
        slideShadows: true
    },
    autoplay: {
        delay: 12000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination"
    }

});
const carousel3Dswiper1 = new Swiper(".carousel-3D-swiper1", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: true
    },
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination"
    }

});

const js_details = ".js-faq-details";
const js_summary = ".js-faq-question";
const js_content = ".js-faq-answer";

document.addEventListener("DOMContentLoaded", () => {
    setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
    const details = document.querySelectorAll(js_details);
    const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
    const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

    details.forEach((element) => {
        const summary = element.querySelector(js_summary);
        const content = element.querySelector(js_content);

        summary.addEventListener("click", (event) => {
            // デフォルトの挙動を無効化
            event.preventDefault();

            // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
            if (element.dataset.animStatus === RUNNING_VALUE) {
                return;
            }

            // detailsのopen属性を判定
            if (element.open) {
                // アコーディオンを閉じるときの処理
                // アイコン操作用クラスを切り替える(クラスを取り除く)
                element.classList.toggle(IS_OPENED_CLASS);

                // アニメーションを実行
                const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
                // アニメーション実行中用の値を付与
                element.dataset.animStatus = RUNNING_VALUE;

                // アニメーションの完了後に
                closingAnim.onfinish = () => {
                    // open属性を取り除く
                    element.removeAttribute("open");
                    // アニメーション実行中用の値を取り除く
                    element.dataset.animStatus = "";
                };
            } else {
                // アコーディオンを開くときの処理
                // open属性を付与
                element.setAttribute("open", "true");

                // アイコン操作用クラスを切り替える(クラスを付与)
                element.classList.toggle(IS_OPENED_CLASS);

                // アニメーションを実行
                const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
                element.dataset.animStatus = RUNNING_VALUE;

                openingAnim.onfinish = () => {
                    element.dataset.animStatus = "";
                };
            }
        });
    });
}

/**
 *
 */
const animTiming = {
    duration: 200,
    easing: "ease-out"
};

/**

 */
const closingAnimKeyframes = (content) => [
    {
        height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
        opacity: 1,
    }, {
        height: 0,
        opacity: 0,
    }
];


const openingAnimKeyframes = (content) => [
    {
        height: 0,
        opacity: 0,
    }, {
        height: content.offsetHeight + 'px',
        opacity: 1,
    }
];

