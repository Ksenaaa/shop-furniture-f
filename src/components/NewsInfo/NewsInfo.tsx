import React, { FC, useCallback, useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import cn from 'classnames'

import arrow from 'img/svg/swipe-arrow.svg'
import { useGetNewsIdsQuery, useGetOneNewsQuery } from 'store/services/news'
import { titleName } from 'utils/constants/titleName'
import { getBlurImage } from 'utils/helpers/getBlurImage'

import { Loader } from 'components/Loader'

import Error from 'pages/404'

import styles from './NewsInfo.module.scss'

type Props = {
  id: string
}

export const NewsInfo: FC<Props> = ({ id }) => {
  const { data: news, isLoading, isSuccess, isError } = useGetOneNewsQuery(id)
  const { data: newsIds } = useGetNewsIdsQuery()

  const indexItem = newsIds?.findIndex(item => item.id === id) || 0

  const previousId = useMemo(() => {
    if (!newsIds?.length) return

    return indexItem === 0 ? newsIds[newsIds.length - 1].id : newsIds[indexItem - 1]?.id
  }, [newsIds, indexItem])

  const nextId = useMemo(() => {
    if (!newsIds?.length) return

    return indexItem + 1 === newsIds.length ? newsIds[0].id : newsIds[indexItem + 1]?.id
  }, [newsIds, indexItem])

  const getBlur = useCallback((img: string) => getBlurImage(img), [])

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {isError && <Error />}
      {isSuccess &&
        <>
          <div className={cn(styles.picture, styles.pictureTitle)}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${news?.pictures[1]}`}
              alt="img"
              fill
              priority
              placeholder="blur"
              blurDataURL={getBlur(news?.pictures[1] as string)}
            />
            <div className={styles.overlapPicture}></div>

            <div className={styles.descTitle}>
              <div className={styles.nameTitle}>
                {news?.name}
              </div>
              <div className={styles.textTitle}>
                {news?.text}
              </div>
            </div>

            <div className={styles.toggleItems}>
              <Link
                href={`/${titleName.news.path}/${previousId}`}
                className={styles.toggleItem}
              >
                <div className={styles.toggleItemText}>
                  Previous news
                </div>
                <div className={styles.toggleItemPicture}>
                  <Image src={arrow} alt="arrow" />
                </div>
              </Link>
              <Link
                href={`/${titleName.news.path}/${nextId}`}
                className={styles.toggleItem}
              >
                <div className={styles.toggleItemText}>
                  Next news
                </div>
                <div className={styles.toggleItemPicture}>
                  <Image src={arrow} alt="arrow" />
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.wrapperText}>
            <div className={styles.name}>
              {news?.name}
            </div>
            <div className={styles.text}>
              {news?.text}
            </div>
            <div className={cn(styles.picture, styles.pictureText)}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${news?.pictures[2]}`}
                alt="img"
                fill
                placeholder="blur"
                blurDataURL={getBlur(news?.pictures[2] as string)}
              />
            </div>
          </div>
        </>
      }
    </div>
  )
}
