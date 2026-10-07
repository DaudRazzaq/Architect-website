'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export const FILTERS = ['All', 'Residential', 'Commercial', 'Multipurpose'] as const;

export type ProjectFilter = (typeof FILTERS)[number];

interface FilterState {
    active: ProjectFilter;
    setActive: (filter: ProjectFilter) => void;
}

const FilterContext = createContext<FilterState | null>(null);

/**
 * Shares the selected category between the tabs, which sit at the foot of
 * the hero, and the grid further down the page.
 */
export function ProjectsFilterProvider({ children }: { children: ReactNode }) {
    const [active, setActive] = useState<ProjectFilter>('All');
    return <FilterContext.Provider value={{ active, setActive }}>{children}</FilterContext.Provider>;
}

export function useProjectsFilter(): FilterState {
    const state = useContext(FilterContext);
    if (!state) throw new Error('useProjectsFilter must be used inside <ProjectsFilterProvider>');
    return state;
}

/**
 * Category tabs. They must be rendered inside `.pw-hero`: the hero is their
 * positioning context, so they always sit on its bottom edge, whatever the
 * height of the screen.
 */
export default function ProjectsFilterTabs() {
    const { active, setActive } = useProjectsFilter();

    return (
        <div className="pw-hero-filters">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    className={`pw-hero-filter-btn${active === filter ? ' active' : ''}`}
                    aria-pressed={active === filter}
                    onClick={() => setActive(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
