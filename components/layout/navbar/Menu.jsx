export function MegaMenu({ title, children }) {
    return (
        <li className='relative group px-3 py-2 cursor-pointer'>
            <button className='group-hover:text-[var(--primary)] cursor-pointer font-semibold'>{title} <span className='opacity-50'>▾</span></button>
            <div className='absolute top-0 transition opcacity-0 invisible duration-500 ease-in-out transform translate-y-10 group-hover:translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:transform z-50 w-fit'>
                <div className='relative top-6 rounded-xl w-full'>
                    <div className='w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 rounded-sm translate-x-2' />

                    <div className='relative z-10 text-black'>
                        {children}
                    </div>

                </div>
            </div>
        </li>
    )
}

export function SimpleMenu({ title, url }) {
    return (
        <li className='relative group px-3 py-2 font-semibold'>
            <a href={url} className='hover:text-[var(--primary)] cursor-pointer'>{title}</a>
        </li>
    )
}

