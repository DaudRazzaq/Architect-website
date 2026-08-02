import type { SVGProps } from 'react';
import { MARK_PATH, MARK_VIEWBOX, WORDMARK_PATH, WORDMARK_VIEWBOX } from '@/lib/brand';

/**
 * Aureon Studio brand marks.
 *
 * Rendered as inline SVG so they stay pixel-perfect at every size and device
 * pixel ratio, inherit their colour from CSS via `currentColor` (no
 * brightness/invert filter hacks), and cost zero network requests.
 *
 *   <Logo />      full horizontal wordmark   — 960 x 124 (7.74 : 1)
 *   <LogoMark />  standalone lambda mark     — 121 x 108 (1.12 : 1)
 *
 * Size them with `width` in CSS and leave `height: auto`.
 */

type BrandProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
    /** Accessible name. Pass `null` to render the mark as decorative. */
    label?: string | null;
};

function a11y(label: string | null | undefined) {
    return label === null
        ? { 'aria-hidden': true as const, role: 'presentation' }
        : { role: 'img' as const, 'aria-label': label ?? 'Aureon Studio' };
}

export function Logo({ label, ...props }: BrandProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={WORDMARK_VIEWBOX}
            focusable="false"
            {...a11y(label)}
            {...props}
        >
            <path fill="currentColor" fillRule="evenodd" d={WORDMARK_PATH} />
        </svg>
    );
}

export function LogoMark({ label, ...props }: BrandProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={MARK_VIEWBOX}
            focusable="false"
            {...a11y(label)}
            {...props}
        >
            <path fill="currentColor" fillRule="evenodd" d={MARK_PATH} />
        </svg>
    );
}

export default Logo;
