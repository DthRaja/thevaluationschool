"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules";

const CAREERS = [
    { title: "Investment Mangement", image: "/img/Investment Mangement.png" },
    { title: "Consulting", image: "/img/Consulting.png" },
    { title: "Financial Analyst", image: "/img/career-after-cfa-1.png" },
    { title: "Corporote Finance", image: "/img/Corporote Finance.png" },
    { title: "Investment Banking", image: "/img/Investment Banking.png" },
    { title: "Equity Research", image: "/img/Equity Research.png" },
    { title: "Risk Mangement", image: "/img/Risk Mangement.png" },
    { title: "Portfolio Management", image: "/img/Portfolio Management.png" },
    { title: "Wealth Mangement", image: "/img/Wealth Mangement.png" },
    { title: "Corporote Finance", image: "/img/Corporote Finance1.png" },
];

const CarrierAfterCfa = () => {
    return (
        <div className="carrier-after-cfa">
            <div className="carrier-after-cfa-container">
                <div className="carrier-after-cfa-header">
                    <h3>Career After CFA® Program</h3>
                </div>
                <Swiper
                    className="carrier-after-cfa-swiper"
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={true}
                    breakpoints={{
                        1800: { slidesPerView: 8, spaceBetween: 15 },
                        1200: { slidesPerView: 6, spaceBetween: 15 },
                        768: { slidesPerView: 1, spaceBetween: 15 },
                    }}
                >
                    {CAREERS.map((career, index) => (
                        <SwiperSlide key={`${career.title}-${index}`}>
                            <div className="carrier-after-cfa-card">
                                <h3>{career.title}</h3>
                                <Image
                                    src={career.image}
                                    alt={career.title}
                                    width={180}
                                    height={140}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CarrierAfterCfa;
