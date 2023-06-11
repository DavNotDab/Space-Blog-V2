import FavImages from "./FavImages";
import FavNews from "./FavNews";
import Subscriptions from "./Subscriptions";
import UserInfo from "./UserInfo";

export default function ProfileMenu() {

    return (
        <nav>
            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link show active" id="user-info-tab" data-bs-toggle="tab"
                            data-bs-target="#user-info-tab-pane" type="button" role="tab" aria-controls="info-tab-pane"
                            aria-selected="true">User information
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="fav-images-tab" data-bs-toggle="tab"
                            data-bs-target="#fav-images-tab-pane" type="button" role="tab" aria-controls="fav-images-tab-pane"
                            aria-selected="true">Favorite images
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="fav-news-tab" data-bs-toggle="tab"
                            data-bs-target="#fav-news-tab-pane" type="button" role="tab" aria-controls="fav-news-tab-pane"
                            aria-selected="false">Favorite news
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="subscriptions-tab" data-bs-toggle="tab"
                            data-bs-target="#subscriptions-tab-pane" type="button" role="tab" aria-controls="subscriptions-tab-pane"
                            aria-selected="false">Subscriptions
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="user-info-tab-pane" role="tabpanel" aria-labelledby="user-info-tab" tabIndex="0">
                    <UserInfo/>
                </div>
                <div className="tab-pane fade" id="fav-images-tab-pane" role="tabpanel" aria-labelledby="fav-images-tab" tabIndex="0">
                    <FavImages/>
                </div>
                <div className="tab-pane fade" id="fav-news-tab-pane" role="tabpanel" aria-labelledby="fav-news-tab" tabIndex="0">
                    <FavNews/>
                </div>
                <div className="tab-pane fade" id="subscriptions-tab-pane" role="tabpanel" aria-labelledby="subscriptions-tab" tabIndex="0">
                    <Subscriptions/>
                </div>
            </div>

        </nav>
    );

}
