import { useEffect, useState, RefObject } from 'react';

interface UseInViewportOptions {
    threshold?: number;
    rootMargin?: string;
}

export function useInViewport(
    ref: RefObject<Element | null>,
    options: UseInViewportOptions = {}
): boolean {
    const { threshold = 0.1, rootMargin = '0px' } = options;
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, threshold, rootMargin]);

    return isInViewport;
}
