import Image from 'next/image';
import React from 'react';
import Header  from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import { getAllChat, sending } from '../redux/asyncAction/chats';
import { costumeSelected } from '../redux/reducers/chats';

const schemaChat = Yup.object().shape({
    chats: Yup.string().min(1).required()
});

const FormChats = ({errors,handleChange,handleSubmit}) =>{
    return(
        <>
            <form onSubmit={handleSubmit} className='flex items-center'>
                <div className='grow'>
                    <input className='text-[14px] w-11/12' onChange={handleChange} placeholder='Write Massage Here' name='chats' type='text' isInvalid={!!errors.chats}/>
                </div>
                <div className='flex-none py-4 px-16 bg-[#1A1A1A]'>
                    <button className='text-[#FFFFFF]'>Send Massage</button>
                </div>
            </form>
            <span className='text-[#cb5858]' type='invalid'>{errors.chats}</span>
        </>
    );
};

const ChatDynamic = () =>{
    return(
        <>
            <div className=' bg-[#bfbfbf] w-100 ml-6 mr-14 mt-3 min-h-[50px] flex items-center'>
                <p className='m-3'>ini Orang lain</p>
            </div>
            <div className=' bg-[#a3a2a2] mr-6 ml-14 mt-3 min-h-[50px] flex items-center'>
                <p className='m-3'>Ini User Login</p>
            </div>
        </>
    );
};

const WrapperDynamic = () => {
    const dispatch = useDispatch();
    const select = () =>{
        dispatch(costumeSelected(id));
    };
    return(
        <>
            <div className='p-11 flex items-center'>
                <div className=''>
                    <Image src='/vercel.svg' width={60} height={60} alt='profile'/>
                </div>
                <div className=' ml-5' onClick>
                    <p className='chats-title text-[#1A1A1A]'>Syifa Guys</p>
                    <p className='chats-text text-[#4D4D4D]'>isi chat terakhir</p>
                </div>
            </div>
        </>
    );
};

const Chats = () => {
    const dispatch = useDispatch();
    const wrapper = useSelector((state=>state.chats.wrapper));
    const conversation = useSelector((state=>state.chats.conversation));
    const token = useSelector((state=>state.auth.token));
    const sendChat = (val) =>{
        dispatch(sending({token,text:val.chats}));
    };
    React.useEffect(()=>{
        dispatch(getAllChat({token}));
    },[]);
    return (
        <>
            <Header/>
            <Banner titleBanner={'Chat'} subtitleBanner={'See your notifications for the latest updates'}/>
            <section>
                <div className='  my-28 mx-36 '>
                    <div className='grid grid-cols-5 min-h-[800px]'>
                        <div className='col-span-2 border border-[#D1D1D1]'>
                            <div className=' p-11 flex items-center bg-[#1A1A1A]'>
                                {/* Data for user Login  */}
                                <div className=''>
                                    <Image src='/vercel.svg' width={60} height={60} alt='profile'/>
                                </div>
                                <div className=' ml-5'>
                                    <p className='chats-title text-[#FFFFFF]'>Syifa Guys</p>
                                    <p className='chats-text text-[#FFFFFF]'>online</p>
                                </div>
                            </div>
                            {wrapper?.map((val)=>{
                                return(
                                    <>
                                        <WrapperDynamic />;
                                    </>
                                );
                            })}
                        </div>
                        <div className='col-span-3 border border-[#D1D1D1]'>
                            <div className=' p-11 flex items-center  bg-[#1A1A1A]'>
                                {/* User Tujuan yang udah di klik COY*/}
                                <div className=''>
                                    <Image src='/vercel.svg' width={60} height={60}  alt='profile'/>
                                </div>
                                <div className=' ml-5'>
                                    <p className='chats-title text-[#FFFFFF]'>Aisyah 12</p>
                                    <p className='chats-text text-[#FFFFFF]' >online</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between min-h-[630px]'>
                                <div className=''>
                                    {conversation&&conversation.map((val)=>{
                                        return(
                                            <>
                                                <ChatDynamic/>
                                            </>
                                        );
                                    })}
                                    
                                </div>
                                <div className='m-6'>
                                    <Formik validationSchema={schemaChat} initialValues={{chats:''}} onSubmit={sendChat}>
                                        {(props)=><FormChats{...props}/>}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Chats;