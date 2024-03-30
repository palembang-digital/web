'use client';

import { useEffect, type HTMLAttributes, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import BrowserRender from '@/packages/components/base/Displays/BrowserRender';
import cn from '@/packages/utils/cn';

import styles from './Overlay.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  lockedBody?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Base Component to create Modal
 * See `Dialog` component for example usage
 */
function Overlay(props: PropsWithChildren<Props>) {
  const {
    show,
    children,
    lockedBody = false,
    className = '',
    ...attrProps
  } = props;

  useEffect(() => {
    /** lock body scroll when overlay show */
    if (!lockedBody) return;
    if (show) {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, [lockedBody, show]);

  const Component = (
    <div
      {...attrProps}
      className={cn([
        styles.overlay,
        'bg-black bg-opacity-75',
        className
      ])}
    >
      {children}
    </div>
  );

  return (
    <BrowserRender>
      {show && createPortal(Component, document.body)}
    </BrowserRender>
  );
}

export default Overlay;
