export const removePontuation = (text: string): string => {
    return text
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "")
       .replace(/[^\w\s]/gi, "")
       .trim();
};


export const formatMask = (text: string, mask: string): string => {
    if (!text) return '';

    const textOnlyDigits = text.replace(/\D/g, '');
    const maskChars = mask.split('');
    let formatted = '';
    let textIndex = 0;

    for (const char of maskChars) {
        if (char === '#') {
            formatted += textOnlyDigits[textIndex] || '';
            textIndex++;
        } else {
            formatted += char;
        }
    }

    return formatted;
};