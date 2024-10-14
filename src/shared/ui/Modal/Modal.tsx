import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {forwardRef, useCallback} from 'react';

type Props = Omit<BottomSheetModalProps, 'backdropComponent'>;

export const Modal = forwardRef<BottomSheetModalMethods, Props>(
  ({children, ...props}, ref) => {
    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        );
      },
      [],
    );

    return (
      <BottomSheetModal ref={ref} {...props} backdropComponent={renderBackdrop}>
        {children}
      </BottomSheetModal>
    );
  },
);
