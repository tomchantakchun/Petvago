import React from 'react';
import SlideShow from 'react-image-show';
 
class ImageShow extends React.Component {
  render() {
    return (
      <SlideShow
        images={this.props.urlArray}
        width="80vh"
        imagesWidth="70vh"
        imagesHeight="50vh"
        imagesHeightMobile="80vw"
        thumbnailsWidth="70vh"
        thumbnailsHeight="12vw"
        indicators thumbnails fixedImagesHeight
      />
    );
  }
 
}

export default ImageShow;