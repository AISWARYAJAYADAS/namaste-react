export const LOGO_URL = 'https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg';

const CORS_PROXY_URL = "https://proxy.corsfix.com/?";

export const SWIGGY_API_URL = CORS_PROXY_URL+ 
"https://www.swiggy.com/dapi/restaurants/list/v5?lat=10.4522788&lng=76.2693369&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";


export const getSwiggyMenuUrl = (id) => {
    return `https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.4522788&lng=76.2693369&restaurantId=${id}`;
};