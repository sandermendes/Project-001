interface ILanguage {
    localeCode: string;
    localeDesc: string;
    localeLang: string;
}

const Languages: ILanguage[] = [
    { localeCode: 'de-DE', localeDesc: 'Deutschland', localeLang: 'Deutsch' },
    { localeCode: 'en-US', localeDesc: 'United States', localeLang: 'English' },
    { localeCode: 'es-ES', localeDesc: 'España', localeLang: 'Español' },
    { localeCode: 'fr-FR', localeDesc: 'France', localeLang: 'Français' },
    { localeCode: 'pt-BR', localeDesc: 'Brasil', localeLang: 'Português' },
    { localeCode: 'ru-RU', localeDesc: '', localeLang: 'Русский' },
    { localeCode: 'zh-CN', localeDesc: '香港', localeLang: '中文' },
]

export default Languages;
