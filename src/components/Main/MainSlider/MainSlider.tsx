import React from 'react'

import swipeLeftImg from 'img/svg/swipe-left.svg'
import swipeRightImg from 'img/svg/swipe-right.svg'
import { useGetSliderImgsQuery } from 'store/services/slider'
import { timeoutTransition } from 'utils/constants/timeoutTransition'

import { Slider } from 'components/Slider'

import { SliderItem } from './SliderItem'

import styles from './MainSlider.module.scss'

export const MainSlider = () => {
  const { data: sliderPictures = [], isLoading } = useGetSliderImgsQuery()

  return (
    <div className={styles.wrapper}>
      <Slider
        picturesLength={sliderPictures.length}
        speed={timeoutTransition}
        isLoading={isLoading}
        isAutoCarousel={true}
        isSwipe={true}
        column={1}
        swipeLeftImg={swipeLeftImg}
        swipeRightImg={swipeRightImg}
        stylesSwipeWrapper={styles.stylesSwipeWrapper}
      >
        {sliderPictures?.map(pic =>
          <SliderItem key={pic.id} picture={pic} />
        )}
      </Slider>
    </div>
  )
}