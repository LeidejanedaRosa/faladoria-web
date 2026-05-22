import { ABOUT_CONTENT } from '../../../data/aboutContent'

export const FounderPhoto = () => {
  const { founder } = ABOUT_CONTENT

  return (
    <figure className='relative flex flex-1 items-end justify-center'>
      <div
        className='from-lavender/30 to-purple-medium animate-glow-pulse absolute h-64 w-64 rounded-full bg-linear-to-br sm:h-72 sm:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96'
        aria-hidden='true'
      />

      <img
        src={founder.image}
        alt={founder.imageAlt}
        width={400}
        height={751}
        loading='lazy'
        decoding='async'
        className='relative bottom-10 z-10 h-64 w-auto object-contain sm:h-72 lg:h-80 xl:h-112.5'
      />

      <figcaption className='bg-purple-dark/60 absolute bottom-0 z-20 rounded-2xl border border-white/20 px-5 py-3 text-center backdrop-blur-md'>
        <p className='text-lg font-bold text-nowrap text-white drop-shadow-md sm:text-xl'>
          {founder.name}
        </p>
        <p className='text-sm font-medium text-white/90 drop-shadow-md'>
          {founder.role}
        </p>
      </figcaption>
    </figure>
  )
}
