import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { createScrollHandler } from "on-element-scroll";

const initialState = {
  direction: { current: null, up: null, down: null },
  height: { full: null, scrolled: null, visible: null },
  percent: { current: null },
  touched: false,
};

const initialProps = { wait: 100 };

const useElementScroll = ({ ref, wait = 100 } = initialProps) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const onScroll = createScrollHandler({ callback: setState });
    const onScrollThrottled = throttle(onScroll, wait, {
      leading: false,
      trailing: true
    });

    if (ref) {
      const element = ref.current;
      element.addEventListener('scroll', onScrollThrottled);

      return () => element.removeEventListener('scroll', onScrollThrottled);
    }

    window.addEventListener('scroll', onScrollThrottled);
    return () => window.removeEventListener('scroll', onScrollThrottled);
  }, []);

  return state;
};

export default useElementScroll;
