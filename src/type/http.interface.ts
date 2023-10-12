interface IRespData<T> {
    data: T;
    statusCode: number;
    statusMsg: string;
};

export {
    IRespData
}