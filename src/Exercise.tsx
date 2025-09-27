import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHome, FaWpexplorer } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { PiBalloonFill } from "react-icons/pi";

interface side {
    name: string,
    avt: React.ReactNode,
};

const Exercise = () => {
    const [isVisible, setIsVisible] = useState <boolean> (false);

    const styleForIcon = 'tranform translate-y-[5px] mr-[10px]'
    
    const colors = ['yellow', 'red', 'green'];

    const sidebar: side[] = [
        { name: 'Home', avt: <FaHome className={styleForIcon} /> },
        { name: 'Explore', avt: <FaWpexplorer className={styleForIcon} /> },
        { name: 'Nortification', avt: <CiHeart className={styleForIcon} /> },
        { name: 'Messages', avt: <CiHeart className={styleForIcon} /> },
        { name: 'Bookmarks', avt: <LuMessageSquare className={styleForIcon} /> },
    ];

    const parentVariants = {
        hidden: { opacity: 0, x: -170, },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: {
                staggerChildren: 0.5,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 0, },
        visible: { opacity: 1, y: 5, }, 
    };

    const rootVariants = {
        hidden: { backgroundColor: '#000000' },
        visible: {
            backgroundColor: '#FFFFFF',
            transition: { staggerChildren: 0.5 }
        }
    };

    const x = useMotionValue(0);
    const y1 = useMotionValue(0);

    const c1 = useTransform(x, [-100, 100], ['#ff0000', '#00ff00']);
    const c2 = useTransform(x, [-100, 100], ['#ff0000', '#0000ff']);
    const backgroundColor = useTransform([x, y1], ([x]) => {
        return x == 0 ? c2.get() : c1.get();
    });

    // const { scrollY } = useScroll();

    // const scale = useTransform(scrollY, [0, 100], [1, 1.2]);
    // const y = useTransform(scrollY, [0, 100], [0, -620]);

    return (
        <div className="flex w-[2800px]">

            <motion.div className="h-screen w-screen flex flex-col justify-center items-center"
                variants={rootVariants}
                animate={ isVisible ? 'visible' : 'hidden' }
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >

                {/* balloon */}
                <motion.div className="flex justify-between w-[400px] absolute top-0"
                    variants={{
                        hidden: { opacity: 0, y: -350 },
                        visible: { opacity: 1, y: -90 },
                    }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    {colors.map((c, id) => (
                        <div className="flex flex-col items-center">
                            <div key={id} className="h-[250px] w-[2px] bg-black"></div> 
                            <PiBalloonFill className="text-[5rem] rotate-[180deg] transform translate-y-[-5px]" style={{ color: c }} />
                        </div>   
                    ))} 

                </motion.div>

                {/* side bar */}
                <motion.div 
                    className="absolute top-0 left-0 bg-black h-[1300px] w-[170px] flex justify-center "
                    variants={parentVariants} 
                >
                    <motion.div className="mt-[30px]" variants={parentVariants}> 

                        {sidebar.map((s, id) => (
                            <motion.div key={id} className="cursor-pointer mb-[30px] text-[1.2rem] text-white flex" variants={childVariants}>
                                {s.avt}
                                <div>{ s.name }</div>
                            </motion.div>
                        ))}
                        
                    </motion.div>
                </motion.div>
                    
                {/* HandFlower */}
                <motion.div className="left-[1400px] h-screen w-[600px] flex flex-col justify-end items-center"
                    variants={{
                        hidden: { opacity: 0, x: 0 },
                        visible: { opacity: 1, x: -450, position: 'fixed' },
                    }}                    
                >
                    <div className="text-[2rem]">
                        Tặng cậu!
                        <img src="https://png.pngtree.com/background/20230707/original/pngtree-womens-arm-holding-pink-lily-flower-beautiful-soft-skin-photo-picture-image_4160867.jpg" alt="" />
                    </div>
                    
                </motion.div>

                {/* Button */}
                <motion.button 

                    className="absolute z-[9999] text-white p-[10px_20px] font-bold cursor-pointer rounded-lg border-2 border-none"
                    initial={{ scale: 1 }} 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} 
                    onClick={() => setIsVisible(!isVisible)}
                    drag
                    dragConstraints={{
                        top: -200,
                        left: -200,
                        right: 200,
                        bottom: 200,
                    }}
                    style={{ x, y: y1, backgroundColor }}

                >{ isVisible ? 'Hidden' : 'Show' }</motion.button>
                <motion.div 
                    variants={parentVariants}
                    animate={ isVisible ? 'visible' : 'hidden' }
                >Scroll down to get respond 👇</motion.div>
            </motion.div>

            {/* crush respond =)) */}
            <motion.div className="bg-black text-[2rem] font-bold absolute left-[460px] w-screen top-[1100px]"
                // style={{ y, scale }}
                whileInView={{
                    scale: 1.2,
                    y: -400,
                    backgroundColor: 'transparent',
                }}
            >
                <div className="transform translate-x-[70px] z-[999]">Cook!</div>
                <motion.img 
                    width={400} src="https://inkythuatso.com/uploads/thumbnails/800/2023/01/4-anh-meo-cam-sung-meme-de-thuong-17-15-40-25.jpg" alt="" 
                    initial={{
                        rotateY: 180,
                    }}
                />
            </motion.div>
        </div>
    )
}

export default Exercise