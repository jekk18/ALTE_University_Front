import React, { useEffect, useRef, useState } from 'react';

import SubscribeItem from './SubscribeItem';
import { useRouter } from 'next/router';
import SubscribeIcon from '../Icons/SubscribeIcon';
import ButtonComponent from '../FormComponent/ButtonComponent';
import { useSettings } from '@/core/settings/context';
import { Subscribe, getSubscribeTopics } from '@/core/subscribe/request';
import { BeatLoader } from 'react-spinners'
import Alert from '../alert/Alert';
import { useTranslations } from "@/core/Translations/context";

const FooterSubscribe = (props) => {

    const translations = useTranslations();
    const [inputValue, setInputValue] = useState('');
    const [subscribeArray, setSubscribeArray] = useState([]);
    const [ItemCount, setItemCount] = useState(0);
    const [activeButton, setActiveButton] = useState(false);
    const [succsess, setSuccsess] = useState(false)
    const [subscribeTopics, setSubscribeTopics] = useState([]);
    const [loader, setLoader] = useState(false);
    const [responseText, setResponseText] = useState('')
    const [open, setOpen] = useState(false);
    const inputRef = useRef('');
    const router = useRouter();
    const { locale } = router;
    const setting = useSettings();



    const handleSubscribeItem = (itemID, coutActive) => {
        if (coutActive) {
            setItemCount(ItemCount + 1);
            const itemsArray = [...subscribeArray, itemID.currentTarget.id];
            setSubscribeArray(itemsArray);
        } else {
            setItemCount(ItemCount - 1);
            let clickedItem = itemID.currentTarget.id;
            let resultSubscribeArray = subscribeArray.filter((el) => el !== clickedItem);
            setSubscribeArray(resultSubscribeArray);
        }
    }


    useEffect(() => {
        if (inputRef.current.value?.length > 2) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [subscribeArray, inputValue])

    const handleSubmit = (e) => {
        if (activeButton) {
            const NewInputValue = [...subscribeArray, inputRef.current.value];
            setSubscribeArray(NewInputValue);
            setSubscribeArray([]);
            inputRef.current.value = '';
        } else {
            alert('არ არის შევსებული');
        }
    };

    // get Topics  
    useEffect(() => {
        const fetchSubscriberTopics = async () => {
            try {
                const subscribeTopics = await getSubscribeTopics();
                setSubscribeTopics(subscribeTopics?.topics)
            } catch (error) {
                console.error("Error fetching section posts:", error);
            }
        }
        fetchSubscriberTopics();
    }, [locale]);
    // get Topics 


    const handleCloseAlert = (openValue) => {
        setOpen(openValue)
    }

    const sentSubscribe = async (e) => {
        e.preventDefault();

        try {
            setLoader(true)
            const data = {
                email: inputValue,
                directories: subscribeArray,
            };
            const res = await Subscribe(
                data
            );
            setResponseText(res?.message)
            setSuccsess(true)
            setOpen(true)
        } catch (error) {
            if (error.response) {
                //   console.log( error.response.data ?? error.response.data?.error, 'error')  
                setSuccsess(false)
                setResponseText(error.response.data.message ?? error.response.data?.error)
                setLoader(false)
                setOpen(true)
            }
            return 'An error occurred while submitting the data.';
        }
        setLoader(false)
        setSubscribeArray([]);
        setInputValue('')
    }


    return (
        <div className={`subscribe-container section-padding subscribe-padding ${props.class}`}>
            {
                open && <Alert click={handleCloseAlert} succsess={succsess} responseText={responseText} />
            }
            <div className="container">
                <div className="subscribe-box">
                    <div className="col-lg-3 col-sm-12 col-12 subscribe-text-cont">
                        <h2 className='geo-font-bold-caps'>
                            {translations?.subscribtion_title}
                        </h2>
                        <div className="text geo-font-3">
                            {translations?.subscribtion_description}
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12 col-12 subscribe-send-box">
                        <div className="subscribe-items">
                            <ul>
                                {
                                    subscribeTopics?.map((topic, index) => {
                                        return (
                                            <SubscribeItem key={topic?.id} subscribeItemsTitle={topic?.title} clickHandleSubscribe={handleSubscribeItem} itemId={topic?.id} activeId={subscribeArray.includes(`${topic?.id}`)} />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="subscribe-input">
                            <form onSubmit={sentSubscribe} name='subscribeForm'>
                                <input type="text" placeholder={translations?.subscribtion_placeholder} ref={inputRef} onChange={() => { setInputValue(inputRef.current.value) }} value={inputValue} />
                                {loader ? <button type="button" className={activeButton ? 'cursor geo-font-bold-caps' : 'cursor-none geo-font-bold-caps'}><BeatLoader size={10} color="#fFF" /></button>
                                    :
                                    <button type="button" className={activeButton ? 'geo-font-bold-caps' : 'cursor-none geo-font-bold-caps'} onClick={sentSubscribe}>{translations?.subscribe}</button>
                                }
                            </form>
                            <SubscribeIcon class="sub_icon_01" color="#fff" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSubscribe;