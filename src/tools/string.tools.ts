const StringUtil = () => {
    const stripTag = (oldStr: string) => {
        return oldStr.replace(/<[^>]*>?/g, '');
    };

    const unescape = (oldStr: string) => {
        return oldStr.replace(/&amp;/gi, '&')
                    .replace(/&quot;/gi, '"')
                    .replace(/&gt;/gi, '>')
                    .replace(/&li;/gi, '<')
                    .replace(/&nbsp;/gi, ' ');
    };

    return {
        stripTag,
        unescape
    }
};

const su = StringUtil();
export {
    su
}