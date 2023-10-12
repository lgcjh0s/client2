import moment from "moment";
import { ChangeEvent, useState } from "react";
import { http } from "../tools/http.tools";
import { su } from "../tools/string.tools";
import { IAPIData, IBookItem, INewsItem } from "../type/data.interface";
import { IRespData } from "../type/http.interface";

const List = () => {

    const [tab, setTab] = useState<string>('01');
    const [apiData, setApiData] = useState<IAPIData | null>(null);
    const [keyword, setKeyword] = useState<string>('');

    const clickTab = (tabId: string) => {
        setTab(tabId);
    };

    const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value || '');
    };

    const callApi = async () => {
        const url: string = '/api/data';
        const type: string = tab === '01' ? 'news' : 'book';
        const data: string = 'type=' + type + '&keyword=' + keyword;

        const resp: IRespData<IAPIData> = 
            await http.doGet(url, data);
        
        console.log(resp.data);
        setApiData(resp.data);
    }; 

    return (
        <>
            <div className="page">
                {/* SearchBar Component */}
                <div className="searchBar"> 
                    <span>
                        <input type="text" id="keyword" onChange={ changeKeyword } 
                            className="keyword" />
                    </span>
                    <span>
                        <button className="btnSearch"
                            onClick={ callApi }></button>
                    </span>
                </div>

                {/* List */}
                <div className="contents">
                    <ul className="listview">
                    {
                        apiData && apiData.items && apiData.items.length > 0 ?
                            apiData.items.map((item: INewsItem | IBookItem) => {
                                return apiData.type === 'news' ?
                                <NewsRow { ...item as INewsItem } /> :
                                <BookRow { ...item as IBookItem } />
                            })
                        :
                            <li>
                                <span>조회한 뉴스가 없습니다.</span>
                            </li>
                    }
                    </ul>
                </div>

                {/* Tab Component */}
                <div className="tabBar">
                    <div className={ 'tab' + (tab === '01' ? ' on' : '') }
                        onClick={ () => clickTab('01') }>
                        뉴스
                    </div>
                    <div className={ 'tab' + (tab === '02' ? ' on' : '') }
                        onClick={ () => clickTab('02') }>
                        도서
                    </div>
                </div>
                


            </div>
        </>
    )
};

const NewsRow = (item: INewsItem) => {
    const pubDate: string = moment(item.pubDate).format('YYYY.MM.DD HH:mm');
    const title: string = su.unescape(su.stripTag(item.title));
    const desc: string = su.unescape(su.stripTag(item.description));
    return <li className="newsRow">
        <span className="title ellipsis">
            { title }
        </span>
        <span className="date">
            { pubDate }
        </span>
        <span className="desc ellipsis">
            { desc }
        </span>
    </li>
};

const BookRow = (item: IBookItem) => {
    const author: string = item.author;
    const title: string = su.unescape(su.stripTag(item.title));
    const desc: string = su.unescape(su.stripTag(item.description));
    const imgUri: string = item.image;

    return <li className="bookRow">
        <div className="imgDiv">
            <img src={ imgUri } />
        </div>
        <div className="infoDiv">
            <span className="title ellipsis">{ title }</span>
            <span className="author">{ author }</span>
            <span className="desc ellipsis">{ desc }</span>
        </div>
    </li>
};

export default List;