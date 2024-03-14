import NextLink, { type Props } from '@/packages/components/base/Navigations/NextLink';
import cn from '@/packages/utils/cn';

function Link(props: Props) {
  return (
    <NextLink
      {...props}
      className={cn([
        'link link-primary',
        props.className
      ])}
    />
  );
}

export default Link;
