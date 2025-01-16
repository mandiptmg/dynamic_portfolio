import { Link } from "react-router-dom"

const Contact = () => {
  return (
    <div className='w-[90vw] mx-auto py-20'>
      <div className='text-center'>
        <h1 data-aos='fade-up' className='font-bold md:text-2xl text-xl color1'>
          Lets create awesome products!
        </h1>
        <div className='mt-12  max-w-2xl mx-auto'>
          <p
            data-aos='fade-up'
            className='color dark:text-white text-base md:text-lg '
          >
            I am always open to discussing your project, improving your online
            presence, or helping with Your websites design and converting
            challenges.
          </p>
          <Link to='/contact'>
            <button
              data-aos='fade-up'
              className='cursor-pointer uppercase mt-5 hover:text-black hover:bg-white text-white  bg-[#00ADB5] px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition'
            >
              contact me
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
