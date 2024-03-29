import React, { FC, useCallback } from 'react'

import cn from 'classnames'

import { ModalSelectItem } from './ModalItem'

import styles from './ModalSelect.module.scss'

type Props = {
  modalList: string[],
  activeItem: string | null,
  onChangeItem: (item: string) => void,
  onToggleModal: () => void,
  isIconVisible: boolean
}

export const ModalSelect: FC<Props> = ({ modalList, activeItem, onChangeItem, onToggleModal, isIconVisible }) => {
  const handleClickItem = useCallback((itemName: string) => {
    onChangeItem(itemName)
    onToggleModal()
  }, [onChangeItem, onToggleModal])

  return (
    <>
      <ul className={cn(styles.modalList, isIconVisible && styles.modalListWithIcon)}>
        {modalList.map((item, i) =>
          <ModalSelectItem
            key={i}
            item={item}
            activeItem={activeItem}
            onClickItem={handleClickItem}
            isIconVisible={isIconVisible}
          />
        )}
      </ul>
      <div className={styles.substrate} onClick={onToggleModal}></div>
    </>
  )
}
