
// Function to construct the correct image URL
export const getImageUrl = (imageId) => {
    if (imageId && imageId.startsWith("RX_THUMBNAIL")) {
        return `https://media-assets.swiggy.com/${imageId}`;
    } else if (imageId) {
        return `https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,w_660/${imageId}`;
    }
    // fallback placeholder
    return "https://bimnametha.com/wp-content/uploads/image-placeholder-300x200.png";
};