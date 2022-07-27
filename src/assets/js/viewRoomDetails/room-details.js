imgs = undefined
imgs = document.querySelectorAll('.img-select a');

imgBtns = undefined
imgBtns = [...imgs];

imgId = undefined
imgId = 1;
function slideImage(){
  const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

  document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}



imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});


window.addEventListener('resize', slideImage);
