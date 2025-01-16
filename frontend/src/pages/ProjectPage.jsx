import { FaArrowUp } from 'react-icons/fa'
import { projectData } from '../data/data'

const Project = () => {
  return (
    <div>
      <div className='bg-cover bg-center  bg-[url(https://c1.wallpaperflare.com/preview/14/432/956/laptop-computer-dark-room.jpg)] grid place-items-center text-center '>
        <h1 className='text-5xl w-full h-full bg-black/50 py-20 font-semibold uppercase text-white'>
          Project
        </h1>
      </div>
      <div className='py-20 w-[90vw] mx-auto'>
        <div className='text-center'>
          <h1
            data-aos='fade-right'
            className='text-3xl md:text-6xl color capitalize dark:text-white text-left font-medium'
          >
            my Recent <span className='color1'>project</span>
          </h1>
          <div className='mt-20 grid gap-10 lg:grid-cols-3 md:grid-cols-2 '>
            {projectData.map((item) => (
              <div
                data-aos='zoom-in-down'
                data-delay={200 * item.id}
                key={item.id}
                onClick={() => window.open(`${item.link}`)}
                className='w-full group hover:scale-[1.04] duration-700 relative cursor-pointer '
              >
                <div className='h-[300px] shadow1 rounded-t-md overflow-hidden w-full'>
                  <img
                    src={item.img}
                    alt={item.title}
                    width={470}
                    height={40}
                    className='w-full h-[2500px]  translate-y-0  group-hover:-translate-y-[77.5%] transition-all hover:ease-in duration-[4s] cursor-pointer' 
                  />
                </div>
                <h1 className='group-hover:text-white border border-[#00ADB5]/70 shadow-2xl text-sm  md:text-xl  text-left capitalize text-black group-hover:bg-[#00ADB5]/70 rounded-lg mt-4 items-center flex justify-between dark:text-white  w-full py-2 px-4 duration-700'>
                  {item.title}
                  <FaArrowUp className='p-1 rounded-full rotate-45 text-2xl bg-[#00ADB5]/70 text-gray-200 group-hover:bg-white font-thin group-hover:text-black' />
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
