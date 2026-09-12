// Diccionario de traducciones simples
const translations = {
    es: {
        hero_title: "Globos Impresos y Personalizados",
        hero_subtitle: "Soluciones de alta calidad para tu marca o evento."
    },
    en: {
        hero_title: "Printed and Customized Balloons",
        hero_subtitle: "High quality solutions for your brand or event."
    }
};

// Función para cambiar idioma
function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Guarda la preferencia en el navegador del usuario
    localStorage.setItem("preferred_lang", lang);
}

// Carga el idioma guardado previamente al abrir la página
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferred_lang") || "es";
    changeLanguage(savedLang);
});
