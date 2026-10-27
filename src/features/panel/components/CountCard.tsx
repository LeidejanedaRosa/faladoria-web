import { cn } from '@shared/utils/cn'

interface CountCardProps {
  label: string
  value: number
  hint?: string
  isHighlighted?: boolean
}

// A dt/dd pair inside the parent <dl>: the screen reader reads "Não lidas, 2".
export const CountCard = ({
  label,
  value,
  hint,
  isHighlighted = false,
}: CountCardProps) => (
  <div
    className={cn(
      'flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-5',
      isHighlighted && 'border-t-purple-dark border-t-4'
    )}
  >
    <dt className='text-sm font-medium text-slate-700'>{label}</dt>
    <dd className='flex flex-col gap-1'>
      <span className='text-3xl font-bold text-slate-900'>
        {value.toLocaleString('pt-BR')}
      </span>
      {hint && <span className='text-sm text-slate-600'>{hint}</span>}
    </dd>
  </div>
)
