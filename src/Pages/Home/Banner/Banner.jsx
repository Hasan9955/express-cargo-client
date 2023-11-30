import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, EffectFade, Navigation, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import PendingStatus from '../../../Components/PendingStatus';






const Banner = () => {



    const [sliders, setSliders] = useState()

    const axiosPublic = useAxiosPublic();
    const { isPending } = useQuery({
        queryKey: ['sliders'],
        queryFn: async () => {
            const res = await axiosPublic.get('/sliders')
            setSliders(res.data) 
            return res.data
        }
    })

    if(isPending){
        return <PendingStatus></PendingStatus>
    }



    return (
        <div>
            <div className='w-full h-20'></div>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={false}
                loop={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Keyboard, EffectFade, Navigation, Pagination]}
                className="mySwiper"
            >
                {

                    sliders && <div> 
                        <SwiperSlide>
                            <div><img src={sliders[0]?.image} alt="" /></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div><img src={sliders[1]?.image} alt="" /></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div><img src={sliders[2]?.image} alt="" /></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div><img src={sliders[3]?.image} alt="" /></div>
                        </SwiperSlide>
                    </div>
                }
            </Swiper>

        </div>
    );
};

export default Banner;