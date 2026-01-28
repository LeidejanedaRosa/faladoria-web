interface CloseIconProps {
  className?: string
}

export const CloseIcon = ({ className = 'w-6 h-6' }: CloseIconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    role="presentation"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)
