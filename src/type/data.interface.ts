interface INewsItem {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
};

interface IBookItem {
    author: string;
    description: string;
    discount: string;
    image: string;
    isbn: string;
    link: string;
    pubdate: string;
    publisher: string;
    title: string;
};

interface IAPIData {
    total: number;
    start: number;
    display: number;
    type: string;
    items: INewsItem[] | IBookItem[];
};

export {
    IAPIData,
    INewsItem,
    IBookItem
}