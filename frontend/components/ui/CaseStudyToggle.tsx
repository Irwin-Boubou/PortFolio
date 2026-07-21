'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiBookmark, FiX } from 'react-icons/fi';

const HASH = '#case-study';

interface CaseStudyContextValue {
  active: boolean;
  toggle: () => void;
}

const CaseStudyContext = createContext<CaseStudyContextValue>({ active: false, toggle: () => {} });

export function useCaseStudyMode() {
  return useContext(CaseStudyContext);
}

/** Lifts case-study-mode state above Navbar/main/Footer so all three can react to it. */
export function CaseStudyModeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(window.location.hash === HASH);
    const onHashChange = () => setActive(window.location.hash === HASH);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const toggle = () => {
    if (window.location.hash === HASH) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setActive(false);
    } else {
      window.location.hash = HASH;
      setActive(true);
    }
  };

  return <CaseStudyContext.Provider value={{ active, toggle }}>{children}</CaseStudyContext.Provider>;
}

/** Wraps chrome (Navbar/Footer) so it fades out while case-study mode is active. */
export function CaseStudyChrome({ children }: { children: ReactNode }) {
  const { active } = useCaseStudyMode();
  return (
    <div className={`transition-opacity duration-300 ${active ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
      {children}
    </div>
  );
}

/** Wraps the project content so it becomes a centered, readable full-viewport column when active. */
export function CaseStudyContent({ children }: { children: ReactNode }) {
  const { active, toggle } = useCaseStudyMode();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <AnimatePresence>
        {active && (
          <motion.div
            key="case-study-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg"
          >
            <button
              onClick={toggle}
              className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full border border-muted/25 bg-surface px-4 py-2 text-sm shadow-md transition-colors hover:border-primary/50"
            >
              <FiX /> <ExitLabel />
            </button>
            <div className="mx-auto max-w-[800px] px-6 py-20 text-lg leading-relaxed md:text-xl">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={active ? 'invisible' : ''}>{children}</div>
    </div>
  );
}

function ExitLabel() {
  const t = useTranslations('caseStudy');
  return <>{t('exit')}</>;
}

/** Bookmark-icon toggle button meant for the project meta bar. */
export function CaseStudyEnterButton() {
  const { toggle } = useCaseStudyMode();
  const t = useTranslations('caseStudy');
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 rounded-full border border-muted/25 px-3 py-1.5 text-sm text-secondary transition-colors hover:border-secondary"
    >
      <FiBookmark /> {t('enter')}
    </button>
  );
}
