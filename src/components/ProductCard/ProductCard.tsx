import React, { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Image from 'next/image'
import Link from 'next/link'

import likeIcon from 'img/svg/heart-icon-orange.svg'
import basketIcon from 'img/svg/to-basket.svg'
import { ICardProduct } from 'interface/productInterface'
import { useGetColorsQuery } from 'store/services/colors'
import { menuCategories } from 'utils/constants/menuCategories'
import { Routes } from 'utils/constants/routes'
import { getBlurImage } from 'utils/helpers/getBlurImage'
import { productColors } from 'utils/helpers/productColors'

import { ColorCard } from 'components/ColorCard'

import styles from './ProductCard.module.scss'

type Props = {
  product: ICardProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const { data, isSuccess } = useGetColorsQuery()
  const colors = isSuccess ? productColors(product.colors, data) : []

  const getBlur = useCallback((img: string) => getBlurImage(img), [])

  const { t } = useTranslation()
  const categoryData = menuCategories?.find(categoryData => categoryData.id === product.category)

  return (
    <Link href={`/${Routes.CATALOG}/${categoryData?.path}/${product.id}`} className={styles.wrapper}>
      <div className={styles.picture}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
          alt="img"
          fill
          sizes="33vw"
          placeholder="blur"
          blurDataURL={getBlur(product.img)}
        />
      </div>
      <div className={styles.categoryWithCode}>
        <div className={styles.category}>
          {t(categoryData?.name || '')}
        </div>
        <div className={styles.code}>
          {product.code}
        </div>
      </div>
      <div className={styles.name}>
        {product.name}
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.price}>
          from ${product.price}
        </div>
        <div className={styles.colors}>
          {colors?.slice(-4).map((color, index) =>
            <div className={styles.color} key={index}>
              <ColorCard img={color.img} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.activeElements}>
        <div className={styles.like}>
          <Image src={likeIcon} alt="like" />
        </div>
        <div className={styles.basket}>
          <Image src={basketIcon} alt="basket" />
        </div>
      </div>
    </Link>
  )
}
