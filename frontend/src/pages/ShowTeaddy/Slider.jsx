import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative ,Autoplay} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import 'swiper/css/effect-creative';
import { BASE_URL } from '../../constant';
const Slider = ({images}) => {
  return (
    <>
              <Swiper
        grabCursor={true}
        loop
        autoplay={
            {
                delay: 1000,
                disableOnInteraction: false,
              }
        }




        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-125%', 0, -800],
            rotate: [0, 0, -90],
          },
          next: {
            shadow: true,
            translate: ['125%', 0, -800],
            rotate: [0, 0, 90],
          },
        }}
        modules={[EffectCreative,Autoplay]}
        className="mySwiper5 !w-full xl:!w-1/2 h-[50vh]"
      >
        {
           images && images.length>0 &&images.map((cur,i)=>{
                return <SwiperSlide className='bg-blue-500'>
                  <img src={BASE_URL+"/api/v1/static/"+cur} alt="" className='h-full w-full object-cover' />
                </SwiperSlide> 
            })
        }
      </Swiper>
    </>
  )
}

export default Slider