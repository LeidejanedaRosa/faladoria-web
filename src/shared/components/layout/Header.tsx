import { createPortal } from 'react-dom'

import logoFaladoria from '@assets/logo_faladoria.svg'
import { COMPANY_INFO } from '@shared/data/companyInfo'
import { NAV_ITEMS } from '@shared/data/navigation'
import { CloseIcon, MenuIcon, WhatsAppCTA } from '@shared/components/ui'
import { useSidebar } from '@shared/hooks/useSidebar'
import { cn } from '@shared/utils/cn'

const MOBILE_MENU_ID = 'mobile-menu'

const LOGO_WIDTH = 600
const LOGO_HEIGHT = 485

interface HeaderProps {
  onSidebarToggle?: (isOpen: boolean) => void
}

export const Header = ({ onSidebarToggle }: HeaderProps) => {
  const { isOpen, open, close, triggerRef, sidebarRef } = useSidebar({
    onOpenChange: onSidebarToggle,
  })

  return (
    <>
      <header role="banner" className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <a
            href="/"
            aria-label={`${COMPANY_INFO.name} - Ir para página inicial`}
          >
            <img
              src={logoFaladoria}
              alt={`Logo ${COMPANY_INFO.name}`}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className="h-12 w-auto"
            />
          </a>

          <DesktopNav />

          <WhatsAppCTA className="hidden text-nowrap md:inline-flex" />

          <button
            ref={triggerRef}
            type="button"
            className="text-purple-dark hover:bg-gray-light focus:ring-purple-medium inline-flex items-center justify-center rounded-lg p-2.5 transition-colors focus:ring-2 focus:outline-none md:hidden"
            onClick={open}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label="Abrir menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {typeof document !== 'undefined' &&
        createPortal(
          <MobileSidebar
            isOpen={isOpen}
            onClose={close}
            sidebarRef={sidebarRef}
          />,
          document.body
        )}
    </>
  )
}

const DesktopNav = () => (
  <nav aria-label="Navegação principal" className="hidden md:block">
    <ul className="mx-5 flex items-center justify-center gap-5 lg:gap-8">
      {NAV_ITEMS.map(item => (
        <li key={item.href}>
          <a
            href={item.href}
            className="text-purple-dark hover:text-purple-medium text-sm font-medium text-nowrap transition-colors lg:text-xl"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  sidebarRef: React.RefObject<HTMLDivElement | null>
}

const MobileSidebar = ({ isOpen, onClose, sidebarRef }: MobileSidebarProps) => (
  <div
    id={MOBILE_MENU_ID}
    className={cn(
      'fixed inset-0 z-50 md:hidden',
      isOpen ? 'visible' : 'invisible'
    )}
    role="dialog"
    aria-modal="true"
    aria-label="Menu de navegação"
  >
    <div
      className={cn(
        'absolute inset-0 bg-black/50 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
      role="presentation"
      onClick={onClose}
      aria-hidden="true"
    />

    <div
      ref={sidebarRef}
      className={cn(
        'absolute top-0 right-0 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <a
          href="/"
          aria-label={`${COMPANY_INFO.name} - Ir para página inicial`}
          onClick={onClose}
        >
          <img
            src={logoFaladoria}
            alt={`Logo ${COMPANY_INFO.name}`}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className="h-10 w-auto"
          />
        </a>
        <button
          type="button"
          className="text-purple-dark hover:bg-gray-light focus:ring-purple-medium inline-flex items-center justify-center rounded-lg p-2.5 transition-colors focus:ring-2 focus:outline-none"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <nav aria-label="Links do menu" className="flex-1 px-4 pt-2">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-purple-dark hover:bg-gray-light block rounded-lg px-4 py-3 text-base font-medium transition-colors"
                onClick={onClose}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-gray-light border-t px-5 py-6">
        <WhatsAppCTA className="inline-flex w-full justify-center" />
      </div>
    </div>
  </div>
)
